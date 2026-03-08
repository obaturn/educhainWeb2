
import React from 'react';
import { Mentor } from '../types';

interface MentorsProps {
    mentors: Mentor[];
}

const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
    const handleBookSession = async () => {
        const token = localStorage.getItem('token');
        try {
            await fetch(`http://localhost:5000/api/mentors/${mentor.id}/book`, {
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
    };
    return (
        <div className="bg-dark-card p-6 rounded-lg border border-dark-border text-center">
            <img src={mentor.avatarUrl} alt={mentor.name} className="h-24 w-24 rounded-full mx-auto mb-4 border-2 border-brand-primary" />
            <h3 className="text-xl font-bold text-dark-text-primary">{mentor.name}</h3>
            <p className="text-brand-secondary font-medium mb-3">{mentor.specialty}</p>
            <p className="text-dark-text-secondary text-sm mb-4">{mentor.bio}</p>
            <button className="bg-dark-bg hover:bg-brand-primary hover:text-white border border-dark-border text-dark-text-secondary font-bold py-2 px-4 rounded-lg transition-colors duration-300" onClick={handleBookSession}>
                Book a Session
            </button>
        </div>
    );
};

const Mentors: React.FC<MentorsProps> = ({ mentors }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-dark-text-primary">Our Mentors</h1>
            <p className="text-dark-text-secondary mb-8 max-w-3xl">
                Connect with industry experts for one-on-one guidance. Our mentors are here to help you succeed on your learning path.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mentors.map(mentor => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                ))}
            </div>
        </div>
    );
};

export default Mentors;
