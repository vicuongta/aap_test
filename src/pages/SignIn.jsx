// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MinimalNavbar from '@/components/navigation/MinimalNavbar';
import MinimalFooter from '@/components/landing/MinimalFooter';
import QBtronLogo from '../assets/QBtron.png';

const GREEN = '#2d6a4f';

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign in logic here
        console.log('Sign in:', { email, password, rememberMe });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <MinimalNavbar />

            <main className="flex-grow relative flex items-center justify-center py-16 px-6">
                {/* Background Gradient - matching Features page */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#F5F5F0_0%,#FFF8F0_100%)]" />
                </div>

                {/* Sign In Card */}
                <div className="relative w-full max-w-md">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <img src={QBtronLogo} alt="QBTron" className="h-8 w-auto" />
                                <span className="text-2xl font-semibold italic text-gray-900">QBTron</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
                            <p className="text-gray-600">Sign in to continue to your account</p>
                        </div>

                        {/* Form */}
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
                            </div>

                            {/* Remember me & Forgot password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 bg-gray-50 text-[#2d6a4f] focus:ring-[#2d6a4f] focus:ring-offset-0"
                                    />
                                    <span className="text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link
                                    to="/ResetPassword"
                                    className="text-sm text-[#40916c] hover:text-[#52b788] transition"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full py-4 text-lg font-semibold rounded-lg transition text-white"
                                style={{ backgroundColor: GREEN }}
                            >
                                Sign in
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-sm text-gray-500">or</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* Sign Up Link */}
                        <p className="text-center text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/SignUp"
                                className="text-[#40916c] hover:text-[#52b788] font-medium transition"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <MinimalFooter />
        </div>
    );
}
