import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import LandingHero from '@/components/landing/LandingHero';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingColorCoded from '@/components/landing/LandingColorCoded';
import LandingFocusTimer from '@/components/landing/LandingFocusTimer';
import LandingStats from '@/components/landing/LandingStats';
import LandingTestimonials from '@/components/landing/LandingTestimonials';
import LandingFAQ from '@/components/landing/LandingFAQ';
import LandingFinalCTA from '@/components/landing/LandingFinalCTA';
import Footer from '@/components/landing/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingColorCoded />
        <LandingFocusTimer />
        {/* <LandingStats />
        <LandingTestimonials /> */}
        <LandingFinalCTA />
        <LandingFAQ />
      </main>
      <Footer />
    </div>
  );
}