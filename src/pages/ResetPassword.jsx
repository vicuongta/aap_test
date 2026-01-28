// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MinimalNavbar from '@/components/navigation/MinimalNavbar';
import MinimalFooter from '@/components/landing/MinimalFooter';
import QBtronLogo from '../assets/QBtron.png';

const GREEN = '#2d6a4f';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle reset password logic here
        console.log('Reset password:', { email });
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <MinimalNavbar />

            <main className="flex-grow relative flex items-center justify-center py-16 px-6">
                {/* Background Gradient - matching Features page */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#F5F5F0_0%,#FFF8F0_100%)]" />
                </div>

                {/* Reset Password Card */}
                <div className="relative w-full max-w-md">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <img src={QBtronLogo} alt="QBTron" className="h-8 w-auto" />
                                <span className="text-2xl font-semibold italic text-gray-900">QBTron</span>
                            </div>
                            {!isSubmitted ? (
                                <>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset your password</h1>
                                    <p className="text-gray-600">
                                        Enter your email and we'll send you a link to reset your password
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center">
                                            <CheckCircle2 className="w-8 h-8 text-[#2d6a4f]" />
                                        </div>
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
                                    <p className="text-gray-600">
                                        We've sent a password reset link to <span className="text-gray-900 font-medium">{email}</span>
                                    </p>
                                </>
                            )}
                        </div>

                        {!isSubmitted ? (
                            /* Form */
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-1 focus:ring-[#2d6a4f] transition"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full py-3 text-lg font-semibold rounded-lg transition text-white"
                                    style={{ backgroundColor: GREEN }}
                                >
                                    Send reset link
                                </Button>
                            </form>
                        ) : (
                            /* Success State */
                            <div className="space-y-5">
                                <Button
                                    onClick={() => setIsSubmitted(false)}
                                    className="w-full py-3 text-lg font-semibold rounded-lg transition text-white"
                                    style={{ backgroundColor: GREEN }}
                                >
                                    Resend email
                                </Button>
                            </div>
                        )}

                        {/* Back to Sign In */}
                        <div className="mt-6">
                            <Link
                                to="/SignIn"
                                className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to sign in</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <MinimalFooter />
        </div>
    );
}
