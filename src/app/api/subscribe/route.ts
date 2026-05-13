import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Notify admin about new subscriber
    if (!resend) {
      console.warn('New subscriber but Resend API key is missing. Emails not sent.');
    } else {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `📬 New Newsletter Subscriber: ${email}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111318; color: #E0E0E0; border-radius: 16px; overflow: hidden; border: 1px solid #2a2e37;">
            <div style="background: linear-gradient(135deg, #00C3FF 0%, #00E5A0 100%); padding: 24px 32px;">
              <h1 style="margin: 0; font-size: 22px; color: #111318; font-weight: 800;">New Newsletter Subscriber</h1>
            </div>
            <div style="padding: 32px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #fff;">Someone just subscribed to the FlozenAI newsletter:</p>
              <div style="background: #1a1d24; border: 1px solid #2a2e37; border-radius: 12px; padding: 16px;">
                <p style="margin: 0; font-size: 18px; color: #00C3FF; font-weight: 700;">${email}</p>
              </div>
            </div>
          </div>
        `,
      });

      // Send welcome email to subscriber
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Welcome to FlozenAI — You\'re In! 🚀',
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111318; color: #E0E0E0; border-radius: 16px; overflow: hidden; border: 1px solid #2a2e37;">
            <div style="background: linear-gradient(135deg, #00C3FF 0%, #00E5A0 100%); padding: 24px 32px;">
              <h1 style="margin: 0; font-size: 22px; color: #111318; font-weight: 800;">FlozenAI</h1>
            </div>
            <div style="padding: 32px;">
              <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #fff;">Welcome aboard! 👋</h2>
              <p style="color: #aaa; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
                You've successfully subscribed to the FlozenAI newsletter. You'll receive updates on new automation workflows, AI tools, and courses.
              </p>
              <a href="https://flozenai.co" style="display: inline-block; padding: 12px 28px; background: #00E5A0; color: #111318; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px;">Explore FlozenAI</a>
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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
