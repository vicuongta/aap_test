import React from 'react';
import { Rocket } from 'lucide-react';
import { AnimatedSection, GREEN } from './AnimatedComponents';

export default function AboutCTA() {
    return (
        <section className="py-20 px-6">
            <AnimatedSection className="mx-auto max-w-3xl text-center">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-10">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Transform Your Studies?
                    </h2>
                    <p className="text-white/60 mb-8 max-w-xl mx-auto">
                        Join thousands of students who've discovered a better way to learn.
                        Your academic success story starts here.
                    </p>
                    <a
                        href="/SignUp"
                        className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: GREEN }}
                    >
                        <Rocket className="h-5 w-5" />
                        Get Started Free
                    </a>
                </div>
            </AnimatedSection>
        </section>
    );
}
