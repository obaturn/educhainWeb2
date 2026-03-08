
import React, { useState } from 'react';
import { User } from '../types';
import { SearchIcon, ChevronDownIcon, LogoutIcon } from './icons/IconComponents';

interface HeaderProps {
    user: User | null;
    onDisconnect: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onDisconnect }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    if (!user) return null;

    // Fallback to profile.avatarUrl if direct avatarUrl is missing
    const avatarUrl = user.avatarUrl || (user.profile && user.profile.avatarUrl) || '';

    return (
        <header className="bg-dark-card border-b border-dark-border px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0">
            {/* Search Bar */}
            <div className="relative hidden md:block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon className="h-5 w-5 text-dark-text-secondary" />
                </span>
                <input
                    type="text"
                    placeholder="Search courses, mentors..."
                    className="bg-dark-bg border border-dark-border rounded-lg py-2 pl-10 pr-4 w-80 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
            </div>

            {/* User Profile Section */}
            <div className="ml-auto relative">
                <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)} 
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-dark-bg"
                >
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">?
                        </div>
                    )}
                    <div className="text-left hidden sm:block">
                        <p className="font-semibold text-sm text-dark-text-primary">{user.name}</p>
                        <p className="text-xs text-dark-text-secondary truncate max-w-[100px]">{user.walletAddress}</p>
                    </div>
                    <ChevronDownIcon className={`h-5 w-5 text-dark-text-secondary transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-dark-card border border-dark-border rounded-lg shadow-lg py-1 z-20">
                        <a href="#" className="block px-4 py-2 text-sm text-dark-text-secondary hover:bg-dark-bg hover:text-dark-text-primary">Your Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm text-dark-text-secondary hover:bg-dark-bg hover:text-dark-text-primary">Settings</a>
                        <div className="border-t border-dark-border my-1"></div>
                        <button
                            onClick={onDisconnect}
                            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-dark-bg"
                        >
                            <LogoutIcon className="h-5 w-5 mr-2" />
                            Disconnect
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
