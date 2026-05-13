import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const { name, email, tools, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Notify the admin about the new inquiry
    if (!resend) {
      console.warn('Contact inquiry received but Resend API key is missing. Emails not sent.');
    } else {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Inquiry from ${name}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111318; color: #E0E0E0; border-radius: 16px; overflow: hidden; border: 1px solid #2a2e37;">
            <div style="background: linear-gradient(135deg, #00C3FF 0%, #00E5A0 100%); padding: 24px 32px;">
              <h1 style="margin: 0; font-size: 22px; color: #111318; font-weight: 800;">New Contact Inquiry</h1>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #2a2e37; color: #888; font-size: 13px; width: 120px;">Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #2a2e37; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #2a2e37; color: #888; font-size: 13px;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #2a2e37;"><a href="mailto:${email}" style="color: #00C3FF; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #2a2e37; color: #888; font-size: 13px;">Tools</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #2a2e37;">${tools || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #888; font-size: 13px; vertical-align: top;">Message</td>
                  <td style="padding: 12px 0; line-height: 1.6;">${message}</td>
                </tr>
              </table>
              <div style="margin-top: 24px;">
                <a href="mailto:${email}?subject=Re: Your FlozenAI Inquiry" style="display: inline-block; padding: 12px 28px; background: #00E5A0; color: #111318; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px;">Reply to ${name}</a>
              </div>
            </div>
          </div>
        `,
      });

      // 2. Send auto-reply confirmation to the customer
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "We've received your inquiry — FlozenAI",
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111318; color: #E0E0E0; border-radius: 16px; overflow: hidden; border: 1px solid #2a2e37;">
            <div style="background: linear-gradient(135deg, #00C3FF 0%, #00E5A0 100%); padding: 24px 32px;">
              <h1 style="margin: 0; font-size: 22px; color: #111318; font-weight: 800;">FlozenAI</h1>
            </div>
            <div style="padding: 32px;">
              <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #fff;">Hi ${name} 👋</h2>
              <p style="color: #aaa; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
                Thank you for reaching out to FlozenAI! We've received your inquiry and our team will get back to you within <strong style="color: #00E5A0;">24 hours</strong>.
              </p>

              <div style="background: #1a1d24; border: 1px solid #2a2e37; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Your Message</p>
                <p style="margin: 0; font-size: 14px; color: #ccc; line-height: 1.6; font-style: italic;">"${message}"</p>
              </div>

              <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
                In the meantime, feel free to reach us directly on WhatsApp for urgent matters:
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

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
