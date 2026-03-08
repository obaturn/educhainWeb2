
import React from 'react';
import { Reward } from '../types';

interface RewardsProps {
    rewards: Reward[];
}

const Rewards: React.FC<RewardsProps> = ({ rewards }) => {
    const totalClaimed = rewards.filter(r => r.status === 'Claimed').reduce((acc, r) => acc + r.amount, 0);
    const totalPending = rewards.filter(r => r.status === 'Pending').reduce((acc, r) => acc + r.amount, 0);

    const handleClaimAll = async () => {
        const token = localStorage.getItem('token');
        try {
            await fetch('http://localhost:5000/api/rewards/claim', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            // Optionally refresh rewards list
        } catch (err) {
            // Optionally show error
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-dark-text-primary">My Rewards</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
                    <h3 className="font-semibold text-dark-text-secondary">Total Claimed</h3>
                    <p className="text-3xl font-bold text-green-400">{totalClaimed} EDU</p>
                </div>
                <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
                    <h3 className="font-semibold text-dark-text-secondary">Pending Rewards</h3>
                    <p className="text-3xl font-bold text-yellow-400">{totalPending} EDU</p>
                    {totalPending > 0 && <button className="mt-2 w-full sm:w-auto bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300" onClick={handleClaimAll}>Claim All</button>}
                </div>
            </div>
            
            <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
                <div className="p-4">
                    <h2 className="text-xl font-bold">Rewards History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-dark-bg">
                            <tr>
                                <th className="p-4 font-semibold text-sm text-dark-text-secondary">Course</th>
                                <th className="p-4 font-semibold text-sm text-dark-text-secondary">Amount</th>
                                <th className="p-4 font-semibold text-sm text-dark-text-secondary">Date</th>
                                <th className="p-4 font-semibold text-sm text-dark-text-secondary text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rewards.map((reward) => (
                                <tr key={reward.courseId} className="border-t border-dark-border hover:bg-dark-bg">
                                    <td className="p-4 font-medium text-dark-text-primary">{reward.courseTitle}</td>
                                    <td className="p-4 font-medium text-green-400">{reward.amount} EDU</td>
                                    <td className="p-4 text-dark-text-secondary">{reward.date}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${reward.status === 'Claimed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                                            {reward.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Rewards;
