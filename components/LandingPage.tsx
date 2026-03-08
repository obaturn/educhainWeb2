import React, { useState, useEffect, useRef } from 'react';

interface LandingPageProps {
    onNavigateToLogin?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToLogin }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [visibleStats, setVisibleStats] = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setShowBackToTop(window.scrollY > 500);

            // Check if stats section is visible
            if (statsRef.current) {
                const rect = statsRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    setVisibleStats(true);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-advance slides every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isVideoPlaying) {
                setCurrentSlide((prev) => (prev + 1) % 3);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [isVideoPlaying]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsVideoPlaying(false);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % 3);
        setIsVideoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + 3) % 3);
        setIsVideoPlaying(false);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Animated counter component
    const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
        const [count, setCount] = useState(0);
        
        useEffect(() => {
            if (!visibleStats) return;
            
            let startTime: number;
            const animate = (currentTime: number) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);
                setCount(Math.floor(progress * end));
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }, [visibleStats, end, duration]);

        return <>{count}</>;
    };

    return (
        <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#ffffff', position: 'relative' }}>
            {/* Enhanced Navigation with blur effect */}
            <nav style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'white',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
                zIndex: 1000,
                transition: 'all 0.3s ease'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
                        <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#000', cursor: 'pointer' }} onClick={scrollToTop}>
                            edu<span style={{ color: '#FF6B35' }}>chain</span>
                        </h1>
                        
                        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                            {['Programmes', 'How It Works', 'Community', 'About'].map((item, index) => (
                                <a 
                                    key={index}
                                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                                    style={{ 
                                        fontSize: '13px', 
                                        fontWeight: '700', 
                                        color: '#333', 
                                        textDecoration: 'none', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '1px',
                                        position: 'relative',
                                        padding: '5px 0'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#FF6B35';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = '#333';
                                    }}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>

                        <button
                            onClick={onNavigateToLogin}
                            style={{
                                backgroundColor: '#FF6B35',
                                color: 'white',
                                padding: '12px 32px',
                                borderRadius: '50px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '13px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                boxShadow: '0 4px 12px rgba(255,107,53,0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(255,107,53,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,53,0.3)';
                            }}
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Enhanced Animated Slider */}
            <section style={{ 
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '80px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>

                {/* Progress Bar */}
                <div style={{
                    position: 'absolute',
                    top: '80px',
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    zIndex: 10
                }}>
                    <div style={{
                        height: '100%',
                        backgroundColor: '#FF6B35',
                        width: `${((currentSlide + 1) / 3) * 100}%`,
                        transition: 'width 0.3s ease'
                    }}></div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    style={{
                        position: 'absolute',
                        left: '40px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: '24px',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255,107,53,0.8)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    }}
                >
                    ←
                </button>
                <button
                    onClick={nextSlide}
                    style={{
                        position: 'absolute',
                        right: '40px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: '24px',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255,107,53,0.8)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    }}
                >
                    →
                </button>
                
                {/* Slide 1 - AI Initiative */}
                <div style={{ 
                    maxWidth: '1200px', 
                    margin: '0 auto', 
                    padding: '0 20px', 
                    textAlign: 'center', 
                    position: 'relative', 
                    zIndex: 1,
                    opacity: currentSlide === 0 ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    display: currentSlide === 0 ? 'block' : 'none'
                }}>
                    <h1 style={{ 
                        fontSize: '72px', 
                        fontWeight: '900', 
                        color: 'white', 
                        marginBottom: '30px',
                        lineHeight: '1.1',
                        letterSpacing: '-2px'
                    }}>
                        Shaping Africa's<br />
                        <span style={{ color: '#FF6B35' }}>AI Generation</span>
                    </h1>
                    <p style={{ 
                        fontSize: '24px', 
                        color: '#b0b0b0', 
                        marginBottom: '50px',
                        maxWidth: '800px',
                        margin: '0 auto 50px',
                        lineHeight: '1.6'
                    }}>
                        EduChain, Anthropic, and partners launch landmark AI learning initiative to empower the next generation of innovators.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            style={{
                                backgroundColor: '#FF6B35',
                                color: 'white',
                                padding: '18px 48px',
                                borderRadius: '50px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '16px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                boxShadow: '0 8px 24px rgba(255,107,53,0.4)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,107,53,0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,53,0.4)';
                            }}
                        >
                            Read Press Release
                        </button>
                        <button
                            style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                                padding: '18px 48px',
                                borderRadius: '50px',
                                border: '2px solid white',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '16px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'white';
                                e.currentTarget.style.color = '#1a1a1a';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'white';
                            }}
                        >
                            View Event Recap
                        </button>
                    </div>
                    
                    {/* Partnership Logos */}
                    <div style={{ marginTop: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
                        <span style={{ fontSize: '48px', fontWeight: '900', color: 'white' }}>educhain</span>
                        <span style={{ fontSize: '36px', color: '#FF6B35' }}>×</span>
                        <span style={{ fontSize: '48px', fontWeight: '900', color: 'white', letterSpacing: '3px' }}>ANTHROPIC</span>
                    </div>
                </div>

                {/* Slide 2 - Video Feature */}
                <div style={{ 
                    maxWidth: '1200px', 
                    margin: '0 auto', 
                    padding: '0 20px', 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    zIndex: 1,
                    opacity: currentSlide === 1 ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    display: currentSlide === 1 ? 'grid' : 'none',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '60px',
                    alignItems: 'center'
                }}>
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ 
                            fontSize: '64px', 
                            fontWeight: '900', 
                            color: 'white', 
                            marginBottom: '30px',
                            lineHeight: '1.1',
                            letterSpacing: '-2px'
                        }}>
                            Build Your<br />
                            <span style={{ color: '#FF6B35' }}>AI-Ready Future</span>
                        </h1>
                        <p style={{ 
                            fontSize: '20px', 
                            color: '#b0b0b0', 
                            marginBottom: '40px',
                            lineHeight: '1.6'
                        }}>
                            Equip yourself with relevant AI skills redefining the future of work.
                        </p>
                        <button
                            onClick={onNavigateToLogin}
                            style={{
                                backgroundColor: '#FF6B35',
                                color: 'white',
                                padding: '18px 48px',
                                borderRadius: '50px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '16px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                boxShadow: '0 8px 24px rgba(255,107,53,0.4)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,107,53,0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,53,0.4)';
                            }}
                        >
                            Browse Tech Programs
                        </button>
                    </div>
                    
                    {/* Video Player */}
                    <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                        {!isVideoPlaying ? (
                            <div 
                                onClick={() => setIsVideoPlaying(true)}
                                style={{ 
                                    position: 'relative', 
                                    cursor: 'pointer',
                                    backgroundColor: '#2d2d2d',
                                    height: '400px'
                                }}
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" 
                                    alt="Students learning"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(135deg, rgba(255,107,53,0.2) 0%, rgba(26,26,26,0.4) 100%)'
                                }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        backgroundColor: '#FF6B35',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '32px',
                                        color: 'white',
                                        boxShadow: '0 8px 24px rgba(255,107,53,0.5)',
                                        paddingLeft: '5px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                    >
                                        ▶
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <iframe
                                width="100%"
                                height="400"
                                src="https://www.youtube.com/embed/8mAITcNt710?autoplay=1"
                                title="EduChain - Transform Your Future"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ display: 'block' }}
                            ></iframe>
                        )}
                    </div>
                </div>

                {/* Slide 3 - Community / Ventures */}
                <div style={{ 
                    maxWidth: '1200px', 
                    margin: '0 auto', 
                    padding: '0 20px', 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                    opacity: currentSlide === 2 ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    display: currentSlide === 2 ? 'grid' : 'none',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '60px',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ 
                            fontSize: '64px', 
                            fontWeight: '900', 
                            color: 'white', 
                            marginBottom: '30px',
                            lineHeight: '1.1',
                            letterSpacing: '-2px'
                        }}>
                            Ignite Your<br />
                            <span style={{ color: 'white' }}>Tech Venture</span>
                        </h1>
                        <p style={{ 
                            fontSize: '20px', 
                            color: 'rgba(255,255,255,0.9)', 
                            marginBottom: '40px',
                            lineHeight: '1.6'
                        }}>
                            Turn your entrepreneurial dreams into a reality with EduChain Ventures Founder & Freelancer Academy programs.
                        </p>
                        <button
                            style={{
                                backgroundColor: '#00D9A5',
                                color: 'white',
                                padding: '18px 48px',
                                borderRadius: '50px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '16px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                boxShadow: '0 8px 24px rgba(0,217,165,0.4)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,217,165,0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,217,165,0.4)';
                            }}
                        >
                            Visit EduChain Ventures
                        </button>
                    </div>

                    {/* Circular Profile Images with Real Photos */}
                    <div style={{ 
                        marginTop: '0', 
                        position: 'relative',
                        height: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {[
                            { color: '#00D9A5', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
                            { color: '#FF6B6B', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
                            { color: '#4ECDC4', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
                            { color: '#6C5CE7', img: 'https://randomuser.me/api/portraits/men/46.jpg' },
                            { color: '#FFA502', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
                            { color: '#0984E3', img: 'https://randomuser.me/api/portraits/men/52.jpg' }
                        ].map((person, index) => {
                            const angle = (index * 60) * (Math.PI / 180);
                            const radius = 180;
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;
                            
                            return (
                                <div
                                    key={index}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        backgroundColor: person.color,
                                        border: '5px solid #2d2d2d',
                                        overflow: 'hidden',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                                        animation: `fadeIn 0.5s ease-in-out ${index * 0.1}s both`
                                    }}
                                >
                                    <img 
                                        src={person.img} 
                                        alt={`Community member ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                            );
                        })}
                        
                        {/* Center Image - Larger */}
                        <div style={{
                            width: '140px',
                            height: '140px',
                            borderRadius: '50%',
                            backgroundColor: '#1a1a1a',
                            border: '6px solid #2d2d2d',
                            overflow: 'hidden',
                            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                            zIndex: 2
                        }}>
                            <img 
                                src="https://randomuser.me/api/portraits/men/75.jpg" 
                                alt="Featured founder"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div style={{ 
                    position: 'absolute', 
                    bottom: '40px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '12px',
                    zIndex: 10
                }}>
                    {[0, 1, 2].map((index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            style={{
                                width: currentSlide === index ? '40px' : '12px',
                                height: '12px',
                                borderRadius: '6px',
                                backgroundColor: currentSlide === index ? '#FF6B35' : 'rgba(255,255,255,0.3)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </div>

                <style>{`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(0.5);
                        }
                        to {
                            opacity: 1;
                            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1);
                        }
                    }
                `}</style>
            </section>

            {/* Enhanced Stats Section with Animated Counters */}
            <section ref={statsRef} style={{ backgroundColor: '#1a1a1a', padding: '80px 20px', color: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', textAlign: 'center' }}>
                    <div>
                        <div style={{ fontSize: '56px', fontWeight: '900', color: '#FF6B35', marginBottom: '10px' }}>
                            {visibleStats ? <AnimatedCounter end={100} /> : 0}K+
                        </div>
                        <div style={{ fontSize: '16px', color: '#b0b0b0', fontWeight: '600' }}>Learners Worldwide</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '56px', fontWeight: '900', color: 'white', marginBottom: '10px' }}>
                            {visibleStats ? <AnimatedCounter end={95} /> : 0}%
                        </div>
                        <div style={{ fontSize: '16px', color: '#b0b0b0', fontWeight: '600' }}>Employment Rate</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '56px', fontWeight: '900', color: '#FF6B35', marginBottom: '10px' }}>
                            {visibleStats ? <AnimatedCounter end={50} /> : 0}+
                        </div>
                        <div style={{ fontSize: '16px', color: '#b0b0b0', fontWeight: '600' }}>Countries</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '56px', fontWeight: '900', color: 'white', marginBottom: '10px' }}>
                            {visibleStats ? <AnimatedCounter end={500} /> : 0}+
                        </div>
                        <div style={{ fontSize: '16px', color: '#b0b0b0', fontWeight: '600' }}>Hiring Partners</div>
                    </div>
                </div>
            </section>

            {/* Programs Section with Tabs */}
            <section id="programmes" style={{ padding: '120px 20px', backgroundColor: '#f5f5f5' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '48px', fontWeight: '900', color: '#1a1a1a', marginBottom: '20px' }}>
                            Our Programs
                        </h2>
                        <p style={{ fontSize: '20px', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
                            Choose from our industry-leading programs designed to launch your tech career
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '60px', flexWrap: 'wrap' }}>
                        {['All', 'Career', 'Creative Tech', 'Cyber Security', 'Data', 'Entrepreneurship', 'Tech'].map((tab, index) => (
                            <button
                                key={index}
                                style={{
                                    padding: '12px 28px',
                                    borderRadius: '50px',
                                    border: index === 0 ? 'none' : '2px solid #ddd',
                                    backgroundColor: index === 0 ? '#6C5CE7' : 'white',
                                    color: index === 0 ? 'white' : '#666',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    if (index !== 0) {
                                        e.currentTarget.style.borderColor = '#6C5CE7';
                                        e.currentTarget.style.color = '#6C5CE7';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (index !== 0) {
                                        e.currentTarget.style.borderColor = '#ddd';
                                        e.currentTarget.style.color = '#666';
                                    }
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Program Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '50px' }}>
                        {[
                            { 
                                title: 'Graphic Design', 
                                duration: '7 Months', 
                                status: 'Coming soon',
                                statusColor: '#FFA500',
                                img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
                                category: 'Creative Tech'
                            },
                            { 
                                title: 'Content Creation', 
                                duration: '7 Months', 
                                status: 'Coming soon',
                                statusColor: '#FFA500',
                                img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80',
                                category: 'Creative Tech'
                            },
                            { 
                                title: 'Data Engineering', 
                                duration: '14 Months', 
                                status: 'Coming soon',
                                statusColor: '#FFA500',
                                img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
                                category: 'Data'
                            },
                            { 
                                title: 'Virtual Assistant', 
                                duration: '10 Weeks', 
                                status: 'Now Open',
                                statusColor: '#FF6B6B',
                                img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
                                category: 'Career'
                            },
                            { 
                                title: 'Software Engineering', 
                                duration: '12 Months', 
                                status: 'Now Open',
                                statusColor: '#00D9A5',
                                img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
                                category: 'Tech'
                            },
                            { 
                                title: 'Blockchain Development', 
                                duration: '10 Months', 
                                status: 'Coming soon',
                                statusColor: '#FFA500',
                                img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80',
                                category: 'Tech'
                            },
                            { 
                                title: 'Cybersecurity', 
                                duration: '10 Months', 
                                status: 'Now Open',
                                statusColor: '#00D9A5',
                                img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
                                category: 'Cyber Security'
                            },
                            { 
                                title: 'Product Design', 
                                duration: '9 Months', 
                                status: 'Coming soon',
                                statusColor: '#FFA500',
                                img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
                                category: 'Creative Tech'
                            }
                        ].map((program, index) => (
                            <div key={index} style={{ 
                                backgroundColor: 'white', 
                                borderRadius: '16px', 
                                overflow: 'hidden',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                            }}
                            >
                                {/* Status Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    left: '15px',
                                    backgroundColor: program.statusColor,
                                    color: 'white',
                                    padding: '6px 16px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    zIndex: 1
                                }}>
                                    {program.status}
                                </div>

                                <div style={{ height: '180px', overflow: 'hidden' }}>
                                    <img src={program.img} alt={program.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '25px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#1a1a1a', marginBottom: '8px' }}>{program.title}</h3>
                                    <p style={{ fontSize: '14px', color: '#999', marginBottom: '20px' }}>{program.duration}</p>
                                    
                                    <button style={{
                                        width: '100%',
                                        backgroundColor: '#00D9A5',
                                        color: 'white',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        marginBottom: '10px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#00c294';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#00D9A5';
                                    }}
                                    >
                                        {program.status === 'Now Open' ? 'Apply Now' : 'Register Interest'}
                                    </button>
                                    
                                    <button style={{
                                        width: '100%',
                                        backgroundColor: 'transparent',
                                        color: '#666',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#00D9A5';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = '#666';
                                    }}
                                    >
                                        Learn more
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View More Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <button style={{
                            backgroundColor: '#6C5CE7',
                            color: 'white',
                            padding: '16px 40px',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: '16px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#5b4cd6';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#6C5CE7';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        >
                            Show 7 more →
                        </button>
                        
                        <button style={{
                            backgroundColor: 'white',
                            color: '#6C5CE7',
                            padding: '16px 40px',
                            borderRadius: '50px',
                            border: '2px solid #6C5CE7',
                            fontSize: '16px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#6C5CE7';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#6C5CE7';
                        }}
                        >
                            View All Programs →
                        </button>
                    </div>
                </div>
            </section>

            {/* How It Works Section with Connecting Lines and Animations */}
            <section id="how-it-works" style={{ padding: '120px 20px', backgroundColor: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{ fontSize: '48px', fontWeight: '900', color: '#1a1a1a', marginBottom: '20px' }}>
                            How It Works
                        </h2>
                        <p style={{ fontSize: '20px', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
                            Your journey to a tech career in four simple steps
                        </p>
                    </div>

                    <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
                        {/* Connecting Line */}
                        <div style={{
                            position: 'absolute',
                            top: '50px',
                            left: '12.5%',
                            right: '12.5%',
                            height: '4px',
                            background: 'linear-gradient(90deg, #FF6B35 0%, #ff8c5a 100%)',
                            zIndex: 0,
                            opacity: 0.3
                        }}></div>

                        {[
                            { 
                                num: '1', 
                                title: 'Apply', 
                                desc: 'Submit your application and complete our assessment to join the program',
                                icon: (
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        <polyline points="14 2 14 8 20 8"/>
                                        <line x1="16" y1="13" x2="8" y2="13"/>
                                        <line x1="16" y1="17" x2="8" y2="17"/>
                                        <polyline points="10 9 9 9 8 9"/>
                                    </svg>
                                )
                            },
                            { 
                                num: '2', 
                                title: 'Learn', 
                                desc: 'Engage with world-class curriculum and build real-world projects',
                                icon: (
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                                    </svg>
                                )
                            },
                            { 
                                num: '3', 
                                title: 'Build', 
                                desc: 'Create a portfolio of projects that showcase your skills to employers',
                                icon: (
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                                    </svg>
                                )
                            },
                            { 
                                num: '4', 
                                title: 'Launch', 
                                desc: 'Get hired by top companies and launch your dream tech career',
                                icon: (
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <path d="M12 2v4"/>
                                        <path d="m16.2 7.8 2.9-2.9"/>
                                        <path d="M18 12h4"/>
                                        <path d="m16.2 16.2 2.9 2.9"/>
                                        <path d="M12 18v4"/>
                                        <path d="m4.9 19.1 2.9-2.9"/>
                                        <path d="M2 12h4"/>
                                        <path d="m4.9 4.9 2.9 2.9"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                )
                            }
                        ].map((step, index) => (
                            <div key={index} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                                <div style={{ 
                                    width: '100px', 
                                    height: '100px', 
                                    backgroundColor: '#FF6B35', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    margin: '0 auto 30px',
                                    position: 'relative',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 20px rgba(255,107,53,0.3)',
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,107,53,0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,107,53,0.3)';
                                }}
                                >
                                    {step.icon}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-5px',
                                        right: '-5px',
                                        width: '32px',
                                        height: '32px',
                                        backgroundColor: '#1a1a1a',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '16px',
                                        fontWeight: '900',
                                        color: 'white',
                                        border: '3px solid white'
                                    }}>
                                        {step.num}
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#1a1a1a', marginBottom: '15px' }}>{step.title}</h3>
                                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <style>{`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>
            </section>

            {/* Success Stories with Carousel */}
            <section style={{ padding: '120px 20px', backgroundColor: '#f5f5f5' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{ fontSize: '48px', fontWeight: '900', color: '#1a1a1a', marginBottom: '20px' }}>
                            Success Stories
                        </h2>
                        <p style={{ fontSize: '20px', color: '#666' }}>
                            Hear from our alumni who transformed their careers
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                        {[
                            { 
                                name: 'Amina Okafor', 
                                role: 'Software Engineer', 
                                company: 'Google',
                                quote: 'EduChain gave me the skills and confidence to land my dream job. The hands-on projects were game-changers.', 
                                fullQuote: 'EduChain gave me the skills and confidence to land my dream job. The hands-on projects were game-changers. I went from knowing nothing about coding to building full-stack applications in just 12 months. The mentorship program connected me with industry professionals who guided me every step of the way.',
                                img: 'https://randomuser.me/api/portraits/women/44.jpg',
                                logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'
                            },
                            { 
                                name: 'Kwame Mensah', 
                                role: 'Blockchain Developer',
                                company: 'Coinbase', 
                                quote: 'From zero coding experience to building DApps in 10 months. The curriculum is world-class.', 
                                fullQuote: 'From zero coding experience to building DApps in 10 months. The curriculum is world-class and the community support is incredible. I now work on cutting-edge blockchain projects and earn more than I ever imagined possible.',
                                img: 'https://randomuser.me/api/portraits/men/32.jpg',
                                logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="20"%3E%3Ctext x="0" y="15" font-family="Arial" font-size="16" font-weight="bold" fill="%230052FF"%3ECoinbase%3C/text%3E%3C/svg%3E'
                            },
                            { 
                                name: 'Sarah Kimani', 
                                role: 'Data Scientist',
                                company: 'Microsoft', 
                                quote: 'The program taught me how to think like a problem solver. Now I lead AI projects at Microsoft.', 
                                fullQuote: 'The program taught me how to think like a problem solver. Now I lead AI projects at Microsoft. The real-world projects and peer collaboration prepared me for the challenges of working in big tech. I\'m forever grateful for this opportunity.',
                                img: 'https://randomuser.me/api/portraits/women/68.jpg',
                                logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="20"%3E%3Ctext x="0" y="15" font-family="Arial" font-size="16" font-weight="bold" fill="%23737373"%3EMicrosoft%3C/text%3E%3C/svg%3E'
                            }
                        ].map((testimonial, index) => {
                            const [expanded, setExpanded] = useState(false);
                            
                            return (
                                <div key={index} style={{ 
                                    backgroundColor: 'white', 
                                    padding: '40px', 
                                    borderRadius: '12px', 
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
                                    transition: 'all 0.3s ease',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                                }}
                                >
                                    {/* Video Play Button Overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: '#FF6B35',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                    title="Watch video testimonial"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                        <img src={testimonial.img} alt={testimonial.name} style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '15px', objectFit: 'cover' }} />
                                        <div>
                                            <h4 style={{ fontSize: '18px', fontWeight: '900', color: '#1a1a1a', marginBottom: '5px' }}>{testimonial.name}</h4>
                                            <p style={{ fontSize: '14px', color: '#999', marginBottom: '8px' }}>{testimonial.role}</p>
                                            <img src={testimonial.logo} alt={testimonial.company} style={{ height: '16px', opacity: 0.7 }} />
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '15px', color: '#666', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '15px' }}>
                                        "{expanded ? testimonial.fullQuote : testimonial.quote}"
                                    </p>
                                    <button
                                        onClick={() => setExpanded(!expanded)}
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            color: '#FF6B35',
                                            fontSize: '14px',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            padding: 0
                                        }}
                                    >
                                        {expanded ? 'Read Less' : 'Read More'} →
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Carousel Navigation Dots */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
                        {[0, 1, 2].map((dot) => (
                            <div key={dot} style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: dot === 0 ? '#FF6B35' : '#ddd',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Community Section with World Map */}
            <section id="community" style={{ 
                background: 'linear-gradient(135deg, #FF6B35 0%, #ff8c5a 100%)',
                padding: '120px 20px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* World Map Background */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.1,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 600\'%3E%3Cpath fill=\'white\' d=\'M300,100 L350,120 L380,100 L400,130 L420,110 L450,140 L480,120 L500,150 L520,130 L550,160 L580,140 L600,170 L620,150 L650,180 L680,160 L700,190 L720,170 L750,200 L780,180 L800,210 L820,190 L850,220 L880,200 L900,230\'/%3E%3C/svg%3E")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '20px' }}>
                            Join a Global Community
                        </h2>
                        <p style={{ fontSize: '20px', opacity: 0.9, marginBottom: '30px' }}>
                            Connect with thousands of learners, mentors, and industry professionals
                        </p>
                        <button
                            onClick={onNavigateToLogin}
                            style={{
                                backgroundColor: 'white',
                                color: '#FF6B35',
                                padding: '16px 48px',
                                borderRadius: '50px',
                                border: 'none',
                                fontSize: '16px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                            }}
                        >
                            Join Community Now
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', textAlign: 'center' }}>
                        {[
                            { value: 100, suffix: 'K+', label: 'Active Learners' },
                            { value: 50, suffix: '+', label: 'Countries' },
                            { value: 500, suffix: '+', label: 'Mentors' },
                            { value: 1000, suffix: '+', label: 'Companies' }
                        ].map((stat, index) => (
                            <div key={index} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '40px', borderRadius: '12px', transition: 'all 0.3s ease' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                                e.currentTarget.style.transform = 'translateY(-5px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            >
                                <div style={{ fontSize: '56px', fontWeight: '900', marginBottom: '10px' }}>
                                    {visibleStats ? <AnimatedCounter end={stat.value} /> : 0}{stat.suffix}
                                </div>
                                <div style={{ fontSize: '16px', opacity: 0.9 }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Community with Africa Map */}
            <section style={{ padding: '120px 20px', backgroundColor: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center' }}>
                        {/* Realistic Africa Map */}
                        <div style={{ position: 'relative' }}>
                            <svg viewBox="0 0 1000 1200" style={{ width: '100%', height: 'auto', maxWidth: '500px' }}>
                                {/* Base Africa outline */}
                                <g>
                                    {/* Morocco */}
                                    <path d="M 420 120 L 460 110 L 490 115 L 510 130 L 515 150 L 505 165 L 480 170 L 455 165 L 435 155 L 425 140 Z" fill="#8FA3B5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Algeria */}
                                    <path d="M 435 155 L 455 165 L 480 170 L 505 165 L 530 170 L 560 185 L 580 210 L 590 245 L 585 280 L 570 305 L 540 315 L 510 310 L 480 295 L 460 270 L 445 240 L 435 210 L 430 180 Z" fill="#8FA3B5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Libya */}
                                    <path d="M 540 170 L 570 165 L 600 170 L 630 185 L 650 210 L 655 245 L 650 280 L 635 305 L 610 315 L 585 310 L 570 295 L 565 270 L 565 240 L 560 210 Z" fill="#8FA3B5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Egypt */}
                                    <path d="M 650 170 L 680 175 L 705 190 L 720 215 L 725 245 L 720 275 L 705 295 L 680 305 L 655 300 L 645 275 L 645 245 L 650 215 Z" fill="#1E3A5F" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Tunisia */}
                                    <path d="M 510 130 L 530 125 L 545 135 L 550 155 L 545 170 L 530 175 L 515 170 L 510 155 Z" fill="#1E3A5F" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Western Sahara */}
                                    <path d="M 380 180 L 410 175 L 430 185 L 435 210 L 430 235 L 410 245 L 385 240 L 375 220 L 375 200 Z" fill="#D4DDE5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Mauritania */}
                                    <path d="M 375 220 L 385 240 L 410 245 L 430 235 L 445 240 L 450 265 L 445 290 L 425 305 L 400 310 L 375 305 L 360 285 L 355 260 L 360 240 Z" fill="#D4DDE5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Mali */}
                                    <path d="M 425 265 L 445 260 L 470 265 L 495 280 L 510 305 L 515 335 L 505 360 L 480 370 L 455 365 L 435 350 L 420 325 L 420 295 Z" fill="#1E3A5F" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Niger */}
                                    <path d="M 480 295 L 510 290 L 540 295 L 570 310 L 590 335 L 595 365 L 585 390 L 560 400 L 535 395 L 515 380 L 505 355 L 500 325 Z" fill="#D4DDE5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Chad */}
                                    <path d="M 560 310 L 590 305 L 620 315 L 640 340 L 650 375 L 645 410 L 625 430 L 600 435 L 575 425 L 560 400 L 555 370 L 555 340 Z" fill="#8FA3B5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Sudan */}
                                    <path d="M 620 315 L 655 310 L 685 320 L 710 345 L 725 380 L 730 420 L 720 455 L 700 480 L 675 490 L 650 485 L 630 465 L 620 435 L 620 400 L 620 365 Z" fill="#8FA3B5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Ethiopia */}
                                    <path d="M 700 420 L 730 415 L 760 430 L 780 460 L 785 495 L 775 525 L 750 540 L 720 535 L 695 520 L 680 495 L 675 465 L 680 440 Z" fill="#1E3A5F" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Somalia */}
                                    <path d="M 760 460 L 785 470 L 810 495 L 830 530 L 840 570 L 835 610 L 820 640 L 800 655 L 780 650 L 765 630 L 755 600 L 755 565 L 760 530 L 765 495 Z" fill="#D4DDE5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Kenya */}
                                    <path d="M 720 535 L 750 530 L 775 545 L 785 575 L 785 610 L 775 640 L 755 655 L 730 650 L 710 630 L 700 600 L 700 565 Z" fill="#1E3A5F" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Senegal */}
                                    <path d="M 320 270 L 345 265 L 365 275 L 370 295 L 365 310 L 345 315 L 325 310 L 315 295 L 315 280 Z" fill="#D4DDE5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Guinea */}
                                    <path d="M 345 315 L 365 310 L 385 320 L 395 340 L 390 360 L 370 370 L 350 365 L 340 350 L 340 330 Z" fill="#D4DDE5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Ivory Coast */}
                                    <path d="M 370 370 L 390 365 L 410 375 L 420 395 L 415 415 L 395 425 L 375 420 L 365 405 L 365 385 Z" fill="#D4DDE5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Ghana */}
                                    <path d="M 415 395 L 435 390 L 455 400 L 460 420 L 455 440 L 435 450 L 415 445 L 410 425 Z" fill="#1E3A5F" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Nigeria */}
                                    <path d="M 455 400 L 485 395 L 515 405 L 535 425 L 540 455 L 530 480 L 505 490 L 480 485 L 460 470 L 455 445 L 455 420 Z" fill="#1E3A5F" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Cameroon */}
                                    <path d="M 530 455 L 550 450 L 570 465 L 580 495 L 575 525 L 555 540 L 535 535 L 520 515 L 515 485 Z" fill="#8FA3B5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Central African Republic */}
                                    <path d="M 570 425 L 600 420 L 630 430 L 650 450 L 655 480 L 645 505 L 620 515 L 595 510 L 575 495 L 565 470 L 565 445 Z" fill="#D4DDE5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* DRC */}
                                    <path d="M 535 535 L 565 530 L 600 540 L 630 560 L 650 595 L 655 635 L 645 675 L 620 700 L 585 710 L 550 705 L 520 685 L 500 655 L 490 620 L 495 580 L 510 555 Z" fill="#1E3A5F" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Tanzania */}
                                    <path d="M 700 600 L 730 595 L 760 610 L 775 640 L 780 675 L 770 705 L 745 720 L 715 715 L 690 700 L 675 670 L 670 640 L 675 615 Z" fill="#8FA3B5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Angola */}
                                    <path d="M 520 685 L 550 680 L 585 690 L 610 710 L 625 745 L 625 785 L 610 820 L 580 835 L 550 830 L 525 815 L 510 785 L 505 750 L 510 715 Z" fill="#8FA3B5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Zambia */}
                                    <path d="M 620 710 L 650 705 L 680 715 L 705 735 L 715 770 L 710 805 L 690 825 L 660 830 L 635 820 L 620 795 L 615 760 L 615 735 Z" fill="#D4DDE5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Zimbabwe */}
                                    <path d="M 690 825 L 715 820 L 740 830 L 755 855 L 755 885 L 740 905 L 715 910 L 690 900 L 675 880 L 675 850 Z" fill="#8FA3B5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Mozambique */}
                                    <path d="M 740 830 L 770 825 L 800 840 L 820 870 L 830 910 L 825 950 L 810 985 L 785 1000 L 760 995 L 740 975 L 730 945 L 730 910 L 735 875 L 740 850 Z" fill="#D4DDE5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* South Africa */}
                                    <path d="M 580 900 L 620 890 L 660 900 L 700 920 L 730 950 L 745 990 L 740 1030 L 715 1060 L 675 1075 L 630 1070 L 590 1050 L 560 1020 L 545 985 L 545 950 L 555 920 Z" fill="#1E3A5F" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Namibia */}
                                    <path d="M 510 815 L 545 810 L 580 825 L 600 860 L 605 900 L 595 940 L 575 970 L 545 985 L 515 975 L 490 950 L 480 915 L 485 875 L 495 845 Z" fill="#8FA3B5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Botswana */}
                                    <path d="M 595 900 L 625 895 L 655 910 L 675 935 L 680 970 L 670 1000 L 645 1015 L 615 1010 L 590 990 L 580 960 L 580 930 Z" fill="#D4DDE5" stroke="#fff" strokeWidth="2"/>
                                    
                                    {/* Madagascar */}
                                    <path d="M 850 800 L 870 810 L 885 840 L 895 880 L 895 930 L 885 975 L 865 1010 L 840 1025 L 815 1020 L 800 990 L 795 950 L 800 910 L 810 870 L 825 840 Z" fill="#D4DDE5" stroke="#fff" strokeWidth="2"/>
                                </g>
                            </svg>
                        </div>

                        {/* Text Content */}
                        <div>
                            <h2 style={{ fontSize: '48px', fontWeight: '900', color: '#1E3A5F', marginBottom: '30px', lineHeight: '1.2' }}>
                                Join a Community that Has Your Back
                            </h2>
                            <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.8' }}>
                                Experience the power of a community that walks with you throughout your career. Our supportive environments are designed for you to connect, collaborate, and build lasting relationships with peers and mentors, fostering collective growth and shared success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section with Company Logos */}
            <section style={{ padding: '80px 20px', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#1a1a1a', marginBottom: '20px' }}>
                        Explore the Companies Investing in our Talent
                    </h2>
                    <p style={{ fontSize: '18px', color: '#666', marginBottom: '60px' }}>
                        Our graduates work at leading companies worldwide
                    </p>
                    
                    {/* Scrolling Logos Container */}
                    <div style={{ position: 'relative', overflow: 'hidden', padding: '20px 0' }}>
                        <div style={{ 
                            display: 'flex', 
                            gap: '80px', 
                            animation: 'scroll 30s linear infinite',
                            width: 'fit-content',
                            alignItems: 'center'
                        }}>
                            {[
                                { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png', width: '120px' },
                                { name: 'Microsoft', logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31', width: '140px' },
                                { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', width: '100px' },
                                { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg', width: '100px' },
                                { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', width: '40px' },
                                { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', width: '100px' },
                                // Duplicate for seamless loop
                                { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png', width: '120px' },
                                { name: 'Microsoft', logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31', width: '140px' },
                                { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', width: '100px' },
                                { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg', width: '100px' },
                                { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', width: '40px' },
                                { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', width: '100px' }
                            ].map((company, index) => (
                                <div key={index} style={{ 
                                    opacity: 0.5,
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: company.width,
                                    height: '60px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = '0.5';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                                >
                                    <img 
                                        src={company.logo} 
                                        alt={company.name}
                                        style={{ 
                                            width: company.width,
                                            height: 'auto',
                                            maxHeight: '50px',
                                            objectFit: 'contain'
                                        }}
                                        onError={(e) => {
                                            // Fallback to text if image fails to load
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement!.innerHTML = `<span style="font-size: 24px; font-weight: 900; color: #1a1a1a;">${company.name}</span>`;
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <style>{`
                    @keyframes scroll {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                `}</style>
            </section>

            {/* About Section */}
            <section id="about" style={{ padding: '120px 20px', backgroundColor: '#f5f5f5' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '48px', fontWeight: '900', color: '#1a1a1a', marginBottom: '30px' }}>
                            About EduChain
                        </h2>
                        <p style={{ fontSize: '18px', color: '#666', marginBottom: '25px', lineHeight: '1.8' }}>
                            EduChain is transforming lives through technology education. We're building Africa's largest community of tech professionals, providing world-class training that prepares learners for the global digital economy.
                        </p>
                        <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px', lineHeight: '1.8' }}>
                            Our mission is simple: democratize access to quality tech education and create pathways to economic opportunity for talented individuals across the continent.
                        </p>
                        <button
                            onClick={onNavigateToLogin}
                            style={{
                                backgroundColor: '#1a1a1a',
                                color: 'white',
                                padding: '16px 40px',
                                borderRadius: '50px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#FF6B35';
                                e.currentTarget.style.transform = 'translateY(-3px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#1a1a1a';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            Learn More About Us
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                        {[
                            { value: '2018', label: 'Founded' },
                            { value: '$100M+', label: 'In Scholarships' },
                            { value: '95%', label: 'Job Placement' },
                            { value: '50+', label: 'Countries' }
                        ].map((stat, index) => (
                            <div key={index} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                            }}
                            >
                                <div style={{ fontSize: '40px', fontWeight: '900', color: '#FF6B35', marginBottom: '10px' }}>{stat.value}</div>
                                <div style={{ fontSize: '14px', color: '#666' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section style={{ 
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                padding: '120px 20px',
                textAlign: 'center',
                color: 'white'
            }}>
                <h2 style={{ fontSize: '56px', fontWeight: '900', marginBottom: '30px' }}>
                    Ready to Transform Your Life?
                </h2>
                <p style={{ fontSize: '24px', color: '#b0b0b0', marginBottom: '50px', maxWidth: '800px', margin: '0 auto 50px' }}>
                    Join thousands of learners who are building the future of Africa's tech ecosystem
                </p>
                <button
                    onClick={onNavigateToLogin}
                    style={{
                        backgroundColor: '#FF6B35',
                        color: 'white',
                        padding: '20px 60px',
                        borderRadius: '50px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '16px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        boxShadow: '0 8px 24px rgba(255,107,53,0.4)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,107,53,0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,53,0.4)';
                    }}
                >
                    Start Your Application
                </button>
                <p style={{ marginTop: '30px', color: '#999', fontSize: '14px' }}>
                    Applications close soon. Don't miss your chance.
                </p>
            </section>

            {/* Enhanced Footer with Newsletter */}
            <footer style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '80px 20px 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Newsletter Section */}
                    <div style={{ 
                        backgroundColor: '#2d2d2d', 
                        padding: '50px', 
                        borderRadius: '16px', 
                        marginBottom: '60px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '15px' }}>
                            Stay Updated
                        </h3>
                        <p style={{ color: '#999', marginBottom: '30px', fontSize: '16px' }}>
                            Subscribe to our newsletter for the latest updates, tips, and opportunities
                        </p>
                        <div style={{ display: 'flex', gap: '15px', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                style={{
                                    flex: 1,
                                    minWidth: '250px',
                                    padding: '16px 24px',
                                    borderRadius: '50px',
                                    border: 'none',
                                    fontSize: '15px',
                                    backgroundColor: '#1a1a1a',
                                    color: 'white'
                                }}
                            />
                            <button style={{
                                backgroundColor: '#FF6B35',
                                color: 'white',
                                padding: '16px 40px',
                                borderRadius: '50px',
                                border: 'none',
                                fontSize: '15px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#ff8c5a';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#FF6B35';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '60px' }}>
                        <div>
                            <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '20px' }}>
                                edu<span style={{ color: '#FF6B35' }}>chain</span>
                            </h3>
                            <p style={{ color: '#999', marginBottom: '20px', lineHeight: '1.6' }}>
                                Empowering Africa's next generation of tech leaders through world-class education.
                            </p>
                            
                            {/* Social Media with Icons */}
                            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                                {[
                                    { name: 'Twitter', icon: '𝕏' },
                                    { name: 'LinkedIn', icon: 'in' },
                                    { name: 'Instagram', icon: 'IG' },
                                    { name: 'Facebook', icon: 'f' },
                                    { name: 'YouTube', icon: '▶' }
                                ].map((social, index) => (
                                    <div key={index} style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        backgroundColor: '#2d2d2d', 
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#FF6B35';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#2d2d2d';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                    title={social.name}
                                    >
                                        {social.icon}
                                    </div>
                                ))}
                            </div>

                            {/* Language Selector */}
                            <div style={{ marginTop: '20px' }}>
                                <select style={{
                                    backgroundColor: '#2d2d2d',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    width: '100%',
                                    maxWidth: '200px'
                                }}>
                                    <option>🌍 English</option>
                                    <option>🇫🇷 Français</option>
                                    <option>🇪🇸 Español</option>
                                    <option>🇵🇹 Português</option>
                                    <option>🇸🇦 العربية</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Programs</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['Software Engineering', 'Blockchain Development', 'Data Science & AI', 'Cloud Computing', 'Cybersecurity', 'Product Design'].map((item, index) => (
                                    <a key={index} href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                                    >{item}</a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Company</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['About Us', 'Our Team', 'Careers', 'Contact', 'Press', 'Partners'].map((item, index) => (
                                    <a key={index} href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                                    >{item}</a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Resources</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['Blog', 'FAQs', 'Community', 'Support', 'Documentation', 'Terms & Privacy'].map((item, index) => (
                                    <a key={index} href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                                    >{item}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid #2d2d2d', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                        <p style={{ color: '#999', fontSize: '14px' }}>© 2024 EduChain. All rights reserved. #DoHardThings</p>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <a href="#" style={{ color: '#999', fontSize: '14px', textDecoration: 'none' }}>Privacy Policy</a>
                            <a href="#" style={{ color: '#999', fontSize: '14px', textDecoration: 'none' }}>Terms of Service</a>
                            <a href="#" style={{ color: '#999', fontSize: '14px', textDecoration: 'none' }}>Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: '40px',
                        right: '40px',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#FF6B35',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '24px',
                        boxShadow: '0 4px 12px rgba(255,107,53,0.4)',
                        zIndex: 999,
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,107,53,0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,53,0.4)';
                    }}
                >
                    ↑
                </button>
            )}

            {/* Floating Apply Button */}
            {scrolled && (
                <button
                    onClick={onNavigateToLogin}
                    style={{
                        position: 'fixed',
                        bottom: '40px',
                        left: '40px',
                        backgroundColor: '#FF6B35',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '50px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '14px',
                        boxShadow: '0 4px 12px rgba(255,107,53,0.4)',
                        zIndex: 999,
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,107,53,0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,53,0.4)';
                    }}
                >
                     Apply Now
                </button>
            )}
        </div>
    );
};

export default LandingPage;
