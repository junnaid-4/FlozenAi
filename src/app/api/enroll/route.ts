import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, countryCode, country, age, background, message, packageTitle, packagePrice } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fullPhone = `${countryCode || ''} ${phone || ''}`.trim();

    if (!resend) {
      console.warn('Enrollment received but Resend API key is missing. Emails not sent.');
    } else {
      // 1. Notify admin about the new enrollment lead
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `🎓 New Enrollment: ${name} — ${packageTitle}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111318; color: #E0E0E0; border-radius: 16px; overflow: hidden; border: 1px solid #2a2e37;">
            <div style="background: linear-gradient(135deg, #7000FF 0%, #00F0FF 100%); padding: 24px 32px;">
              <h1 style="margin: 0; font-size: 22px; color: #fff; font-weight: 800;">New Course Enrollment</h1>
            </div>
            <div style="padding: 32px;">
              <div style="background: #1a1d24; border: 1px solid #2a2e37; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Selected Course</p>
                <p style="margin: 0; font-size: 18px; color: #00F0FF; font-weight: 700;">${packageTitle || 'N/A'}</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #aaa;">${packagePrice ? `${packagePrice} PKR` : 'Price not specified'}</p>
              </div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37; color: #888; font-size: 13px; width: 120px;">Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37; color: #888; font-size: 13px;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37;"><a href="mailto:${email}" style="color: #00C3FF; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37; color: #888; font-size: 13px;">WhatsApp</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37;">${fullPhone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37; color: #888; font-size: 13px;">Country</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37;">${country || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37; color: #888; font-size: 13px;">Age</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37;">${age || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37; color: #888; font-size: 13px;">Skill Level</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37;">${background || 'N/A'}</td>
                </tr>
                ${message ? `
                <tr>
                  <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Goals</td>
                  <td style="padding: 10px 0; line-height: 1.6;">${message}</td>
                </tr>` : ''}
              </table>
              <div style="margin-top: 24px;">
                <a href="https://wa.me/${(countryCode || '+92').replace('+', '')}${phone}" style="display: inline-block; padding: 12px 28px; background: #25D366; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px;">Message on WhatsApp</a>
                <a href="mailto:${email}?subject=Re: Your ${packageTitle} Enrollment" style="display: inline-block; padding: 12px 28px; background: #00C3FF; color: #111318; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; margin-left: 8px;">Reply via Email</a>
              </div>
            </div>
          </div>
        `,
      });

      // 2. Send auto-reply confirmation to the student
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Enrollment Received — ${packageTitle} | FlozenAI Academy`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111318; color: #E0E0E0; border-radius: 16px; overflow: hidden; border: 1px solid #2a2e37;">
            <div style="background: linear-gradient(135deg, #7000FF 0%, #00F0FF 100%); padding: 24px 32px;">
              <h1 style="margin: 0; font-size: 22px; color: #fff; font-weight: 800;">FlozenAI Academy</h1>
            </div>
            <div style="padding: 32px;">
              <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #fff;">Hi ${name} 👋</h2>
              <p style="color: #aaa; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
                Thank you for your interest in <strong style="color: #00F0FF;">${packageTitle}</strong>! Your enrollment request has been received successfully.
              </p>

              <div style="background: #1a1d24; border: 1px solid #2a2e37; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #ccc;">✅ &nbsp;Your request has been logged</p>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #ccc;">📞 &nbsp;Our admissions team will contact you on WhatsApp within <strong style="color: #00E5A0;">24 hours</strong></p>
                <p style="margin: 0; font-size: 14px; color: #ccc;">💳 &nbsp;Payment details will be shared during the onboarding call</p>
              </div>

              <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
                Need immediate assistance? Reach out directly:
              </p>

              <a href="https://wa.me/923027421230" style="display: inline-block; padding: 12px 28px; background: #25D366; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px;">Chat on WhatsApp</a>

              <hr style="border: none; border-top: 1px solid #2a2e37; margin: 32px 0 16px 0;" />
              <p style="margin: 0; font-size: 12px; color: #555;">
                FlozenAI Academy — Master AI Automation Skills<br/>
                <a href="https://flozenai.co/courses" style="color: #00C3FF; text-decoration: none;">flozenai.co/courses</a>
              </p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Enrollment API Error:', error);
    return NextResponse.json({ error: 'Failed to process enrollment' }, { status: 500 });
  }
}
