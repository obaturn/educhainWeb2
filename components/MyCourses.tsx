
import React from 'react';
import { Course } from '../types';

interface MyCoursesProps {
    courses: Course[];
}

const MyCourseCard: React.FC<{ course: Course, progress: number }> = ({ course, progress }) => (
    <div className="bg-dark-card rounded-lg border border-dark-border p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <img src={course.imageUrl} alt={course.title} className="w-full sm:w-32 h-32 sm:h-auto object-cover rounded-md" />
        <div className="flex-1 w-full">
            <h3 className="text-lg font-bold text-dark-text-primary">{course.title}</h3>
            <p className="text-sm text-dark-text-secondary mb-3">By {course.creator}</p>
            <div className="w-full bg-dark-bg rounded-full h-2.5 mb-2 border border-dark-border">
                <div className="bg-brand-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm text-dark-text-secondary mb-4">{progress}% Complete</p>
            <button className="w-full sm:w-auto bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                Continue Learning
            </button>
        </div>
    </div>
);


const MyCourses: React.FC<MyCoursesProps> = ({ courses }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-dark-text-primary">My Courses</h1>
            <div className="space-y-6">
                {courses.length > 0 ? (
                    courses.map((course, index) => (
                        <MyCourseCard key={course.id} course={course} progress={(index + 1) * 35} />
                    ))
                ) : (
                    <div className="text-center py-12 bg-dark-card rounded-lg border border-dark-border">
                        <p className="text-dark-text-secondary">You are not enrolled in any courses yet.</p>
                        <button className="mt-4 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                            Explore Courses
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCourses;
