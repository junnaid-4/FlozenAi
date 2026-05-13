import React from 'react';
import { Metadata } from 'next';
import CourseDetailClient from './CourseDetailClient';

export const metadata: Metadata = {
  title: 'Course Enrollment',
  description: 'Enroll in the FlozenAI automation course.',
};

export async function generateStaticParams() {
  return [
    { slug: 'n8n-automation-course' },
    { slug: 'prompt-engineering-masterclass' },
    { slug: 'vibe-through-ai-tools' },
    { slug: 'content-creation-through-ai' }
  ];
}

export default function CourseDetailPage() {
  return <CourseDetailClient />;
}
