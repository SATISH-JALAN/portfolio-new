
import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../constants';
import { Project } from '../../types';
import { ArrowUpRight, Github, ExternalLink, X, Calendar } from 'lucide-react';
import { Button, Badge } from '../ui/Elements';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
    onModalOpen?: (isOpen: boolean) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onModalOpen }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate grid items staggering in
            gsap.from(".project-card", {
                scrollTrigger: {
                    trigger: ".projects-grid",
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Handle body scroll locking when modal is open and notify parent
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
            if (onModalOpen) onModalOpen(true);
        } else {
            document.body.style.overflow = '';
            if (onModalOpen) onModalOpen(false);
        }
    }, [selectedProject, onModalOpen]);

    return (
        <section id="work" className="py-32 relative bg-background transition-colors duration-500">
            <div ref={containerRef} className="container px-4 md:px-6 mx-auto">
                <div className="flex items-end justify-between mb-16 border-b border-border pb-6">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">SELECTED WORK</h2>
                        <p className="text-muted mt-2 font-mono text-sm max-w-md">
                            A collection of digital products, websites, and tools built with a focus on motion and user experience.
                        </p>
                    </div>
                    {/* Updated to 03 since Capabilities was removed */}
                    <span className="font-mono text-muted hidden md:block">(03)</span>
                </div>

                {/* Grid Layout */}
                <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {PROJECTS.map((project) => (
                        <div 
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            className="project-card group cursor-pointer flex flex-col gap-4 active:scale-[0.98] transition-transform duration-200"
                        >
                            {/* Image Card */}
                            <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border bg-muted/10">
                                {/* Overlay gradient for text legibility if needed, but keeping it clean for now */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
                                
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                
                                {/* Floating Action Icon */}
                                <div className="absolute top-4 right-4 z-20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <div className="w-10 h-10 bg-background/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-border text-foreground">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-muted transition-colors">
                                        {project.title}
                                    </h3>
                                    <span className="font-mono text-xs text-muted border border-border px-2 py-1 rounded">
                                        {project.year}
                                    </span>
                                </div>
                                
                                <p className="text-muted line-clamp-2 text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-1">
                                    {project.tech.slice(0, 3).map((t, i) => (
                                        <Badge key={i} className="bg-foreground/5 text-foreground/70 border-border/50">
                                            {t}
                                        </Badge>
                                    ))}
                                    {project.tech.length > 3 && (
                                        <Badge className="bg-transparent border-transparent text-muted">+{project.tech.length - 3}</Badge>
                                    )}
                                </div>
                            </div>
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
        <div ref={modalRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl p-4 md:p-8">
            {/* Close Button Area */}
            <div className="absolute top-6 right-6 z-50">
                <button 
                    onClick={onClose}
                    className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-muted hover:scale-105 transition-all shadow-xl"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Scrollable Container */}
            <div ref={contentRef} className="w-full h-full max-w-5xl bg-background border border-border rounded-lg shadow-2xl overflow-y-auto overflow-x-hidden relative flex flex-col md:flex-row">
                
                {/* Left: Image (Stays stuck on desktop, scrolls on mobile) */}
                <div className="w-full md:w-1/2 h-[300px] md:h-auto sticky top-0 md:relative bg-muted/10">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:hidden" />
                </div>

                {/* Right: Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="font-mono text-xs px-3 py-1 rounded-full border border-border text-muted uppercase tracking-wider">
                                {project.year}
                            </span>
                            <div className="h-px flex-1 bg-border"></div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                            {project.title}
                        </h2>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.map((tech) => (
                                <span key={tech} className="font-mono text-xs px-2 py-1 bg-foreground/5 text-foreground rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <p className="text-muted text-lg leading-relaxed mb-8">
                            {project.longDescription || project.description}
                        </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
                        <a 
                            href={project.liveLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1"
                        >
                            <Button className="w-full gap-2 h-12 text-sm uppercase tracking-widest font-bold">
                                Live Demo <ExternalLink size={16} />
                            </Button>
                        </a>
                        <a 
                            href={project.githubLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1"
                        >
                            <Button variant="outline" className="w-full gap-2 h-12 text-sm uppercase tracking-widest font-bold">
                                Github Repo <Github size={16} />
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
