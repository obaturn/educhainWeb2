
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileProps {
    user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:5000/api/users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, bio })
            });
        } catch (err) {
            // Optionally show error
        }
        setIsSaving(false);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-dark-text-primary">My Profile</h1>
            <div className="bg-dark-card p-8 rounded-lg border border-dark-border max-w-3xl">
                <div className="flex items-center space-x-6 mb-8">
                    <img src={user.avatarUrl} alt={user.name} className="h-24 w-24 rounded-full object-cover border-4 border-brand-primary" />
                    <div>
                        <button className="bg-dark-bg hover:bg-brand-primary text-dark-text-secondary hover:text-white font-bold py-2 px-4 rounded-lg border border-dark-border transition-colors duration-300">
                            Change Avatar
                        </button>
                        <p className="text-sm text-dark-text-secondary mt-2">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-dark-text-secondary mb-2">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="wallet" className="block text-sm font-medium text-dark-text-secondary mb-2">Wallet Address</label>
                        <input
                            type="text"
                            id="wallet"
                            value={user.walletAddress}
                            disabled
                            className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3 text-dark-text-secondary cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-dark-text-secondary mb-2">Biography</label>
                        <textarea
                            id="bio"
                            rows={4}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        ></textarea>
                    </div>
                </div>

                <div className="mt-8 border-t border-dark-border pt-6 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
