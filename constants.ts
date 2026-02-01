
import { Project, Experience, SocialLink, Skill, Education } from './types';

export const PORTFOLIO_DATA = {
    name: "Satish Jalan",
    role: "Full Stack & Web3 Developer",
    bio: "I'm a full-stack developer and Web3 builder focused on creating fast, scalable, and user-centric digital products. With strong experience in the MERN stack, TypeScript, and modern frontend systems, I've built everything from production-ready web platforms to blockchain-based applications.",
    location: "India",
    email: "satishjalan9163@gmail.com",
    availability: "Available for freelance"
};

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Weft",
        description: "Real-time Event Streaming Infrastructure for Soroban & Stellar",
        longDescription: "Weft is a powerful event streaming platform that transforms raw blockchain data into actionable, enriched business signals. Think of it as The Graph or Alchemy Notify but built specifically for the Stellar network's new smart contract platform, Soroban. It provides a range of services to help users navigate the complex world of Web3. The platform is built with Next.js and TypeScript, and features a modern, user-friendly interface with a focus on accessibility and performance.",
        tech: ["React (Vite)", "Tailwind CSS", "ShadCN UI", "Zustand", "Freighter", "Node.js", "Express", "PostgreSQL", "Neon", "Prisma", "Redis", "Upstash", "BullMQ", "Socket.io", "Stellar SDK"],
        liveLink: "https://example.com/neon-live",
        githubLink: "https://github.com/SATISH-JALAN/Weft",
        image: "https://picsum.photos/1200/800?random=1",
        year: "2026",
        category: "personal"
    },
    {
        id: 2,
        title: "Surge",
        description: "Decentralized Pay-Before-Queue Gaming Platform with Multichain Support.",
        longDescription: "Surge is a trustless gaming platform where players stake ETH/MNT to compete, with winners taking 75% of the pot while the platform collects 25% as fees. Built with smart contract escrow and real-time Socket.io matchmaking.",
        tech: ["Next.js 15", "Wagmi", "Viem", "RainbowKit", "Socket.io", "shadcn/ui", "Firebase", "Node.js", "TypeScript", "Ethers.js v6", "Render", "Solidity", "OpenZeppelin", "Hardhat"],
        liveLink: "https://example.com/aero-live",
        githubLink: "https://github.com/example/aero",
        image: "https://picsum.photos/1200/800?random=2",
        year: "2023",
        category: "personal"
    },
    {
        id: 3,
        title: "Midnight Radio ",
        description: "Midnight Radio is a decentralized, ephemeral voice streaming protocol.",
        longDescription: "Midnight Radio is a decentralized, ephemeral voice streaming protocol built for the Mantle and Arbitrum ecosystems. It creates a digital 'Void'—a space where voice notes exist as live broadcasts for 24 hours before fading into silence, leaving behind only an immutable on-chain footprint. Unlike traditional social audio which is ephemeral-by-default but centralized, or podcasting which is permanent but heavy, Midnight Radio sits in the uncanny valley of digital permanence: the experience is fleeting, but the proof is eternal. Every broadcast is an ERC-721 NFT with audio pinned to IPFS for exactly 24 hours via a scheduled unpinning service, creating a 'Time-to-Live' (TTL) mechanic. The NFT itself remains in the broadcaster's wallet forever—a ghost of the transmission, a 'Proof of Voice.' It answers a specific question about Web3 social: Can we build a social graph based on fleeting moments rather than permanent feeds?",
        tech: ["Next.js", "Gemini API", "Socket.io", "Redis"],
        liveLink: "https://example.com/nexus-live",
        githubLink: "https://github.com/example/nexus",
        image: "https://picsum.photos/1200/800?random=3",
        year: "2023",
        category: "personal"
    },
    {
        id: 4,
        title: "Web3Wise",
        description: "All-in-one on-chain consultancy and Web3 tooling platform.",
        longDescription: "Web3Wise is an all-in-one on-chain consultancy and Web3 tooling platform. It provides a range of services to help users navigate the complex world of Web3. The platform is built with Next.js and TypeScript, and features a modern, user-friendly interface with a focus on accessibility and performance.",
        tech: ["React", "Framer Motion", "Tailwind CSS", "Ethers.js", "Web3Modal"],
        liveLink: "https://example.com/nexus-live",
        githubLink: "https://github.com/example/nexus",
        image: "https://picsum.photos/1200/800?random=3",
        year: "2023",
        category: "personal"
    },
    {
        id: 5,
        title: "Circlo",
        description: "A peer-to-peer rental platform promoting sustainability and cultural preservation.",
        longDescription: "Circlo is a peer-to-peer rental platform that connects individuals looking to rent or borrow items. It promotes sustainability by reducing waste and encouraging the sharing of resources. The platform is built with React and TypeScript, and features a modern, user-friendly interface with a focus on accessibility and performance.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Cloud Firestore"],
        liveLink: "https://example.com/zen-live",
        githubLink: "https://github.com/example/zen",
        image: "https://picsum.photos/1200/800?random=4",
        year: "2025",
        category: "personal"
    },
    {
        id: 6,
        title: "Aperture Alchemist",
        description: "A premium videography and photography portfolio showcasing stunning visual storytelling through elegant design and smooth animations.",
        longDescription: "Aperture Alchemist is a premium videography and photography portfolio showcasing stunning visual storytelling through elegant design and smooth animations. The platform is built with React and TypeScript, and features a modern, user-friendly interface with a focus on accessibility and performance.",
        tech: ["Next.js", "typescript", "tailwind", "Framer Motion", "shadcn/ui", "lucide-react"],
        liveLink: "https://aperture-alchemist-tau.vercel.app/",
        githubLink: "https://github.com/SATISH-JALAN/Aperture-Alchemist",
        image: "https://picsum.photos/1200/800?random=5",
        year: "2025",
        category: "client"
    }
];

export const EXPERIENCE: Experience[] = [
    {
        id: 1,
        role: "Generative AI Developer Intern",
        company: "AI-Wallah",
        period: "June 2025 — July 2025",
        description: "Learning core concepts of Generative AI and LLM models. Gaining hands-on experience in developing and deploying projects related to generative models.",
        link: "https://www.linkedin.com/posts/satish-jalan_internship-generativeal-ai-activity-7338233329067945985-aZ0a?utm_source=share&utm_medium"
    },
    {
        id: 2,
        role: "HQ Contributor",
        company: "Hackquest",
        period: "Nov 2025 — Present",
        description: "Collaborating, innovating and building a stronger Web3 ecosystem in India with industry experts."
    },
    {
        id: 3,
        role: "Evangelist",
        company: "Hack4Bengal 4.0",
        period: "Mar 2025 — July 2025",
        description: "Serving as an Evangelist at Hack4Bengal 4.0, actively promoting Web3 adoption and community engagement.",
        link: "https://www.linkedin.com/posts/satish-jalan_hack4bengal-hack4bengal4-h4b4evangelist-activity-7314145051884838912-suye?utm_source=share&utm_medium"
    },
    {
        id: 4,
        role: "Developer Advocate",
        company: "HACKQUEST",
        period: "Feb 2025 — Nov 2025",
        description: "Collaborated, innovated and built a stronger Web3 ecosystem in India with industry experts.",
        link: "https://www.linkedin.com/posts/satish-jalan_web3-hackquest-innovation-activity-7289246328117760000-WY6-?utm_source=share&utm_medium"
    },
    {
        id: 5,
        role: "Senior Open Source Contributor",
        company: "Girlscript Summer Of Code (GSSOC)",
        period: "Oct 2024 — Dec 2024",
        description: "Contributed to the development of the GSSOC website. Integrated and tested APIs using Postman, streamlining backend-frontend collaboration.",
        link: "https://www.linkedin.com/posts/satish-jalan_girlscript-opensource-summerofcode-activity-7247269110827433987-KduQ?utm_source=share&utm_medium"
    }
];

export const SKILLS: Skill[] = [
    { name: "JavaScript", description: "Core language proficiency." },
    { name: "TypeScript", description: "Type-safe development." },
    { name: "React / Next.js", description: "Component-based UI architecture." },
    { name: "Node.js", description: "Backend runtime environment." },
    { name: "Express.js", description: "Backend runtime environment." },
    { name: "PostgreSQL", description: "Relational database management." },
    { name: "MongoDB", description: "NoSQL database management." },
    { name: "Solidity", description: "Smart contract development." },
    { name: "Rust", description: "System programming." },
    { name: "Websocket", description: "Real-time communication." },
    { name: "Docker", description: "Containerization." },
    { name: "GSAP", description: "High-performance animations." }
];

export const EDUCATION: Education[] = [
    {
        id: 1,
        institution: "Sister Nivedita University",
        degree: "Bachelor of Technology in Computer Science",
        period: "2024 — 2028",
        location: "New Town, Kolkata"
    },
    {
        id: 2,
        institution: "Sunrise English Medium School",
        degree: "High School Graduate",
        period: "Till 2024"
    }
];

export const SOCIALS: SocialLink[] = [
    { platform: "GitHub", url: "https://github.com/SATISH-JALAN", icon: "github" },
    { platform: "Twitter", url: "https://x.com/SatishJalan52", icon: "twitter" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/satish-jalan/", icon: "linkedin" }
];

export const WRAP_2025: { month: string; title: string; description: string }[] = [];

export const GOALS_2026 = [
    { id: 1, text: "Master WebGPU and Compute Shaders", completed: false },
    { id: 2, text: "Launch a SaaS product to $5k MRR", completed: false },
    { id: 3, text: "Contribute to React Core or Three.js", completed: false },
    { id: 4, text: "Write 12 technical articles (1 per month)", completed: false },
    { id: 5, text: "Read 24 books (Tech + Fiction)", completed: false },
    { id: 6, text: "Run a Marathon", completed: false },
    { id: 7, text: "Learn a new spoken language (Spanish)", completed: false }
];
