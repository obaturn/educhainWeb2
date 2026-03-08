import React, { useState } from 'react';

interface LoginPageProps {
    onBack?: () => void;
    onLogin?: (email: string, password: string) => void;
    onShowSignup?: () => void;
    onGoogleLogin?: () => void;
    onLinkedInLogin?: () => void;
    onFacebookLogin?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ 
    onBack, 
    onLogin, 
    onShowSignup,
    onGoogleLogin,
    onLinkedInLogin,
    onFacebookLogin 
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onLogin) {
            onLogin(email, password);
        }
    };

    return (
        <div className="min-h-screen flex" style={{backgroundColor: '#F2F4F7'}}>
            {/* Left Side - Background Image */}
            <div 
                className="hidden lg:flex lg:w-1/2 min-h-screen relative bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://ehub.alxafrica.com/static/login-cover.d35d10eb2b65fff7.webp')`
                }}
            >
                {/* Dark overlay */}
                <div 
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, rgba(95, 89, 178, 0.85) 0%, rgba(0, 28, 61, 0.92) 100%)'
                    }}
                ></div>
                
                {/* Content on left side */}
                <div className="relative z-10 flex flex-col justify-center items-center w-full text-white p-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">eDuChain</h1>
                    <p className="text-lg opacity-90 text-center max-w-md leading-relaxed">
                        Empowering Africa's next generation of tech leaders through decentralized education.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12" style={{backgroundColor: '#FFFFFF'}}>
                <div className="w-full max-w-md">
                    {/* Back button */}
                    {onBack && (
                        <button 
                            onClick={onBack}
                            className="flex items-center text-gray-500 hover:text-[#5F59B2] transition-colors mb-8"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to home
                        </button>
                    )}

                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-2" style={{color: '#001C3D'}}>Welcome back!</h2>
                    <p className="text-gray-500 mb-8">Please enter your details</p>

                    {/* Social Login */}
                    <div className="mb-8">
                        <p className="text-xs font-medium text-gray-400 text-center mb-4 uppercase tracking-wider">Social sign in options</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                                onClick={onGoogleLogin}
                                className="flex-1 flex items-center justify-center py-3 px-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Google</span>
                            </button>
                            <button 
                                onClick={onLinkedInLogin}
                                className="flex-1 flex items-center justify-center py-3 px-4 rounded-xl border border-gray-200 hover:border-[#0077B5] hover:bg-[#0077B5]/5 transition-all duration-300"
                            >
                                <svg className="w-5 h-5 mr-2 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                <span className="text-sm font-medium text-gray-700">LinkedIn</span>
                            </button>
                            <button 
                                onClick={onFacebookLogin}
                                className="flex-1 flex items-center justify-center py-3 px-4 rounded-xl border border-gray-200 hover:border-[#1877F2] hover:bg-[#1877F2]/5 transition-all duration-300"
                            >
                                <svg className="w-5 h-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Facebook</span>
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center mb-8">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Manual sign in</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#5F59B2] focus:ring-2 focus:ring-[#5F59B2]/20 transition-all duration-300 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#5F59B2] focus:ring-2 focus:ring-[#5F59B2]/20 transition-all duration-300 outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end mb-6">
                            <a href="#" className="text-sm text-[#5F59B2] hover:underline font-medium">Forgot password?</a>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                            style={{backgroundColor: '#5F59B2', color: '#FFFFFF'}}
                        >
                            Sign in
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center mt-8 text-gray-500">
                        Don't have an account?{' '}
                        <button 
                            onClick={onShowSignup}
                            className="text-[#5F59B2] font-semibold hover:underline"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
