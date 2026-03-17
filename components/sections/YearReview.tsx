import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE, EDUCATION } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

interface YearReviewProps {
    onNavigate?: (page: 'wrap' | 'goals') => void;
}

export const YearReview: React.FC<YearReviewProps> = ({ onNavigate }) => {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const animateIn = (selector: string | Element, trigger: string | Element, stagger = 0) => {
                gsap.fromTo(selector,
                    {
                        y: 30,
                        autoAlpha: 0
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.8,
                        stagger: stagger,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: trigger,
                            start: "top 95%", // Permissive trigger
                            once: true // Only play once to prevent mobile resize hiding
                        }
                    }
                );
            };

            const experienceItems = gsap.utils.toArray('.experience-item');
            experienceItems.forEach((item: any) => {
                animateIn(item, item);
            });

            const educationItems = gsap.utils.toArray('.education-item');
            educationItems.forEach((item: any) => {
                animateIn(item, item);
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" ref={containerRef} className="review-section py-32 bg-background relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col gap-24 lg:gap-32">
                    
                    {/* Experience Timeline */}
                    <div className="w-full max-w-6xl mx-auto experience-section grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start">
                        {/* Header Column */}
                        <div className="text-left lg:sticky lg:top-32">
                            <span className="font-mono text-xs text-muted/60 uppercase tracking-widest mb-6 block">03 / Work</span>
                            <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground tracking-tighter leading-[0.9]">
                                Selected<br />Experience.
                            </h2>
                        </div>

                        {/* Content Column */}
                        <div className="relative ml-0 md:ml-4 pl-8 md:pl-12 space-y-16 pb-4 pt-2 lg:pt-0">
                            {/* Gradient Timeline Line */}
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>

                            {EXPERIENCE.map((exp) => (
                                <div key={exp.id} className="experience-item relative group">
                                    {/* Timeline Dot & Halo */}
                                    <div className="absolute top-2 -left-8 md:-left-12 -translate-x-[0.5px] flex items-center justify-center">
                                        <div className="w-8 h-8 rounded-full bg-foreground/10 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100 absolute" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-background border-2 border-muted group-hover:bg-foreground group-hover:border-foreground transition-colors duration-300 relative z-10 shadow-sm" />
                                    </div>

                                    {exp.link ? (
                                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                                            <div className="flex flex-col mb-4">
                                                <h4 className="text-2xl text-foreground/90 font-display font-medium group-hover:text-foreground transition-colors duration-300 mb-1">{exp.role}</h4>
                                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                                    <span className="font-mono text-muted/80">{exp.company}</span>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                                                    <span className="font-mono text-muted bg-foreground/5 px-2 py-0.5 rounded">{exp.period}</span>
                                                </div>
                                            </div>
                                            <p className="text-muted leading-relaxed max-w-2xl group-hover:text-foreground/80 transition-colors duration-300">
                                                {exp.description}
                                            </p>
                                        </a>
                                    ) : (
                                        <div className="cursor-default">
                                            <div className="flex flex-col mb-4">
                                                <h4 className="text-2xl text-foreground/90 font-display font-medium group-hover:text-foreground transition-colors duration-300 mb-1">{exp.role}</h4>
                                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                                    <span className="font-mono text-muted/80">{exp.company}</span>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                                                    <span className="font-mono text-muted bg-foreground/5 px-2 py-0.5 rounded">{exp.period}</span>
                                                </div>
                                            </div>
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
                    <div className="w-full max-w-6xl mx-auto education-section grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start pb-24">
                        {/* Header Column */}
                        <div className="text-left lg:sticky lg:top-32">
                            <span className="font-mono text-xs text-muted/60 uppercase tracking-widest mb-6 block">04 / Education</span>
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

                </div>
            </div>
        </section>
    );
};
