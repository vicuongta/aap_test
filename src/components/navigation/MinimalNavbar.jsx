// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import QBtronLogo from '../../assets/QBtron.png';

export default function MinimalNavbar() {
    return (
        <nav className="sticky top-0 z-50 bg-neutral-950">
            {/* Background with vignette */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(900px_450px_at_50%_0%,rgba(120,40,40,0.25),transparent_65%)]" />
            </div>

            <div className="relative flex h-14 w-full items-center px-6">
                {/* Logo & Brand - Left aligned like regular navbar */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={QBtronLogo} alt="QBTron" className="h-7 w-auto" />
                    <span className="text-2xl font-semibold italic tracking-tight text-white">QBTron</span>
                </Link>
            </div>
        </nav>
    );
}
