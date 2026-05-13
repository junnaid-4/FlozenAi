import { NextResponse } from 'next/server';
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const { name, email, rating, review, course } = await req.json();

    if (!name || !email || !review) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Notify admin about the new review
    if (!resend) {
      console.warn('Review received but Resend API key is missing. Email not sent.');
    } else {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `⭐ New Student Review: ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111318; color: #E0E0E0; border-radius: 16px; overflow: hidden; border: 1px solid #2a2e37;">
          <div style="background: linear-gradient(135deg, #FFB830 0%, #FF5C40 100%); padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 22px; color: #111318; font-weight: 800;">New Course Review</h1>
          </div>
          <div style="padding: 32px;">
            <div style="background: #1a1d24; border: 1px solid #2a2e37; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">Rating</p>
              <p style="margin: 0; font-size: 24px; color: #FFB830;">${'⭐'.repeat(Number(rating))}</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37; color: #888; font-size: 13px; width: 120px;">Student</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37; font-weight: 600; color: #fff;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37; color: #888; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37;"><a href="mailto:${email}" style="color: #00C3FF; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37; color: #888; font-size: 13px;">Course</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #2a2e37;">${course || 'General'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Review</td>
                <td style="padding: 10px 0; line-height: 1.6; color: #fff;">"${review}"</td>
              </tr>
            </table>

            <div style="margin-top: 32px;">
              <a href="mailto:${email}" style="display: inline-block; padding: 12px 28px; background: #FFB830; color: #111318; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px;">Thank the Student</a>
            </div>
          </div>
        </div>
      `,
    });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Review API Error:', error);
    return NextResponse.json({ error: 'Failed to process review' }, { status: 500 });
  }
}
