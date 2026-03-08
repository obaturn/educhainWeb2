
import React, { useState } from 'react';
import { getCourses } from '../api';
import axios from 'axios';

const CourseCreation: React.FC = () => {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [rewardAmount, setRewardAmount] = useState('');
    const [status, setStatus] = useState<'idle' | 'creating' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!courseTitle || !courseDescription || !rewardAmount) {
            alert('Please fill all fields');
            return;
        }
        setStatus('creating');
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/courses', {
                title: courseTitle,
                description: courseDescription,
                content: {},
                rewardAmount: Number(rewardAmount)
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setCourseTitle('');
                setCourseDescription('');
                setRewardAmount('');
            }, 3000);
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-dark-text-primary">Create a New Course</h1>
            <div className="max-w-2xl mx-auto bg-dark-card p-8 rounded-lg border border-dark-border">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-dark-text-secondary mb-2">Course Title</label>
                        <input
                            type="text"
                            id="title"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-dark-text-secondary mb-2">Course Description</label>
                        <textarea
                            id="description"
                            rows={4}
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)}
                            className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        ></textarea>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="reward" className="block text-sm font-medium text-dark-text-secondary mb-2">Reward Amount (EDU tokens)</label>
                        <input
                            type="number"
                            id="reward"
                            value={rewardAmount}
                            onChange={(e) => setRewardAmount(e.target.value)}
                            className="w-full bg-dark-bg border border-dark-border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={status === 'creating'}
                            className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-4 rounded-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'creating' ? 'Publishing...' : 'Publish Course'}
                        </button>
                    </div>
                </form>
                {status === 'success' && (
                    <div className="mt-4 text-center p-3 rounded-lg bg-green-500 bg-opacity-20 text-green-300 border border-green-500">
                        Course published successfully! It is now permanently on the blockchain.
                    </div>
                )}
                {status === 'error' && (
                    <div className="mt-4 text-center p-3 rounded-lg bg-red-500 bg-opacity-20 text-red-300 border border-red-500">
                        There was an error publishing your course.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseCreation;
