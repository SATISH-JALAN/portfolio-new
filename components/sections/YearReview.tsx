import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { EXPERIENCE, EDUCATION } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

interface YearReviewProps {
    onNavigate?: (page: 'wrap' | 'goals') => void;
}

export const YearReview: React.FC<YearReviewProps> = ({ onNavigate }) => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Scrubbed scroll animation for each item - smoothly reveals as user scrolls down
        const items = gsap.utils.toArray('.experience-item, .education-item');
        items.forEach((item: any) => {
            gsap.fromTo(item,
                { y: 50, autoAlpha: 0, scale: 0.96 },
                {
                    y: 0,
                    autoAlpha: 1,
                    scale: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 92%",
                        end: "top 68%",
                        scrub: 0.8,
                    }
                }
            );
        });

        // Desktop only: Pin headers when side-by-side layout (>= 1024px)
        mm.add("(min-width: 1024px)", () => {
            ScrollTrigger.create({
                trigger: ".experience-section",
                pin: ".experience-header",
                start: "top 20%",
                end: "bottom 80%",
            });

            ScrollTrigger.create({
                trigger: ".education-section",
                pin: ".education-header",
                start: "top 20%",
                end: "bottom 80%",
            });
        });

        // Animate the timeline lines drawing down smoothly with scroll
        const lines = gsap.utils.toArray('.timeline-line');
        lines.forEach((line: any) => {
            gsap.to(line, {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: line.parentElement,
                    start: "top 80%",
                    end: "bottom 80%",
                    scrub: 0.5,
                }
            });
        });

    }, { scope: containerRef });

    return (
        <section id="experience" ref={containerRef} className="review-section py-24 md:py-32 bg-background relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col gap-20 lg:gap-32">
                    
                    {/* Experience Timeline */}
                    <div className="w-full max-w-6xl mx-auto experience-section grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-24 items-start">
                        {/* Header Column */}
                        <div className="experience-header text-left">
                            <span className="font-mono text-xs text-muted/60 uppercase tracking-widest mb-4 md:mb-6 block">03 / Work</span>
                            <h2 className="text-4xl md:text-6xl font-pixel font-medium text-foreground tracking-tighter leading-[0.9]">
                                Experience.
                            </h2>
                        </div>

                        {/* Content Column */}
                        <div className="relative ml-0 md:ml-4 pl-6 sm:pl-8 md:pl-12 space-y-12 sm:space-y-16 pb-4 pt-2 lg:pt-0">
                            {/* Gradient Timeline Line */}
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-border/10 via-border/80 to-border/10 origin-top scale-y-0 timeline-line"></div>

                            {EXPERIENCE.map((exp) => (
                                <div key={exp.id} className="experience-item relative group">
                                    {/* Timeline Dot & Halo */}
                                    <div className="absolute top-2 -left-6 sm:-left-8 md:-left-12 -translate-x-[0.5px] flex items-center justify-center">
                                        <div className="w-8 h-8 rounded-full bg-foreground/10 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100 absolute" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-background border-2 border-muted group-hover:bg-foreground group-hover:border-foreground transition-colors duration-300 relative z-10 shadow-sm" />
                                    </div>

                                    {exp.link ? (
                                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="block cursor-pointer px-4 sm:px-6 py-4 -mx-4 sm:-mx-6 rounded-2xl hover:bg-foreground/[0.02] hover:scale-[1.02] border border-transparent hover:border-border/40 transition-all duration-500">
                                            <div className="flex flex-col mb-4">
                                                <h4 className="text-xl sm:text-2xl text-foreground/90 font-display font-medium group-hover:text-foreground transition-colors duration-500 mb-1">{exp.role}</h4>
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                                                    <span className="font-mono text-muted/80">{exp.company}</span>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                                                    <span className="font-mono text-muted bg-foreground/5 px-2 py-0.5 rounded">{exp.period}</span>
                                                </div>
                                            </div>
                                            <p className="text-muted leading-relaxed text-sm sm:text-base max-w-2xl group-hover:text-foreground/80 transition-colors duration-500">
                                                {exp.description}
                                            </p>
                                        </a>
                                    ) : (
                                        <div className="cursor-default px-4 sm:px-6 py-4 -mx-4 sm:-mx-6 rounded-2xl hover:bg-foreground/[0.02] hover:scale-[1.02] border border-transparent hover:border-border/40 transition-all duration-500">
                                            <div className="flex flex-col mb-4">
                                                <h4 className="text-xl sm:text-2xl text-foreground/90 font-display font-medium group-hover:text-foreground transition-colors duration-500 mb-1">{exp.role}</h4>
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                                                    <span className="font-mono text-muted/80">{exp.company}</span>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                                                    <span className="font-mono text-muted bg-foreground/5 px-2 py-0.5 rounded">{exp.period}</span>
                                                </div>
                                            </div>
                                            <p className="text-muted leading-relaxed text-sm sm:text-base max-w-2xl group-hover:text-foreground/80 transition-colors duration-500">
                                                {exp.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education — Full-width Grid Block */}
                    <div className="w-full max-w-6xl mx-auto education-section grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-24 items-start">
                        {/* Header Column */}
                        <div className="education-header text-left">
                            <span className="font-mono text-xs text-muted/60 uppercase tracking-widest mb-4 md:mb-6 block">04 / Education</span>
                            <h2 className="text-4xl md:text-6xl font-pixel font-medium text-foreground tracking-tighter leading-[0.9]">
                                Education.
                            </h2>
                        </div>

                        {/* Content Column */}
                        <div className="relative ml-0 md:ml-4 pl-6 sm:pl-8 md:pl-12 space-y-12 pb-4 pt-2 lg:pt-0">
                            {/* Gradient Timeline Line */}
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-border/10 via-border/80 to-border/10 origin-top scale-y-0 timeline-line"></div>

                            {EDUCATION.map((edu) => (
                                <div key={edu.id} className="education-item relative group">
                                    {/* Timeline Square & Halo */}
                                    <div className="absolute top-2 -left-6 sm:-left-8 md:-left-12 -translate-x-[0.5px] flex items-center justify-center">
                                        <div className="w-8 h-8 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100 absolute rounded-sm" />
                                        <div className="w-2.5 h-2.5 bg-background border-2 border-muted group-hover:bg-foreground group-hover:border-foreground transition-colors duration-300 relative z-10 shadow-sm rounded-sm" />
                                    </div>

                                    <div className="cursor-default px-4 sm:px-6 py-4 -mx-4 sm:-mx-6 rounded-2xl hover:bg-foreground/[0.02] hover:scale-[1.02] border border-transparent hover:border-border/40 transition-all duration-500">
                                        <div className="flex flex-col mb-2">
                                            <h4 className="text-xl sm:text-2xl text-foreground/90 font-display font-medium group-hover:text-foreground transition-colors duration-500 mb-1">{edu.degree}</h4>
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                                                <span className="font-mono text-muted/80">{edu.institution}</span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                                                <span className="font-mono text-muted bg-foreground/5 px-2 py-0.5 rounded">{edu.period}</span>
                                            </div>
                                        </div>
                                        {edu.location && (
                                            <p className="text-muted leading-relaxed max-w-2xl group-hover:text-foreground/80 transition-colors duration-500 text-xs sm:text-sm">
                                                {edu.location}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
