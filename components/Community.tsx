
import React from 'react';
import { CommunityMember } from '../types';

interface CommunityProps {
    members: CommunityMember[];
}

const Community: React.FC<CommunityProps> = ({ members }) => {
    const sortedMembers = [...members].sort((a, b) => b.contributionPoints - a.contributionPoints);
    
    const getRankColor = (index: number) => {
        if (index === 0) return 'text-yellow-400 border-yellow-400';
        if (index === 1) return 'text-gray-400 border-gray-400';
        if (index === 2) return 'text-orange-400 border-orange-400';
        return 'text-dark-text-secondary border-dark-border';
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-dark-text-primary">Community Hub</h1>
            <p className="text-dark-text-secondary mb-8">
                Connect with fellow learners, creators, and mentors. See who's making the biggest impact!
            </p>

            <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
                <div className="p-4">
                    <h2 className="text-xl font-bold">Contribution Leaderboard</h2>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-dark-bg">
                        <tr>
                            <th className="p-4 font-semibold text-sm text-dark-text-secondary">Rank</th>
                            <th className="p-4 font-semibold text-sm text-dark-text-secondary">Member</th>
                            <th className="p-4 font-semibold text-sm text-dark-text-secondary">Role</th>
                            <th className="p-4 font-semibold text-sm text-dark-text-secondary text-right">Contribution Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedMembers.map((member, index) => (
                            <tr key={member.id} className="border-t border-dark-border hover:bg-dark-bg" onClick={async () => {
                                const token = localStorage.getItem('token');
                                try {
                                    await fetch(`http://localhost:5000/api/community/${member.id}/join`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        }
                                    });
                                    // Optionally show success message
                                } catch (err) {
                                    // Optionally show error
                                }
                            }}>
                                <td className={`p-4 font-bold ${getRankColor(index)}`}>#{index + 1}</td>
                                <td className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <img src={member.avatarUrl} alt={member.name} className="h-10 w-10 rounded-full" />
                                        <span className="font-medium text-dark-text-primary">{member.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-dark-text-secondary">{member.role}</td>
                                <td className="p-4 font-bold text-dark-text-primary text-right">{member.contributionPoints.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Community;
