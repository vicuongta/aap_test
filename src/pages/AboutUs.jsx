import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/landing/Footer';
import AboutHero from '@/components/about/AboutHero';
import AboutMission from '@/components/about/AboutMission';
import AboutJourney from '@/components/about/AboutJourney';
import AboutTeam from '@/components/about/AboutTeam';
import AboutValues from '@/components/about/AboutValues';
import AboutCTA from '@/components/about/AboutCTA';

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-neutral-950">
            <Navbar />
            <main>
                <AboutHero />
                <AboutMission />
                <AboutJourney />
                <AboutTeam />
                <AboutValues />
                <AboutCTA />
            </main>
            <Footer />
        </div>
    );
}