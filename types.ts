
export interface User {
  id: string;
  name: string;
  walletAddress: string;
  avatarUrl: string;
  bio: string;
  coursesEnrolled: string[];
  coursesCreated: string[];
  rewards: Reward[];
  isAdmin?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  creator: string;
  imageUrl: string;
  modules: Module[];
  students: number;
  rating: number;
  rewardAmount: number;
}

export interface Module {
  id: string;
  title: string;
  content: string; // Could be markdown, video URL, etc.
}

export interface Mentor {
  id: string;
  name: string;
  specialty: string;
  avatarUrl: string;
  bio: string;
}

export interface CommunityMember {
    id: string;
    name: string;
    avatarUrl: string;
    role: 'Student' | 'Creator' | 'Mentor';
    contributionPoints: number;
}

export interface Reward {
  courseId: string;
  courseTitle: string;
  amount: number;
  date: string;
  status: 'Claimed' | 'Pending';
}
