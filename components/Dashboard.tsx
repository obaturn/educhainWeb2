
import React from 'react';
import { User, Course } from '../types';
import { ExternalLinkIcon } from './icons/IconComponents';

interface DashboardProps {
    user: User;
    courses: Course[];
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="bg-dark-card rounded-lg overflow-hidden border border-dark-border group transform hover:-translate-y-1 transition-transform duration-300">
        <img src={course.imageUrl} alt={course.title} className="h-40 w-full object-cover" />
        <div className="p-4">
            <h3 className="text-lg font-bold text-dark-text-primary mb-1">{course.title}</h3>
            <p className="text-sm text-dark-text-secondary mb-3">By {course.creator}</p>
            <div className="flex items-center justify-between text-sm text-dark-text-secondary mb-4">
                <span>{course.students.toLocaleString()} Students</span>
                <span className="flex items-center">
                    <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    {course.rating}
                </span>
            </div>
             <button className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                View Course
            </button>
        </div>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ user, courses }) => {
    // Fallbacks for missing user properties
    const coursesEnrolled = Array.isArray(user.coursesEnrolled) ? user.coursesEnrolled : [];
    const coursesCreated = Array.isArray(user.coursesCreated) ? user.coursesCreated : [];
    const rewards = Array.isArray(user.rewards) ? user.rewards : [];
    const userName = user.name ? user.name.split(' ')[0] : '';
    return (
        <div>
            <div className="flex items-center mb-4">
                {user.avatarUrl && (
                    <img src={user.avatarUrl} alt={userName} className="h-16 w-16 rounded-full object-cover mr-4 border-2 border-brand-primary" />
                )}
                <h1 className="text-3xl font-bold text-dark-text-primary">Welcome back, {userName}!</h1>
            </div>
            <p className="text-dark-text-secondary mb-8">Let's continue your learning journey.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
                    <h3 className="font-semibold text-dark-text-secondary">Courses in Progress</h3>
                    <p className="text-3xl font-bold text-dark-text-primary">{coursesEnrolled.length}</p>
                </div>
                <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
                    <h3 className="font-semibold text-dark-text-secondary">Total Rewards Earned</h3>
                    <p className="text-3xl font-bold text-green-400">{rewards.reduce((acc, r) => acc + r.amount, 0)} EDU</p>
                </div>
                <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
                    <h3 className="font-semibold text-dark-text-secondary">Courses Created</h3>
                    <p className="text-3xl font-bold text-dark-text-primary">{coursesCreated.length}</p>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 text-dark-text-primary">Explore Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
