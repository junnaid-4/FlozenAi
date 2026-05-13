import React from 'react';
import { HeroSection } from '@/components/layout/HeroSection';
import { ProofBar } from '@/components/ProofBar';
import { AutomationGallery } from '@/components/automation/AutomationGallery';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { CourseTeaserSection } from '@/components/course/CourseTeaserSection';
import { FinalCTASection } from '@/components/FinalCTASection';
import ParticlesBackground from '@/components/ui/ParticlesBackground';

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <HeroSection />
      <ProofBar />
      <AutomationGallery limit={3} />
      <BeforeAfterSection />
      <CourseTeaserSection />
      <FinalCTASection />
    </>
  );
}
