
export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription?: string; // For the detail view
    tech: string[];
    liveLink: string;
    githubLink: string;
    image: string;
    year: string;
}

export interface Experience {
    id: number;
    role: string;
    company: string;
    period: string;
    description: string;
}

export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

export interface Skill {
    name: string;
    description: string;
}
