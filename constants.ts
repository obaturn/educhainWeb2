
import { User, Course, Mentor, CommunityMember } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Satoshi Nakamoto',
  walletAddress: '0x1A2b...c3D4',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
  bio: 'Aspiring Move developer and lifelong learner. Passionate about decentralization and its potential to revolutionize education.',
  coursesEnrolled: ['c1', 'c2'],
  coursesCreated: ['c3'],
  rewards: [
    { courseId: 'c1', courseTitle: 'Intro to Move Programming', amount: 50, date: '2024-07-20', status: 'Claimed' },
    { courseId: 'c2', courseTitle: 'Advanced DeFi Concepts', amount: 120, date: '2024-07-28', status: 'Pending' },
  ],
  isAdmin: false,
};

export const ADMIN_USER: User = {
  ...MOCK_USER,
  id: 'admin1',
  name: 'Admin Vit',
  walletAddress: '0xAdM1...n42E',
  isAdmin: true,
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Intro to Move Programming',
    description: 'Learn the fundamentals of the Move language, designed for secure and verifiable smart contracts.',
    creator: 'Move Foundation',
    imageUrl: 'https://picsum.photos/seed/course1/400/225',
    modules: [{id: 'm1', title: 'Getting Started', content: '...'}],
    students: 1250,
    rating: 4.8,
    rewardAmount: 50
  },
  {
    id: 'c2',
    title: 'Advanced DeFi Concepts',
    description: 'Explore complex DeFi protocols, liquidity pooling, and yield farming strategies on-chain.',
    creator: 'DeFi Guru',
    imageUrl: 'https://picsum.photos/seed/course2/400/225',
    modules: [{id: 'm1', title: 'Intro to AMMs', content: '...'}],
    students: 830,
    rating: 4.9,
    rewardAmount: 120
  },
  {
    id: 'c3',
    title: 'Building Full-Stack DApps',
    description: 'A comprehensive guide to building, testing, and deploying decentralized applications from scratch.',
    creator: 'Satoshi Nakamoto',
    imageUrl: 'https://picsum.photos/seed/course3/400/225',
    modules: [{id: 'm1', title: 'Frontend with React', content: '...'}],
    students: 2100,
    rating: 4.7,
    rewardAmount: 200
  },
  {
    id: 'c4',
    title: 'Blockchain for Social Impact',
    description: 'Discover how blockchain technology can be leveraged for transparent and efficient social good initiatives.',
    creator: 'Impact DAO',
    imageUrl: 'https://picsum.photos/seed/course4/400/225',
    modules: [{id: 'm1', title: 'Use Cases', content: '...'}],
    students: 450,
    rating: 4.9,
    rewardAmount: 75
  }
];

export const MOCK_MENTORS: Mentor[] = [
    { id: 'm1', name: 'Dr. Ada Crypton', specialty: 'Cryptography & Security', avatarUrl: 'https://picsum.photos/seed/mentor1/100/100', bio: '20+ years in cryptography research. Focused on zero-knowledge proofs and secure multi-party computation.' },
    { id: 'm2', name: 'Leo Finance', specialty: 'DeFi & Tokenomics', avatarUrl: 'https://picsum.photos/seed/mentor2/100/100', bio: 'Early DeFi adopter and architect of several successful protocols. Specializes in sustainable token economic models.' },
    { id: 'm3', name: 'Gabriella Arte', specialty: 'NFTs & Digital Identity', avatarUrl: 'https://picsum.photos/seed/mentor3/100/100', bio: 'Artist and technologist exploring the intersection of art, identity, and blockchain technology.' },
];

export const MOCK_COMMUNITY: CommunityMember[] = [
    { id: 'cm1', name: 'Ben C.', avatarUrl: 'https://picsum.photos/seed/comm1/100/100', role: 'Student', contributionPoints: 150 },
    { id: 'cm2', name: 'DeFi Guru', avatarUrl: 'https://picsum.photos/seed/comm2/100/100', role: 'Creator', contributionPoints: 2500 },
    { id: 'cm3', name: 'Dr. Ada Crypton', avatarUrl: 'https://picsum.photos/seed/mentor1/100/100', role: 'Mentor', contributionPoints: 5000 },
    { id: 'cm4', name: 'Satoshi Nakamoto', avatarUrl: 'https://picsum.photos/seed/user1/100/100', role: 'Creator', contributionPoints: 1800 },
    { id: 'cm5', name: 'Olivia R.', avatarUrl: 'https://picsum.photos/seed/comm5/100/100', role: 'Student', contributionPoints: 320 },
];
