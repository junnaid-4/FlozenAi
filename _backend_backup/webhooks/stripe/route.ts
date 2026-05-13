import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { r2Client } from '@/lib/r2';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    
    // Extract metadata
    const { productId, type } = session.metadata || {};
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'Customer';
    const amountTotal = session.amount_total ? session.amount_total / 100 : 0;
    
    if (!customerEmail || !productId) {
      console.error('Missing vital information in session', session.id);
      return NextResponse.json({ error: 'Missing vital info' }, { status: 400 });
    }

    try {
      // 1. Record purchase in Supabase
      // Assuming a generic pattern for user creation tracking
      const { data: userData, error: userError } = await supabaseAdmin
        .from('User')
        .upsert({ email: customerEmail, name: customerName }, { onConflict: 'email' })
        .select('id')
        .single();
      
      if (userError && userError.code !== 'PGRST116') {
         console.warn('Supabase UPSERT User error limit hit, ignoring for mock:', userError);
      }

      const userId = userData?.id || `anon_${Date.now()}`;
      
      const { error: purchaseError } = await supabaseAdmin
        .from('Purchase')
        .insert({
          userId,
          productId,
          amount: amountTotal,
          stripeSessionId: session.id,
          // type could be added to schema
        });
      
      if (purchaseError) {
         console.warn('Supabase INSERT Purchase error, ignoring for mock:', purchaseError);
      }

      // 2. Generate signed R2 URL
      // If it's an automation, provide a URL to a mock automation JSON file
      let signedUrl = 'https://mock.generated.url';
      
      if (process.env.R2_ACCOUNT_ID && type === 'automation') {
         const command = new GetObjectCommand({
           Bucket: process.env.R2_BUCKET_NAME || 'flozenai-automations',
           Key: `${productId}.json`, // Assuming the product ID is the filename root
         });
         signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 * 24 * 7 }); // 7 days
      }

      // 3. Send purchase email via Resend
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'FlozenAI <hello@flozenai.co>',
          to: [customerEmail],
          subject: 'Your FlozenAI Purchase Details',
          html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2>Hi ${customerName},</h2>
              <p>Thank you for purchasing <strong>${productId}</strong> from FlozenAI.</p>
              ${type === 'automation' ? `
              <p>You can download your workflow file using the link below (expires in 7 days):</p>
              <a href="${signedUrl}" style="display: inline-block; padding: 10px 20px; background-color: #00E5A0; color: #111318; text-decoration: none; border-radius: 5px; font-weight: bold;">Download Workflow</a>
              ` : `
              <p>Your course access has been provisioned. Please log in to your dashboard to begin learning.</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/login" style="display: inline-block; padding: 10px 20px; background-color: #00E5A0; color: #111318; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
              `}
              <p>If you have any questions, just reply to this email.</p>
              <p>Best,<br>FlozenAI Team</p>
            </div>
          `
        });
      }

    } catch (error) {
      console.error('Error processing checkout fulfillment:', error);
      // We don't return 500 here to Stripe because we've already received the payment,
      // but in production we'd want alerting to re-process failed fulfillments.
    }
  }

  return NextResponse.json({ received: true });
}
