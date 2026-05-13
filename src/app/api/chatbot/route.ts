import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const { data, subject } = await req.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'No lead data provided' }, { status: 400 });
    }

    // Try to find a reply-to email if it exists
    const leadEmail = data.Email || data.email || null;
    const leadName = data.Name || data.name || 'Valued Customer';

    // 1. Notify admin about the chatbot lead
    if (!resend) {
      console.warn('Chatbot lead received but Resend API key is missing. Emails not sent.');
    } else {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `🤖 Chatbot Lead: ${subject || 'New Inquiry'}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111318; color: #E0E0E0; border-radius: 16px; overflow: hidden; border: 1px solid #2a2e37;">
            <div style="background: linear-gradient(135deg, #00C3FF 0%, #ffff 100%); padding: 24px 32px;">
              <h1 style="margin: 0; font-size: 22px; color: #111318; font-weight: 800;">Chatbot Lead Capture</h1>
            </div>
            <div style="padding: 32px;">
              <p style="color: #888; font-size: 14px; margin-bottom: 20px;">Someone just completed a flow in the FlozenAI Chatbot:</p>
              
              <table style="width: 100%; border-collapse: collapse;">
                ${Object.entries(data).map(([key, value]) => `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37; color: #888; font-size: 13px; width: 140px;">${key}</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37; font-weight: 600; color: #fff;">${value}</td>
                  </tr>
                `).join('')}
              </table>

              <div style="margin-top: 32px;">
                <a href="mailto:${leadEmail || ''}" style="display: inline-block; padding: 12px 28px; background: #00C3FF; color: #111318; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px;">Reply via Email</a>
              </div>
            </div>
          </div>
        `,
      });

      // 2. Send auto-reply to user (only if email is provided)
      if (leadEmail) {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: leadEmail,
          subject: 'Request Received — FlozenAI Chatbot',
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111318; color: #E0E0E0; border-radius: 16px; overflow: hidden; border: 1px solid #2a2e37;">
              <div style="background: linear-gradient(135deg, #00C3FF 0%, #00E5A0 100%); padding: 24px 32px;">
                <h1 style="margin: 0; font-size: 22px; color: #111318; font-weight: 800;">FlozenAI</h1>
              </div>
              <div style="padding: 32px;">
                <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #fff;">Hi ${leadName} 👋</h2>
                <p style="color: #aaa; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
                  Thanks for reaching out through our chatbot! We've successfully received your request for: <strong style="color: #00C3FF;">${subject || 'a consultation'}</strong>.
                </p>
                <p style="color: #aaa; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
                  Our team will review your details and get back to you shortly to confirm the next steps.
                </p>
                <a href="https://wa.me/923027421230" style="display: inline-block; padding: 12px 28px; background: #25D366; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px;">Chat on WhatsApp</a>
                <hr style="border: none; border-top: 1px solid #2a2e37; margin: 32px 0 16px 0;" />
                <p style="margin: 0; font-size: 12px; color: #555;">
                  FlozenAI — Automation Engineering for Pakistani Businesses<br/>
                  <a href="https://flozenai.co" style="color: #00C3FF; text-decoration: none;">flozenai.co</a>
                </p>
              </div>
            </div>
          `,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 });
  }
}
