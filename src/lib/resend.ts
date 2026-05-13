import { Resend } from 'resend';

// Make resend instance optional to prevent build-time crashes when API key is missing
const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

// Configuration fallbacks
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'FlozenAI <onboarding@resend.dev>';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'flozenai@gmail.com';
