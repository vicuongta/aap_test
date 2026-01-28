// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MinimalNavbar from '@/components/navigation/MinimalNavbar';
import MinimalFooter from '@/components/landing/MinimalFooter';
import QBtronLogo from '../assets/QBtron.png';

const GREEN = '#2d6a4f';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign up logic here
        console.log('Sign up:', { name, email, password, confirmPassword, acceptTerms });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <MinimalNavbar />

            <main className="flex-grow relative flex items-center justify-center py-16 px-6">
                {/* Background Gradient - matching Features page */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#F5F5F0_0%,#FFF8F0_100%)]" />
                </div>

                {/* Sign Up Card */}
                <div className="relative w-full max-w-md">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <img src={QBtronLogo} alt="QBTron" className="h-8 w-auto" />
                                <span className="text-2xl font-semibold italic text-gray-900">QBTron</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
                            <p className="text-gray-600">Start organizing your academic life today</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-1 focus:ring-[#2d6a4f] transition"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>

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

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-12 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-1 focus:ring-[#2d6a4f] transition"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-12 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-1 focus:ring-[#2d6a4f] transition"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-gray-300 bg-gray-50 text-[#2d6a4f] focus:ring-[#2d6a4f] focus:ring-offset-0"
                                    required
                                />
                                <span className="text-sm text-gray-600">
                                    I agree to the{' '}
                                    <Link to="/Terms" className="text-[#2d6a4f] hover:text-[#40916c]">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/Privacy" className="text-[#2d6a4f] hover:text-[#40916c]">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full py-3 text-lg font-semibold rounded-lg transition text-white"
                                style={{ backgroundColor: GREEN }}
                            >
                                Create account
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-sm text-gray-500">or</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* Sign In Link */}
                        <p className="text-center text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/SignIn"
                                className="text-[#2d6a4f] hover:text-[#40916c] font-medium transition"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <MinimalFooter />
        </div>
    );
}
