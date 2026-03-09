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
        <div style={{ 
            minHeight: '100vh',
            display: 'flex',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Left Side - Purple Gradient with Silhouettes */}
            <div style={{
                width: '50%',
                minHeight: '100vh',
                position: 'relative',
                background: 'linear-gradient(135deg, #5B4FD8 0%, #3D2F9E 50%, #1E1548 100%)',
                overflow: 'hidden'
            }}
            className="hidden lg:flex"
            >
                {/* Grid Pattern Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.08) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                    opacity: 0.5
                }}></div>

                {/* Silhouette Image */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60%',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                    opacity: 0.25,
                    filter: 'brightness(0) saturate(100%)'
                }}></div>

                {/* Gradient Overlay on Bottom */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(30, 21, 72, 0.95) 0%, transparent 100%)'
                }}></div>

                {/* Floating Orbs */}
                <div style={{
                    position: 'absolute',
                    top: '15%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'float 8s ease-in-out infinite'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '15%',
                    width: '250px',
                    height: '250px',
                    background: 'radial-gradient(circle, rgba(91,79,216,0.3) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    animation: 'float 10s ease-in-out infinite reverse'
                }}></div>
                
                {/* Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    color: 'white',
                    padding: '48px',
                    textAlign: 'center'
                }}>
                    <h1 style={{ 
                        fontSize: '64px', 
                        fontWeight: '900', 
                        marginBottom: '24px',
                        letterSpacing: '-2px',
                        textShadow: '0 2px 20px rgba(0,0,0,0.3)'
                    }}>
                        edu<span style={{ color: '#FF6B35' }}>chain</span>
                    </h1>
                    <p style={{ 
                        fontSize: '22px', 
                        opacity: 0.95,
                        maxWidth: '500px',
                        lineHeight: '1.6',
                        marginBottom: '40px',
                        textShadow: '0 1px 10px rgba(0,0,0,0.2)'
                    }}>
                        Empowering Africa's next generation of tech leaders through decentralized education.
                    </p>

                    {/* Stats */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '40px',
                        marginTop: '60px',
                        width: '100%',
                        maxWidth: '600px'
                    }}>
                        <div>
                            <div style={{ fontSize: '42px', fontWeight: '900', color: '#FF6B35', marginBottom: '8px', textShadow: '0 2px 10px rgba(255,107,53,0.5)' }}>100K+</div>
                            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>Learners</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '42px', fontWeight: '900', color: 'white', marginBottom: '8px', textShadow: '0 2px 10px rgba(255,255,255,0.3)' }}>95%</div>
                            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>Success Rate</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '42px', fontWeight: '900', color: '#FF6B35', marginBottom: '8px', textShadow: '0 2px 10px rgba(255,107,53,0.5)' }}>50+</div>
                            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>Countries</div>
                        </div>
                    </div>
                </div>

                <style>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                    }
                `}</style>
            </div>

            {/* Right Side - Login Form */}
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                padding: '20px'
            }}
            className="lg:w-1/2"
            >
                <div style={{ 
                    width: '100%',
                    maxWidth: '500px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '48px 40px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                {/* Back button */}
                {onBack && (
                    <button 
                        onClick={onBack}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#c0c0c0',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '400',
                            marginBottom: '32px',
                            padding: 0,
                            transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#888'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#c0c0c0'}
                    >
                        <svg style={{ width: '16px', height: '16px', marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to home
                    </button>
                )}

                {/* Title */}
                <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: '700', 
                    marginBottom: '8px',
                    color: '#1a1a1a',
                    letterSpacing: '-0.3px'
                }}>
                    Welcome back!
                </h2>
                <p style={{ 
                    fontSize: '14px',
                    color: '#b0b0b0', 
                    marginBottom: '36px',
                    fontWeight: '400'
                }}>
                    Please enter your details.
                </p>

                {/* Social Login */}
                <div style={{ marginBottom: '28px' }}>
                    <p style={{ 
                        fontSize: '11px', 
                        fontWeight: '500', 
                        color: '#b0b0b0', 
                        textAlign: 'center',
                        marginBottom: '16px',
                        letterSpacing: '0.3px'
                    }}>
                        Social sign in options
                    </p>
                    <div style={{ 
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center'
                    }}>
                        <button 
                            onClick={onGoogleLogin}
                            style={{
                                width: '64px',
                                height: '64px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '12px',
                                border: '1px solid #e8e8e8',
                                backgroundColor: 'white',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#d0d0d0';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#e8e8e8';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <svg style={{ width: '28px', height: '28px' }} viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                        </button>
                        <button 
                            onClick={onLinkedInLogin}
                            style={{
                                width: '64px',
                                height: '64px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '12px',
                                border: '1px solid #e8e8e8',
                                backgroundColor: 'white',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#d0d0d0';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#e8e8e8';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <svg style={{ width: '28px', height: '28px', color: '#0077B5' }} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </button>
                        <button 
                            onClick={onFacebookLogin}
                            style={{
                                width: '64px',
                                height: '64px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '12px',
                                border: '1px solid #e8e8e8',
                                backgroundColor: 'white',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#d0d0d0';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#e8e8e8';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <svg style={{ width: '28px', height: '28px', color: '#1877F2' }} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: '28px'
                }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e8e8e8' }}></div>
                    <span style={{ 
                        padding: '0 16px',
                        fontSize: '11px',
                        fontWeight: '500',
                        color: '#b0b0b0',
                        letterSpacing: '0.3px'
                    }}>
                        Manual sign in
                    </span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e8e8e8' }}></div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ 
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#4a4a4a',
                            marginBottom: '8px'
                        }}>
                            Email <span style={{ color: '#ff4444' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                style={{
                                    width: '100%',
                                    padding: '14px 44px 14px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid #d8d8d8',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    fontFamily: 'inherit',
                                    color: '#1a1a1a',
                                    backgroundColor: 'white'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#3b82f6';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#d8d8d8';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                required
                            />
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                right: '16px',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none'
                            }}>
                                <svg style={{ width: '20px', height: '20px', color: '#b0b0b0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Password Input */}
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ 
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#4a4a4a',
                            marginBottom: '8px'
                        }}>
                            Password <span style={{ color: '#ff4444' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                style={{
                                    width: '100%',
                                    padding: '14px 44px 14px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid #d8d8d8',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    fontFamily: 'inherit',
                                    color: '#1a1a1a',
                                    backgroundColor: 'white'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#3b82f6';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#d8d8d8';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '16px',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <svg style={{ width: '20px', height: '20px', color: '#b0b0b0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {showPassword ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div style={{ 
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: '28px'
                    }}>
                        <a 
                            href="#" 
                            style={{ 
                                fontSize: '13px',
                                color: '#3b82f6',
                                fontWeight: '500',
                                textDecoration: 'none',
                                transition: 'opacity 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.25)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#2563eb';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.35)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#3b82f6';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.25)';
                        }}
                    >
                        Sign in
                    </button>
                </form>

                {/* Sign Up Link */}
                <p style={{ 
                    textAlign: 'center',
                    marginTop: '28px',
                    fontSize: '14px',
                    color: '#888'
                }}>
                    Don't have an account?{' '}
                    <button 
                        onClick={onShowSignup}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#3b82f6',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontSize: '14px',
                            textDecoration: 'none',
                            transition: 'opacity 0.2s ease',
                            padding: 0
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        Sign up
                    </button>
                </p>

                {/* Help Link */}
                <p style={{ 
                    textAlign: 'center',
                    marginTop: '16px',
                    fontSize: '13px',
                    color: '#b0b0b0'
                }}>
                    Struggling to log in or sign up?
                </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
