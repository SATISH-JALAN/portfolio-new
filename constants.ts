
import { Project, Experience, SocialLink, Skill } from './types';

export const PORTFOLIO_DATA = {
    name: "Satish Jalan",
    role: "Full Stack & Web3 Developer",
    bio: "Engineering digital experiences with precision and passion. Focusing on performance, accessibility, and fluid motion.",
    location: "India",
    email: "satishjalan9163@gmail.com",
    availability: "Available for freelance"
};

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Neon Finance",
        description: "Decentralized finance dashboard with real-time WebGL data visualization.",
        longDescription: "A high-performance DeFi dashboard built to visualize complex blockchain data in real-time. Features include a custom WebGL charting engine, wallet integration via RainbowKit, and live transaction streams using WebSocket. The UI is designed to feel futuristic yet usable, with a focus on data density and clarity.",
        tech: ["React", "WebGL", "Solidity", "Tailwind"],
        liveLink: "https://example.com/neon-live",
        githubLink: "https://github.com/example/neon",
        image: "https://picsum.photos/1200/800?random=1",
        year: "2024"
    },
    {
        id: 2,
        title: "Aero Space",
        description: "Interactive educational platform about the solar system.",
        longDescription: "An immersive educational experience that takes users on a tour of the solar system. Utilizing Three.js and React Three Fiber, the application renders 3D models of planets with physically based rendering (PBR). It features scroll-driven animations (GSAP) to guide the learner through facts and astronomical data.",
        tech: ["Three.js", "R3F", "GSAP", "Zustand"],
        liveLink: "https://example.com/aero-live",
        githubLink: "https://github.com/example/aero",
        image: "https://picsum.photos/1200/800?random=2",
        year: "2023"
    },
    {
        id: 3,
        title: "Nexus Chat",
        description: "Real-time collaboration tool with AI capabilities.",
        longDescription: "Nexus is a Slack-alternative focused on developer communities. It supports real-time messaging, code syntax highlighting, and threads. The unique feature is an embedded AI assistant (powered by Gemini) that can summarize threads and answer technical questions directly in the chat window.",
        tech: ["Next.js", "Gemini API", "Socket.io", "Redis"],
        liveLink: "https://example.com/nexus-live",
        githubLink: "https://github.com/example/nexus",
        image: "https://picsum.photos/1200/800?random=3",
        year: "2023"
    },
    {
        id: 4,
        title: "Zen Notes",
        description: "Local-first minimalist markdown editor.",
        longDescription: "Built for distraction-free writing, Zen Notes is a local-first application. It saves data instantly to the file system and supports full Markdown syntax. The app is built with Electron for cross-platform support and features a highly optimized text rendering engine for large documents.",
        tech: ["Electron", "Rust", "React", "Sqlite"],
        liveLink: "https://example.com/zen-live",
        githubLink: "https://github.com/example/zen",
        image: "https://picsum.photos/1200/800?random=4",
        year: "2022"
    }
];

export const EXPERIENCE: Experience[] = [
    {
        id: 1,
        role: "Senior Engineer",
        company: "TechNova",
        period: "2021 — Present",
        description: "Leading frontend architecture and design systems."
    },
    {
        id: 2,
        role: "Developer",
        company: "Creative Studio",
        period: "2019 — 2021",
        description: "Developed award-winning marketing sites."
    },
    {
        id: 3,
        role: "Junior Dev",
        company: "StartUp X",
        period: "2018 — 2019",
        description: "UI implementation and component libraries."
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

export const SOCIALS: SocialLink[] = [
    { platform: "GitHub", url: "https://github.com", icon: "github" },
    { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" }
];

export const GOALS_2026 = [
    { id: 1, text: "Master WebGPU and Compute Shaders", completed: false },
    { id: 2, text: "Launch a SaaS product to $5k MRR", completed: false },
    { id: 3, text: "Contribute to React Core or Three.js", completed: false },
    { id: 4, text: "Write 12 technical articles (1 per month)", completed: false },
    { id: 5, text: "Read 24 books (Tech + Fiction)", completed: false },
    { id: 6, text: "Run a Marathon", completed: false },
    { id: 7, text: "Learn a new spoken language (Spanish)", completed: false }
];
