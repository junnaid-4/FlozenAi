import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { productId, title, price, isCourse } = await req.json();

    if (!productId || !title || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Determine success and cancel URLs based on whether it's a course or an automation
    // In production, these should be dynamic robust URLs
    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}&type=${isCourse ? 'course' : 'automation'}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${isCourse ? 'courses' : 'automations'}`;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'pkr',
            product_data: {
              name: title,
              metadata: {
                productId,
                type: isCourse ? 'course' : 'automation'
              }
            },
            unit_amount: price * 100, // Stripe expects amounts in cents/smallest currency unit
            ...(!isCourse && {
              recurring: {
                interval: 'month',
              }
            }),
          },
          quantity: 1,
        },
      ],
      mode: isCourse ? 'payment' : 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        productId,
        type: isCourse ? 'course' : 'automation'
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Checkout Error:', err);
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}
