
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
        liveLink: "",
        githubLink: "https://github.com/SATISH-JALAN/Weft",
        image: "/Weft.png",
        year: "Jan 2026",
        category: "personal",
        caseStudy: {
            problemStatement: "The Stellar and Soroban ecosystem lacked a reliable, dev-friendly way to listen to on-chain events in real-time. Developers had to build their own polling infrastructure, leading to duplicated effort, high node request costs, and delayed data ingestion.",
            systemArchitecture: "Weft uses a robust event ingestion pipeline. A rust-based listener ingests raw ledgers from Stellar Horizon/RPC nodes. These events are processed, decoded, and pushed to a Redis message broker (BullMQ). Our Node.js workers then route these to appropriate channels (WebSockets/Webhooks) for client consumption.",
            techDecisions: [
                "Utilized Redis & BullMQ for reliable, scalable queuing of high-throughput blockchain events.",
                "Chose PostgreSQL via Neon for serverless, autoscaling storage of event history and API keys.",
                "Implemented WebSockets (Socket.io) for real-time frontend delivery to keep dashboards instantly updated."
            ],
            engineeringChallenges: [
                "Handling Soroban's complex XDR decoding reliably without dropping frames during high transaction volume.",
                "Ensuring exactly-once delivery semantics for webhook consumers to prevent double-spending in client applications.",
                "Managing WebSocket connection limits and memory leaks on the Node.js server under heavy load."
            ]
        }
    },
    {
        id: 2,
        title: "Surge",
        description: "Decentralized Pay-Before-Queue Gaming Platform with Multichain Support.",
        longDescription: "Surge is a trustless gaming platform where players stake ETH/MNT to compete, with winners taking 75% of the pot while the platform collects 25% as fees. Built with smart contract escrow and real-time Socket.io matchmaking.",
        tech: ["Next.js 15", "Wagmi", "Viem", "RainbowKit", "Socket.io", "shadcn/ui", "Firebase", "Node.js", "TypeScript", "Ethers.js v6", "Render", "Solidity", "OpenZeppelin", "Hardhat"],
        liveLink: "https://surge-snowy.vercel.app/",
        githubLink: "https://github.com/Mrinmoy-programmer07/Surge",
        image: "/surge.png",
        year: "Nov 2025",
        category: "personal",
        caseStudy: {
            problemStatement: "Traditional Web3 gaming often suffers from high friction, requiring users to sign multiple transactions and wait for confirmations before playing, disrupting the fast-paced competitive gaming experience.",
            systemArchitecture: "Surge utilizes a stateless matching engine off-chain (powered by Socket.io) combined with on-chain Ethereum escrow contracts. Players lock funds before the match in a unified transaction, allowing the actual gameplay to happen in real-time off-chain with absolute finality settled on-chain post-match.",
            techDecisions: [
                "Used Ethers.js v6 and Wagmi for seamless wallet connection and transaction lifecycle UI.",
                "Implemented Socket.io for low-latency matchmaking and real-time game state synchronization.",
                "Deployed on fast EVM L2s to minimize gas costs for the pay-before-queue mechanic."
            ],
            engineeringChallenges: [
                "Preventing race conditions where two players match off-chain but one transaction drops on-chain.",
                "Designing a secure, tamper-proof state-channel approach for off-chain gameplay resolution.",
                "Optimizing the smart contract to handle the 75/25 auto-routing of rewards efficiently and safely."
            ]
        }
    },
    {
        id: 3,
        title: "Midnight Radio ",
        description: "Midnight Radio is a decentralized, ephemeral voice streaming protocol.",
        longDescription: "Midnight Radio is a decentralized, ephemeral voice streaming protocol built for the Mantle and Arbitrum ecosystems. It creates a digital 'Void'—a space where voice notes exist as live broadcasts for 24 hours before fading into silence, leaving behind only an immutable on-chain footprint. Unlike traditional social audio which is ephemeral-by-default but centralized, or podcasting which is permanent but heavy, Midnight Radio sits in the uncanny valley of digital permanence: the experience is fleeting, but the proof is eternal. Every broadcast is an ERC-721 NFT with audio pinned to IPFS for exactly 24 hours via a scheduled unpinning service, creating a 'Time-to-Live' (TTL) mechanic. The NFT itself remains in the broadcaster's wallet forever—a ghost of the transmission, a 'Proof of Voice.' It answers a specific question about Web3 social: Can we build a social graph based on fleeting moments rather than permanent feeds?",
        tech: ["Next.js", "Gemini API", "Socket.io", "Redis"],
        liveLink: "https://midnight-radio.vercel.app/",
        githubLink: "https://github.com/SATISH-JALAN/Midnight",
        image: "/midnight.png",
        year: "Dec 2025",
        category: "personal",
        caseStudy: {
            problemStatement: "Web3 social platforms focus heavily on permanent ledgers, resulting in 'heavy' social graphs where every interaction is stored forever. There was no protocol exploring verifiable, ephemeral moments on-chain.",
            systemArchitecture: "A hybrid architecture where the NFT token (ERC-721) is permanently minted on-chain, but the metadata and IPFS audio file are intentionally unpinned and deleted from the pinning service and cache after exactly 24 hours.",
            techDecisions: [
                "Used Redis to queue and manage the precise 24-hour Time-To-Live (TTL) lifecycle for IPFS unpinning.",
                "Integrated Gemini API for real-time transcription and semantic tagging of the audio before it disappears.",
                "Leveraged Socket.io for live broadcasting to active listeners before the audio is finalized and minted."
            ],
            engineeringChallenges: [
                "Guaranteeing deletion of IPFS content in a decentralized storage network inherently built for permanence.",
                "Handling live audio streaming chunking and reliable upload formatting directly from web browsers.",
                "Building a robust cron queue in a serverless environment to trigger the smart contract interactions and IPFS unpinning reliably."
            ]
        }
    },
    {
        id: 4,
        title: "Web3Wise",
        description: "All-in-one on-chain consultancy and Web3 tooling platform.",
        longDescription: "Web3Wise is an all-in-one on-chain consultancy and Web3 tooling platform. It provides a range of services to help users navigate the complex world of Web3. The platform is built with Next.js and TypeScript, and features a modern, user-friendly interface with a focus on accessibility and performance.",
        tech: ["React", "Framer Motion", "Tailwind CSS", "Ethers.js", "Web3Modal"],
        liveLink: "https://web3wise-v1.vercel.app/",
        githubLink: "https://github.com/SATISH-JALAN/web3wise-v1",
        image: "/web3wise.png",
        year: "June 2025",
        category: "personal",
        caseStudy: {
            problemStatement: "New entrants to Web3 struggle with overwhelming, fragmented tooling and complex onboarding processes, making it difficult to launch tokens, mint NFTs, or interact with DeFi protocols safely.",
            systemArchitecture: "A modular, client-side heavy React application that abstracts complex Ethers.js and Web3Modal interactions behind intuitive, wizard-like interfaces. It acts as a friendly, visual abstraction layer over standard RPC nodes.",
            techDecisions: [
                "Adopted React for optimized component reuse while keeping blockchain tools purely client-rendered to prevent hydration mismatches.",
                "Used Web3Modal for maximum wallet compatibility out of the box, drastically reducing connection drop-off.",
                "Implemented Framer Motion to provide reassuring micro-interactions and loading states during high-latency blockchain reads/writes."
            ],
            engineeringChallenges: [
                "Managing complex asynchronous states during wallet connection, network switching, and transaction signing.",
                "Handling RPC rate limits gracefully when querying multiple on-chain data points simultaneously.",
                "Designing a UI token standard (ERC20) generator that parses form inputs into safe, deployable bytecode dynamically."
            ]
        }
    },
    {
        id: 5,
        title: "Circlo",
        description: "A peer-to-peer rental platform promoting sustainability and cultural preservation.",
        longDescription: "Circlo is a peer-to-peer rental platform that connects individuals looking to rent or borrow items. It promotes sustainability by reducing waste and encouraging the sharing of resources. The platform is built with React and TypeScript, and features a modern, user-friendly interface with a focus on accessibility and performance.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Cloud Firestore"],
        liveLink: "",
        githubLink: "https://github.com/SATISH-JALAN/Circlo-v1",
        image: "/Circlo.png",
        year: "Aug 2025",
        category: "personal",
        caseStudy: {
            problemStatement: "The modern sharing economy lacks localized, trust-based platforms for peer-to-peer everyday item rentals, leading to massive overconsumption and hoarding of rarely used household goods.",
            systemArchitecture: "A Next.js SSR application powered seamlessly by Firebase. Firestore acts as the real-time NoSQL database for item listings and user profiles, while Firebase Auth manages secure sign-ins. Cloud Functions handle complex backend logic like secure payments and booking conflict resolution.",
            techDecisions: [
                "Chose Firebase/Firestore to rapid-prototype the real-time availability sync and peer-to-peer chat features.",
                "Used Tailwind CSS to build a clean, minimalist marketplace UI that feels premium and trustworthy.",
                "Adopted strict TypeScript models (Zod validation) to maintain data schema integrity across the flexible NoSQL database."
            ],
            engineeringChallenges: [
                "Designing a robust data schema in NoSQL to handle complex date-range overlap queries for booking availability.",
                "Implementing accurate geohashing to allow users to efficiently search for items within specific proximity radii.",
                "Building a fair, scalable, and sybil-resistant review and trust-scoring system for peer-to-peer interactions."
            ]
        }
    },
    {
        id: 6,
        title: "Aperture Alchemist",
        description: "A premium videography and photography portfolio showcasing stunning visual storytelling through elegant design and smooth animations.",
        longDescription: "Aperture Alchemist is a premium videography and photography portfolio showcasing stunning visual storytelling through elegant design and smooth animations. The platform is built with React and TypeScript, and features a modern, user-friendly interface with a focus on accessibility and performance.",
        tech: ["Next.js", "typescript", "tailwind", "Framer Motion", "shadcn/ui", "lucide-react"],
        liveLink: "https://aperture-alchemist-tau.vercel.app/",
        githubLink: "https://github.com/SATISH-JALAN/Aperture-Alchemist",
        image: "/aperture.png",
        year: "Nov 2025",
        category: "client",
        caseStudy: {
            problemStatement: "A high-end visual artist needed a digital presence that perfectly matched the premium quality of their physical work. Traditional templates were too clunky, heavily dropping frames, and failing to load high-res media efficiently.",
            systemArchitecture: "A heavily optimized Next.js App Router application utilizing aggressive static site generation (SSG) and localized caching. Media delivery is strictly managed via a global CDN with adaptive bitrates, while the UI layer relies on hardware-accelerated CSS transforms.",
            techDecisions: [
                "Utilized Next.js Image Optimization and custom loaders to serve next-gen formats (WebP/AVIF) dynamically based on device support.",
                "Chose Framer Motion to orchestrate complex, scroll-linked timeline animations (GSAP-style) without dropping main-thread performance.",
                "Implemented Radix UI (via ShadCN) for highly accessible, unstyled primitives to maintain a bespoke design system."
            ],
            engineeringChallenges: [
                "Achieving a constant 60fps framerate during heavy scroll animations while simultaneously loading massive 4K video background assets.",
                "Implementing a seamless client-side page transition system in the Next.js App Router paradigm to simulate a single-page app feel.",
                "Building a custom masonry grid algorithm that dynamically balances visual weight instead of just rigidly placing images."
            ]
        }
    }
];

export const EXPERIENCE: Experience[] = [
     {
        id: 1,
        role: "HQ Contributor",
        company: "HackQuest",
        period: "Nov 2025 — Present",
        description: "Actively contributing to the HackQuest platform and community, creating technical educational content and fostering Web3 adoption across the Indian developer ecosystem."
    },
    {
        id: 2,
        role: "Generative AI Developer Intern",
        company: "AI-Wallah",
        period: "June 2025 — July 2025",
        description: "Learning core concepts of Generative AI and LLM models. Gaining hands-on experience in developing and deploying projects related to generative models.",
        link: "https://www.linkedin.com/posts/satish-jalan_internship-generativeal-ai-activity-7338233329067945985-aZ0a?utm_source=share&utm_medium"
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
        company: "HackQuest",
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

export const SKILLS: { title: string; items: Skill[] }[] = [
    {
        title: "Frontend Ecosystem",
        items: [
            { name: "JavaScript", description: "Core language proficiency.", tier: 1 },
            { name: "TypeScript", description: "Type-safe development.", tier: 1 },
            { name: "React", description: "Component-based UI architecture.", tier: 1 },
            { name: "Next.js", description: "React framework for production.", tier: 1 },
            { name: "Tailwind CSS", description: "Utility-first styling.", tier: 1 },
            { name: "GSAP", description: "High-performance animations.", tier: 2 },
            { name: "Framer Motion", description: "Declarative animations for React.", tier: 2 }
        ]
    },
    {
        title: "Backend & APIs",
        items: [
            { name: "Node.js", description: "Backend runtime environment.", tier: 1 },
            { name: "Express.js", description: "Web framework for Node.js.", tier: 1 },
            { name: "RESTful APIs", description: "API design and integration.", tier: 1 },
            { name: "GraphQL", description: "Data query and manipulation.", tier: 2 }
        ]
    },
    {
        title: "Databases & Data Systems",
        items: [
            { name: "PostgreSQL", description: "Relational database management.", tier: 1 },
            { name: "MongoDB", description: "NoSQL database management.", tier: 2 },
            { name: "Redis", description: "In-memory data structure store.", tier: 1 },
            { name: "Prisma", description: "Next-generation ORM.", tier: 2 }
        ]
    },
    {
        title: "DevOps & Infrastructure",
        items: [
            { name: "Docker", description: "Containerization.", tier: 2 },
            { name: "Git", description: "Version control system.", tier: 1 },
            { name: "Linux", description: "Operating system proficiency.", tier: 2 },
            { name: "Vercel / AWS", description: "Cloud deployment and hosting.", tier: 1 }
        ]
    },
    {
        title: "Web3 & Specialized Domains",
        items: [
            { name: "Solidity", description: "Smart contract development.", tier: 1 },
            { name: "Ethers.js / Viem", description: "Ethereum interaction libraries.", tier: 1 },
            { name: "Hardhat", description: "Ethereum development environment.", tier: 2 },
            { name: "Rust", description: "System programming.", tier: 2 },
            { name: "Websocket", description: "Real-time communication.", tier: 2 }
        ]
    }
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
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/satish-jalan/", icon: "linkedin" },
    { platform: "WhatsApp", url: "https://wa.me/7439255916", icon: "whatsapp" },
    { platform: "Email", url: "mailto:satishjalan9163@gmail.com", icon: "mail" }
];

export const WRAP_2025: { month: string; title: string; description: string }[] = [];

export const GOALS_2026 = [
    { id: 1, text: "Learn how to do more quality code", completed: false },
    { id: 2, text: "Become Proficient in Rust", completed: false },
    { id: 3, text: "Go Deep into Solana Development", completed: false },
    { id: 4, text: "Getting into superdev", completed: false },
    { id: 5, text: "Read books", completed: false },
    { id: 6, text: "Transition into DevRel", completed: false },
    { id: 7, text: "Launch My Own Startup", completed: false },
    { id: 8, text: "Secure Funding", completed: false },
    { id: 9, text: "Attend more and more Hackathons & win them", completed: false },
    { id: 10, text: "Earn Sponsored National & International Trips", completed: false },
    { id: 11, text: "Teach Web3 to Juniors", completed: false },
    { id: 12, text: "Learn a new spoken language (japanese)", completed: false },
    { id: 13, text: "Loose weight", completed: false },
    { id: 14, text: "Trek in the Mountains", completed: true },
    { id: 15, text: "Become Someone Known for Building Real Things", completed: false },
    { id: 16, text: "Start Content Creation", completed: false },
    { id: 17, text: "Speak at at least one tech event", completed: false },
    { id: 19, text: "Develop strong public speaking skills", completed: false },
    { id: 20, text: "Learn startup fundamentals (sales, pitching, storytelling)", completed: false },
];

export const BLOG_CONFIG = {
    hashnodeHost: "thegrain.hashnode.dev",
    mediumUsername: "@satishjalan9163"
};
