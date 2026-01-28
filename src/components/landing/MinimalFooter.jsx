// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';

export default function MinimalFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#FFF8F0] py-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Copyright */}
                    <p className="text-sm text-gray-600">
                        © {currentYear} QBTron. All rights reserved.
                    </p>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            to="/Terms"
                            className="text-sm text-gray-600 hover:text-gray-900 transition"
                        >
                            Terms
                        </Link>
                        <Link
                            to="/Privacy"
                            className="text-sm text-gray-600 hover:text-gray-900 transition"
                        >
                            Privacy
                        </Link>
                        <Link
                            to="/Help"
                            className="text-sm text-gray-600 hover:text-gray-900 transition"
                        >
                            Help
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
