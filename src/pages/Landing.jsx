import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import LandingHero from '@/components/landing/LandingHero';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingForStudents from '@/components/landing/LandingForStudents';
import LandingIntelligence from '@/components/landing/LandingIntelligence';
import LandingBelonging from '@/components/landing/LandingBelonging';
import LandingFinalCTA from '@/components/landing/LandingFinalCTA';
import Footer from '@/components/landing/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingForStudents />
        <LandingIntelligence />
        <LandingBelonging />
        <LandingFinalCTA />
      </main>
      <Footer />
    </div>
  );
}