
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS, EXPERIENCE, PORTFOLIO_DATA, EDUCATION } from '../../constants';
import { GithubGraph } from '../ui/GithubGraph';
import { Download, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Helper for fade-in animations
            const animateIn = (selector: string | Element, trigger: string | Element, stagger = 0) => {
                gsap.fromTo(selector,
                    {
                        y: 30,
                        autoAlpha: 0 // logic: visibility hidden until animation starts
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.8,
                        stagger: stagger,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: trigger,
                            start: "top 90%", // Triggers earlier to avoid empty screens
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            };

            // 1. Profile Section
            animateIn(".profile-section", ".profile-section");

            // 2. Experience Items (Staggered)
            const experienceItems = gsap.utils.toArray('.experience-item');
            experienceItems.forEach((item: any) => {
                animateIn(item, item);
            });

            // 3. Tech Items (Grid Stagger)
            animateIn(".tech-item", ".tech-grid", 0.05);

            // 4. Contributions
            animateIn(".contributions-wrapper", ".contributions-wrapper");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="py-32 bg-background relative overflow-hidden transition-colors duration-500">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

            <div ref={containerRef} className="container px-4 md:px-6 mx-auto relative z-10">

                {/* Changed from Grid to Flex Column to stack sections vertically */}
                <div className="flex flex-col gap-24 lg:gap-32">

                    {/* Top Section: Profile & Bio */}
                    <div className="w-full max-w-6xl mx-auto profile-section opacity-0 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start">
                        {/* Heading Column */}
                        <div className="text-left lg:sticky lg:top-32">
                            <span className="font-mono text-xs text-muted/60 uppercase tracking-widest mb-6 block">01 / Profile</span>
                            <h2 className="text-5xl md:text-7xl font-display font-medium text-foreground tracking-tighter leading-[0.9]">
                                About<br />Me.
                            </h2>
                        </div>

                        {/* Content Column */}
                        <div className="space-y-8 text-left pt-2 lg:pt-0">
                            <div className="inline-flex">
                                <h3 className="text-sm font-mono text-primary bg-foreground/5 px-3 py-1.5 rounded-sm border border-foreground/10 uppercase tracking-wider">
                                    {PORTFOLIO_DATA.role}
                                </h3>
                            </div>

                            <p className="text-foreground/90 text-xl md:text-2xl leading-relaxed font-light">
                                {PORTFOLIO_DATA.bio}
                            </p>

                            <div className="space-y-5 text-muted">
                                <p className="text-base md:text-lg leading-relaxed">
                                    I'm deeply active in the Web3 space, working on DeFi tools, GameFi, SocioFi, and developer-focused infrastructure.
                                </p>

                                <p className="text-base md:text-lg leading-relaxed">
                                    Hackathons and open-source projects fuel my growth—I believe in shipping bold ideas and building toward a faster, more open, and decentralized internet.
                                </p>
                            </div>

                            <div className="pt-4">
                                <a href="https://drive.google.com/file/d/1JjslPgDp8TboJcvraaQLxmgfkGb0mwml/view" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm font-mono text-foreground border-b border-foreground pb-1 hover:opacity-70 transition-opacity group">
                                    <Download size={16} />
                                    <span>Resume</span>
                                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Detailed Content */}
                    <div className="w-full space-y-24">

                        {/* Experience Timeline */}
                        {/* Experience Timeline */}
                        {/* Experience Timeline */}
                        <div className="w-full max-w-6xl mx-auto experience-section grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start">
                            {/* Header Column */}
                            <div className="text-left lg:sticky lg:top-64 lg:pt-32">
                                <span className="font-mono text-xs text-muted/60 uppercase tracking-widest mb-6 block">02 / Work</span>
                                <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground tracking-tighter leading-[0.9]">
                                    Selected<br />Experience.
                                </h2>
                            </div>

                            {/* Content Column */}
                            <div className="border-l border-border ml-3 space-y-12 pb-4 pt-2 lg:pt-0">
                                {EXPERIENCE.map((exp) => (
                                    <div key={exp.id} className="experience-item relative pl-8 md:pl-12 group">

                                        {/* Timeline Dot & Halo */}
                                        <div className="absolute top-3 left-0 -translate-x-1/2 flex items-center justify-center">
                                            {/* Halo Effect (Visible on Hover) */}
                                            <div className="w-8 h-8 rounded-full bg-foreground/10 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100 absolute" />

                                            {/* Core Dot */}
                                            <div className="w-2.5 h-2.5 rounded-full bg-background border border-muted group-hover:bg-foreground group-hover:border-foreground transition-colors duration-300 relative z-10 shadow-sm" />
                                        </div>

                                        {exp.link ? (
                                            <a href={exp.link} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                                                    <h4 className="text-2xl text-muted font-display font-medium group-hover:text-foreground transition-colors duration-300">{exp.company}</h4>
                                                    <span className="font-mono text-xs text-muted mt-1 sm:mt-0 px-2 py-1 bg-foreground/5 border border-border rounded group-hover:border-muted transition-colors">{exp.period}</span>
                                                </div>
                                                <h5 className="text-sm font-mono text-muted mb-4 group-hover:text-foreground/70 transition-colors">{exp.role}</h5>
                                                <p className="text-muted leading-relaxed max-w-2xl group-hover:text-foreground/80 transition-colors duration-300">
                                                    {exp.description}
                                                </p>
                                            </a>
                                        ) : (
                                            <div className="cursor-default">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                                                    <h4 className="text-2xl text-muted font-display font-medium group-hover:text-foreground transition-colors duration-300">{exp.company}</h4>
                                                    <span className="font-mono text-xs text-muted mt-1 sm:mt-0 px-2 py-1 bg-foreground/5 border border-border rounded group-hover:border-muted transition-colors">{exp.period}</span>
                                                </div>
                                                <h5 className="text-sm font-mono text-muted mb-4 group-hover:text-foreground/70 transition-colors">{exp.role}</h5>
                                                <p className="text-muted leading-relaxed max-w-2xl group-hover:text-foreground/80 transition-colors duration-300">
                                                    {exp.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div className="w-full max-w-6xl mx-auto education-section grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start">
                            {/* Header Column */}
                            <div className="text-left lg:sticky lg:top-64 lg:pt-32">
                                <span className="font-mono text-xs text-muted/60 uppercase tracking-widest mb-6 block">03 / Education</span>
                                <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground tracking-tighter leading-[0.9]">
                                    Academic<br />Background.
                                </h2>
                            </div>

                            {/* Content Column */}
                            <div className="space-y-8 pt-2 lg:pt-0">
                                {EDUCATION.map((edu) => (
                                    <div key={edu.id} className="education-item group relative p-6 border border-border bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 rounded-sm">
                                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3">
                                            <h4 className="text-xl text-foreground font-display font-medium">{edu.institution}</h4>
                                            <span className="font-mono text-xs text-muted mt-1 sm:mt-0 px-2 py-1 bg-foreground/5 border border-border rounded">{edu.period}</span>
                                        </div>
                                        <h5 className="text-sm font-mono text-muted mb-2">{edu.degree}</h5>
                                        {edu.location && (
                                            <p className="text-xs text-muted/70">{edu.location}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technologies */}
                        {/* Technologies */}
                        <div className="w-full max-w-6xl mx-auto tech-grid grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-center">
                            {/* Header Column */}
                            <div className="text-left">
                                <span className="font-mono text-xs text-muted/60 uppercase tracking-widest mb-6 block">04 / Tools</span>
                                <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground tracking-tighter leading-[0.9]">
                                    Tech<br />Stack.
                                </h2>
                            </div>

                            {/* Content Column */}
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 pt-2 lg:pt-0">
                                {SKILLS.map((skill, i) => (
                                    <div key={i} className="tech-item group relative p-5 border border-border bg-foreground/5 hover:bg-foreground hover:text-background transition-all duration-300 rounded-sm">
                                        <div className="font-mono text-sm text-foreground group-hover:text-background mb-2 transition-colors">{skill.name}</div>

                                        <div className="text-[10px] text-muted group-hover:text-background/70 transition-colors leading-tight">
                                            {skill.description}
                                        </div>

                                        {/* Decorative Corner */}
                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-border group-hover:border-background/50 transition-colors opacity-0 group-hover:opacity-100"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contributions Graph */}
                        {/* Contributions Graph */}
                        <div className="w-full max-w-6xl mx-auto contributions-wrapper opacity-0 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start">
                            {/* Header Column */}
                            <div className="text-left lg:sticky lg:top-32">
                                <span className="font-mono text-xs text-muted/60 uppercase tracking-widest mb-6 block">05 / Code</span>
                                <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground tracking-tighter leading-[0.9]">
                                    Open<br />Source.
                                </h2>
                            </div>

                            {/* Content Column */}
                            <div className="pt-2 lg:pt-0">
                                <div className="p-6 border border-border bg-foreground/5 rounded-sm hover:border-muted transition-colors">
                                    <GithubGraph />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
