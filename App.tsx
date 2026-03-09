import React, { useState, useCallback, useEffect } from 'react';
import { User, Course, Mentor, CommunityMember, Reward } from './types';
import { login, register, getCourses, getMentors, getCommunity, getRewards } from './api.ts';
import { useCurrentAccount } from '@mysten/dapp-kit';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MyCourses from './components/MyCourses';
import CourseCreation from './components/CourseCreation';
import Mentors from './components/Mentors';
import Community from './components/Community';
import Profile from './components/Profile';
import Rewards from './components/Rewards';
import Admin from './components/Admin';

export type View = 'dashboard' | 'my-courses' | 'create-course' | 'mentors' | 'community' | 'profile' | 'rewards' | 'admin' | 'login' | 'signup';

const AuthModal: React.FC<{ onClose: () => void; onLogin: (email: string, password: string) => void; onShowSignup: () => void }> = ({ onClose, onLogin, onShowSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity">
            <div className="bg-dark-card rounded-lg shadow-xl p-8 w-full max-w-sm border border-dark-border relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-dark-text-secondary hover:text-dark-text-primary">X</button>
                <h2 className="text-2xl font-bold text-center mb-6 text-dark-text-primary">Sign In</h2>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-4 p-2 rounded" />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-4 p-2 rounded" />
                <button onClick={() => onLogin(email, password)} className="w-full bg-brand-primary text-white py-2 rounded mb-2">Login</button>
                <button onClick={onShowSignup} className="w-full bg-gray-600 text-white py-2 rounded">Sign Up</button>
            </div>
        </div>
    );
};

const SignupModal: React.FC<{ onClose: () => void; onSignup: (name: string, email: string, password: string, role: string, avatarFile?: File) => void }> = ({ onClose, onSignup }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity">
            <div className="bg-dark-card rounded-lg shadow-xl p-8 w-full max-w-sm border border-dark-border relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-dark-text-secondary hover:text-dark-text-primary">X</button>
                <h2 className="text-2xl font-bold text-center mb-6 text-dark-text-primary">Sign Up</h2>
                <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full mb-4 p-2 rounded" />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-4 p-2 rounded" />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-4 p-2 rounded" />
                <select value={role} onChange={e => setRole(e.target.value)} className="w-full mb-4 p-2 rounded">
                    <option value="student">Student</option>
                    <option value="mentor">Mentor</option>
                </select>
                <input type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files ? e.target.files[0] : null)} className="w-full mb-4 p-2 rounded" />
                <button onClick={() => onSignup(name, email, password, role, avatarFile || undefined)} className="w-full bg-brand-primary text-white py-2 rounded">Sign Up</button>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const currentAccount = useCurrentAccount();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [courses, setCourses] = useState<Course[]>([]);
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [community, setCommunity] = useState<CommunityMember[]>([]);
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [showSignup, setShowSignup] = useState<boolean>(false);

    // Handle wallet connection
    useEffect(() => {
        if (currentAccount) {
            // Create user object from wallet account
            const walletUser: User = {
                id: currentAccount.address,
                name: `User ${currentAccount.address.slice(0, 6)}...${currentAccount.address.slice(-4)}`,
                walletAddress: currentAccount.address,
                avatarUrl: '',
                bio: '',
                coursesEnrolled: [],
                coursesCreated: [],
                rewards: [],
                isAdmin: false
            };
            setUser(walletUser);
            setIsAuthenticated(true);
            setCurrentView('dashboard');
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, [currentAccount]);

    const handleLogin = async (email: string, password: string) => {
        try {
            const res = await login(email, password);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            setIsWalletModalOpen(false);
            setCurrentView('dashboard');
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials and try again.';
            alert(errorMessage);
        }
    };

    const handleSignup = async (name: string, email: string, password: string, role: string, avatarFile?: File) => {
        try {
            const res = await register(name, email, password, role, avatarFile);
            // Show success message
            alert(res.data.message);
            // Automatically log in after signup
            const loginRes = await login(email, password);
            // Use avatarUrl from registration response if present
            const userWithAvatar = { ...loginRes.data.user };
            if (res.data.user.avatarUrl) {
                userWithAvatar.avatarUrl = res.data.user.avatarUrl;
            }
            localStorage.setItem('token', loginRes.data.token);
            setUser(userWithAvatar);
            setIsAuthenticated(true);
            setIsWalletModalOpen(false);
            setCurrentView('dashboard');
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
            alert(errorMessage);
        }
    };

    const handleDisconnect = useCallback(() => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
        // Note: Wallet disconnection is handled by the wallet provider
    }, []);

    const renderView = () => {
        // Fallback: if user is null, use a default empty user object with rewards
        if (!user || !user.name) {
            return <Dashboard user={{ id: '', name: '', rewards, coursesEnrolled: [], coursesCreated: [], walletAddress: '', avatarUrl: '', bio: '', isAdmin: false }} courses={courses} />;
        }
        switch (currentView) {
            case 'dashboard':
                return <Dashboard user={{ ...user, rewards }} courses={courses} />;
            case 'my-courses':
                return <MyCourses courses={courses.slice(0, 2)} />;
            case 'create-course':
                return <CourseCreation />;
            case 'mentors':
                return <Mentors mentors={mentors} />;
            case 'community':
                return <Community members={community} />;
            case 'profile':
                return <Profile user={user} />;
            case 'rewards':
                return <Rewards rewards={rewards} />;
            case 'admin':
                return user.isAdmin ? <Admin /> : <div className="text-dark-text-primary p-8">Access Denied.</div>;
            case 'login':
                return (
                    <LoginPage 
                        onBack={() => setCurrentView('dashboard')}
                        onLogin={handleLogin}
                        onShowSignup={() => setCurrentView('signup')}
                        onGoogleLogin={() => setIsWalletModalOpen(true)}
                        onLinkedInLogin={() => setIsWalletModalOpen(true)}
                        onFacebookLogin={() => setIsWalletModalOpen(true)}
                        isSignup={false}
                    />
                );
            case 'signup':
                return (
                    <LoginPage 
                        onBack={() => setCurrentView('dashboard')}
                        onLogin={(email, password) => handleSignup('', email, password, 'student')}
                        onSignup={handleSignup}
                        onShowLogin={() => setCurrentView('login')}
                        onGoogleLogin={() => setIsWalletModalOpen(true)}
                        onLinkedInLogin={() => setIsWalletModalOpen(true)}
                        onFacebookLogin={() => setIsWalletModalOpen(true)}
                        isSignup={true}
                    />
                );
            default:
                return <Dashboard user={{ ...user, rewards }} courses={courses} />;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const [coursesRes, mentorsRes, communityRes, rewardsRes] = await Promise.all([
                        getCourses(token),
                        getMentors(token),
                        getCommunity(token),
                        getRewards(token)
                    ]);
                    setCourses(coursesRes.data);
                    setMentors(mentorsRes.data);
                    setCommunity(communityRes.data);
                    setRewards(rewardsRes.data);
                } catch (err) {
                    // Handle error or show fallback
                }
            }
        };
        if (isAuthenticated) fetchData();
    }, [isAuthenticated]);

    // Debug logging to diagnose dashboard rendering issue
    useEffect(() => {
        console.log('App state:', {
            isAuthenticated,
            user,
            currentView,
            courses,
            mentors,
            community,
            rewards
        });
    }, [isAuthenticated, user, currentView, courses, mentors, community, rewards]);

    if (!isAuthenticated) {
        // Show login/signup pages when navigating to those views
        if (currentView === 'login') {
            return (
                <>
                    <LoginPage 
                        onBack={() => setCurrentView('dashboard')}
                        onLogin={handleLogin}
                        onShowSignup={() => setCurrentView('signup')}
                        onGoogleLogin={() => setIsWalletModalOpen(true)}
                        onLinkedInLogin={() => setIsWalletModalOpen(true)}
                        onFacebookLogin={() => setIsWalletModalOpen(true)}
                        isSignup={false}
                    />
                    {isWalletModalOpen && !showSignup && (
                        <AuthModal
                            onClose={() => setIsWalletModalOpen(false)}
                            onLogin={handleLogin}
                            onShowSignup={() => setShowSignup(true)}
                        />
                    )}
                    {isWalletModalOpen && showSignup && (
                        <SignupModal
                            onClose={() => setIsWalletModalOpen(false)}
                            onSignup={handleSignup}
                        />
                    )}
                </>
            );
        }
        if (currentView === 'signup') {
            return (
                <>
                    <LoginPage 
                        onBack={() => setCurrentView('dashboard')}
                        onLogin={(email, password) => handleSignup('', email, password, 'student')}
                        onSignup={handleSignup}
                        onShowLogin={() => setCurrentView('login')}
                        onGoogleLogin={() => setIsWalletModalOpen(true)}
                        onLinkedInLogin={() => setIsWalletModalOpen(true)}
                        onFacebookLogin={() => setIsWalletModalOpen(true)}
                        isSignup={true}
                    />
                    {isWalletModalOpen && !showSignup && (
                        <AuthModal
                            onClose={() => setIsWalletModalOpen(false)}
                            onLogin={handleLogin}
                            onShowSignup={() => setShowSignup(true)}
                        />
                    )}
                    {isWalletModalOpen && showSignup && (
                        <SignupModal
                            onClose={() => setIsWalletModalOpen(false)}
                            onSignup={handleSignup}
                        />
                    )}
                </>
            );
        }
        return (
            <>
                <LandingPage onNavigateToLogin={() => setCurrentView('login')} />
                {isWalletModalOpen && !showSignup && (
                    <AuthModal
                        onClose={() => setIsWalletModalOpen(false)}
                        onLogin={handleLogin}
                        onShowSignup={() => setShowSignup(true)}
                    />
                )}
                {isWalletModalOpen && showSignup && (
                    <SignupModal
                        onClose={() => setIsWalletModalOpen(false)}
                        onSignup={handleSignup}
                    />
                )}
            </>
        );
    }

    return (
        <div className="flex h-screen bg-dark-bg text-dark-text-primary">
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} userIsAdmin={user?.isAdmin || false} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header user={user} onDisconnect={handleDisconnect} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-dark-bg p-4 sm:p-6 lg:p-8">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;
