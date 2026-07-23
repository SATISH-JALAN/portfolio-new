import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PROJECTS } from '../../constants';
import { Project } from '../../types';
import { ArrowUpRight, Github, ExternalLink, X, Calendar } from 'lucide-react';
import { Button, Badge } from '../ui/Elements';
import { TechBadge } from '../ui/TechBadge';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
    onModalOpen?: (isOpen: boolean) => void;
}

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="project-card group cursor-pointer flex flex-col gap-5 w-full"
        >
            {/* Image Card */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/5 aspect-[4/3] md:aspect-[16/11] w-full">
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.02] transition-colors duration-500 z-10 pointer-events-none" />

                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain p-2 transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />


                {/* Floating Top-Right Icons */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                    {project.githubLink && (
                        <a 
                            href={project.githubLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-10 h-10 bg-foreground text-background flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Github size={18} />
                        </a>
                    )}
                    {project.liveLink && (
                        <a 
                            href={project.liveLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-10 h-10 bg-foreground text-background flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col gap-3">
                {/* Title and Tech Badges Row */}
                <div className="flex justify-between items-center w-full">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight group-hover:text-lime-400 transition-colors duration-300 uppercase">
                        {project.title}
                    </h3>
                    <div className="flex gap-2">
                        {project.tech.slice(0, 2).map((t, i) => (
                            <span key={i} className="font-mono text-[10px] md:text-xs font-medium text-muted uppercase border border-border/50 px-2 py-1 rounded-sm">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <p className="text-muted/90 line-clamp-2 text-sm md:text-base leading-relaxed max-w-[90%]">
                    {project.description}
                </p>
            </div>
        </div>
    );
};

export const Projects: React.FC<ProjectsProps> = ({ onModalOpen }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<'personal' | 'client'>('personal');
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredProjects = PROJECTS.filter(project => project.category === selectedCategory);

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            if (onModalOpen) onModalOpen(true);
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            if (onModalOpen) onModalOpen(false);
        }
    }, [selectedProject, onModalOpen]);

    useGSAP(() => {
        if (!containerRef.current) return;
        
        // Reset and kill previous triggers on category change
        ScrollTrigger.getAll().forEach(t => t.kill());

        gsap.set(".project-card-wrapper", { y: 50, opacity: 0 });

        ScrollTrigger.batch(".project-card-wrapper", {
            interval: 0.1,
            batchMax: 2,
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                overwrite: true
            }),
            start: "top 85%",
        });

    }, { dependencies: [selectedCategory], scope: containerRef });

    return (
        <section id="work" className="relative bg-background transition-colors duration-500 py-24 flex flex-col">
            <div className="container px-4 md:px-6 mx-auto mb-16 flex-shrink-0">
                <div className="flex items-end justify-between border-b border-border pb-6">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-pixel font-medium text-foreground tracking-tighter">Selected<br/>Works.</h2>
                    </div>
                    <span className="font-mono text-muted hidden md:block uppercase text-xs tracking-widest">(03 / Projects)</span>
                </div>

                <div className="flex justify-start mt-8">
                    <div className="inline-flex items-center gap-2 p-1.5 bg-foreground/[0.02] rounded-full border border-border/40">
                        <button
                            onClick={() => setSelectedCategory('personal')}
                            className={`px-6 py-2 rounded-full font-mono text-xs tracking-wide transition-all duration-300 ${selectedCategory === 'personal'
                                ? 'bg-foreground text-background shadow-sm'
                                : 'text-muted hover:text-foreground'
                                }`}
                        >
                            Personal ({PROJECTS.filter(p => p.category === 'personal').length})
                        </button>
                        <button
                            onClick={() => setSelectedCategory('client')}
                            className={`px-6 py-2 rounded-full font-mono text-xs tracking-wide transition-all duration-300 ${selectedCategory === 'client'
                                ? 'bg-foreground text-background shadow-sm'
                                : 'text-muted hover:text-foreground'
                                }`}
                        >
                            Client ({PROJECTS.filter(p => p.category === 'client').length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Vertical Grid Container */}
            <div ref={containerRef} className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 w-full">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="project-card-wrapper opacity-0">
                            <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Details Modal */}
            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </section>
    );
};

// Sub-component for the Modal to keep things clean
const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(modalRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: "power2.out" }
            );

            gsap.fromTo(contentRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }
            );
        }, modalRef);

        return () => ctx.revert();
    }, []);

    return (
        <div 
            ref={modalRef} 
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onClick={(e) => {
                if (e.target === modalRef.current) onClose();
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl p-4 md:p-8 overflow-hidden lenis-prevent"
        >
            
            {/* Scrollable Container - Stacked Layout */}
            <div 
                ref={contentRef} 
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="w-full max-w-4xl max-h-[90vh] bg-background border border-border rounded-lg shadow-2xl relative overflow-y-auto overflow-x-hidden overscroll-contain lenis-prevent"
            >

                <div className="sticky top-0 z-20 flex justify-between items-center bg-background/95 backdrop-blur-md p-4 md:px-8 md:py-5 border-b border-border">
                    <span className="font-mono text-xs text-muted uppercase tracking-widest font-medium">
                        {project.year}
                    </span>
                    <div className="flex items-center gap-2 md:gap-3">
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-foreground/10 text-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                                title="View GitHub Repository"
                            >
                                <Github size={18} />
                            </a>
                        )}
                        {project.liveLink && project.liveLink !== "" && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-foreground/10 text-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                                title="View Live Demo"
                            >
                                <ExternalLink size={18} />
                            </a>
                        )}
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-foreground/10 text-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors ml-1"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Image - Full width, natural height */}
                <div className="w-full bg-muted/10">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto"
                    />
                </div>

                {/* Content */}
                <div className="w-full p-8 md:p-12">
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
                                {project.title}
                            </h2>
                            <div className="flex items-center gap-3">
                                {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-11 h-11 bg-foreground text-background flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform"
                                        title="View GitHub Repository"
                                    >
                                        <Github size={20} />
                                    </a>
                                )}
                                {project.liveLink && project.liveLink !== "" && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-11 h-11 bg-foreground text-background flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform"
                                        title="View Live Demo"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.map((tech) => (
                                <TechBadge key={tech} name={tech} />
                            ))}
                        </div>

                        <p className="text-foreground/80 text-lg leading-relaxed mb-10 font-medium">
                            {project.longDescription || project.description}
                        </p>

                        {/* Expandable Case Study Section */}
                        {project.caseStudy && (
                            <div className="space-y-12 mt-12 bg-muted/5 p-6 md:p-8 rounded-lg border border-border">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="h-px flex-1 bg-border"></div>
                                    <span className="font-mono text-xs text-foreground uppercase tracking-widest font-bold">Case Study</span>
                                    <div className="h-px flex-1 bg-border"></div>
                                </div>

                                {project.caseStudy.problemStatement && (
                                    <div className="group">
                                        <h4 className="text-xl font-display font-medium text-foreground mb-4 flex items-center gap-2"><span className="text-muted text-sm font-mono">01.</span> The Problem</h4>
                                        <p className="text-muted leading-relaxed text-sm md:text-base">{project.caseStudy.problemStatement}</p>
                                    </div>
                                )}

                                {project.caseStudy.systemArchitecture && (
                                    <div className="group border-t border-border pt-8">
                                        <h4 className="text-xl font-display font-medium text-foreground mb-4 flex items-center gap-2"><span className="text-muted text-sm font-mono">02.</span> Architecture & Design</h4>
                                        <p className="text-muted leading-relaxed text-sm md:text-base whitespace-pre-line">{project.caseStudy.systemArchitecture}</p>
                                    </div>
                                )}

                                {project.caseStudy.techDecisions && project.caseStudy.techDecisions.length > 0 && (
                                    <div className="group border-t border-border pt-8">
                                        <h4 className="text-xl font-display font-medium text-foreground mb-4 flex items-center gap-2"><span className="text-muted text-sm font-mono">03.</span> Technical Decisions</h4>
                                        <ul className="space-y-3">
                                            {project.caseStudy.techDecisions.map((decision, idx) => (
                                                <li key={idx} className="flex gap-3 text-sm md:text-base text-muted">
                                                    <span className="text-foreground font-bold mt-1">»</span>
                                                    <span className="leading-relaxed">{decision}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {project.caseStudy.engineeringChallenges && project.caseStudy.engineeringChallenges.length > 0 && (
                                    <div className="group border-t border-border pt-8">
                                        <h4 className="text-xl font-display font-medium text-foreground mb-4 flex items-center gap-2"><span className="text-muted text-sm font-mono">04.</span> Core Engineering Challenges</h4>
                                        <ul className="space-y-3">
                                            {project.caseStudy.engineeringChallenges.map((challenge, idx) => (
                                                <li key={idx} className="flex gap-3 text-sm md:text-base text-muted">
                                                    <span className="text-red-400 mt-1">!</span>
                                                    <span className="leading-relaxed">{challenge}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
