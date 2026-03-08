
import React from 'react';
import { View } from '../App';
import {
    DashboardIcon,
    CoursesIcon,
    CreateIcon,
    MentorsIcon,
    CommunityIcon,
    ProfileIcon,
    RewardsIcon,
    AdminIcon
} from './icons/IconComponents';

interface SidebarProps {
    currentView: View;
    setCurrentView: (view: View) => void;
    userIsAdmin: boolean;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
            isActive
                ? 'bg-brand-primary text-white shadow-lg'
                : 'text-dark-text-secondary hover:bg-dark-card hover:text-dark-text-primary'
        }`}
    >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
    </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, userIsAdmin }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="h-5 w-5" /> },
        { id: 'my-courses', label: 'My Courses', icon: <CoursesIcon className="h-5 w-5" /> },
        { id: 'create-course', label: 'Create Course', icon: <CreateIcon className="h-5 w-5" /> },
        { id: 'mentors', label: 'Mentors', icon: <MentorsIcon className="h-5 w-5" /> },
        { id: 'community', label: 'Community', icon: <CommunityIcon className="h-5 w-5" /> },
        { id: 'profile', label: 'Profile', icon: <ProfileIcon className="h-5 w-5" /> },
        { id: 'rewards', label: 'Rewards', icon: <RewardsIcon className="h-5 w-5" /> },
    ];
    
    if (userIsAdmin) {
        navItems.push({ id: 'admin', label: 'Admin Panel', icon: <AdminIcon className="h-5 w-5" /> });
    }

    return (
        <aside className="w-64 bg-dark-card border-r border-dark-border p-4 flex flex-col">
            <div className="flex items-center mb-8 px-2">
                 <h1 className="text-2xl font-bold">
                    <span className="text-brand-primary">eDu</span>Chain
                </h1>
            </div>
            <nav className="flex-1 space-y-2">
                {navItems.map(item => (
                    <NavItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        isActive={currentView === item.id}
                        onClick={() => setCurrentView(item.id as View)}
                    />
                ))}
            </nav>
            <div className="mt-auto">
                <div className="p-4 bg-dark-bg rounded-lg text-center">
                    <h4 className="font-bold text-dark-text-primary">Upgrade to Pro</h4>
                    <p className="text-sm text-dark-text-secondary mt-1 mb-3">Get access to exclusive courses and features.</p>
                    <button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-2 px-4 rounded-lg text-sm">
                        Upgrade
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
