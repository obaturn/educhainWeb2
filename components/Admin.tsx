
import React from 'react';

const StatCard: React.FC<{ title: string, value: string, change: string, changeType: 'increase' | 'decrease' }> = ({ title, value, change, changeType }) => (
    <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
        <h3 className="text-sm font-medium text-dark-text-secondary">{title}</h3>
        <div className="flex items-baseline space-x-2 mt-1">
            <p className="text-2xl font-bold text-dark-text-primary">{value}</p>
            <span className={`text-sm font-semibold ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                {change}
            </span>
        </div>
    </div>
);

const Admin: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-dark-text-primary">Admin Control Panel</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Users" value="12,450" change="+5.2% this month" changeType="increase" />
                <StatCard title="Active Courses" value="2,180" change="+120 this month" changeType="increase" />
                <StatCard title="Platform Revenue" value="$42,300" change="-1.8% this month" changeType="decrease" />
                <StatCard title="Pending Verifications" value="15" change="+3 today" changeType="increase" />
            </div>

            <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
                <h2 className="text-xl font-bold text-dark-text-primary mb-4">Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button className="bg-dark-bg hover:bg-brand-primary hover:text-white border border-dark-border text-dark-text-secondary font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                        Manage Users
                    </button>
                    <button className="bg-dark-bg hover:bg-brand-primary hover:text-white border border-dark-border text-dark-text-secondary font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                        Verify Courses
                    </button>
                    <button className="bg-dark-bg hover:bg-brand-primary hover:text-white border border-dark-border text-dark-text-secondary font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                        Update Platform Settings
                    </button>
                    <button className="bg-dark-bg hover:bg-brand-primary hover:text-white border border-dark-border text-dark-text-secondary font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                        View Analytics
                    </button>
                    <button className="bg-dark-bg hover:bg-red-500 hover:text-white border border-dark-border text-red-400 font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                        Emergency Freeze
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Admin;
