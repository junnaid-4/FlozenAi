import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://flozenai.co';

  // Manual primary routes
  const routes = [
    '',
    '/automations',
    '/courses',
    '/about',
    '/contact',
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Mock dynamic products (in reality fetched from DB)
  const automations = [
    '/automations/lead-gen-crm-sync',
    '/automations/abandoned-cart-whatsapp',
    '/automations/customer-onboarding',
    '/automations/automated-invoice',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const courses = [
    '/courses/n8n-automation-course',
    '/courses/prompt-engineering-masterclass',
    '/courses/vibe-through-ai-tools',
    '/courses/content-creation-through-ai',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...routes, ...automations, ...courses];
}
