import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS } from '../../constants';
import { GithubGraph } from '../ui/GithubGraph';
import { getTechIconInfo } from '../ui/TechBadge';

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
                            once: true // Play once to avoid mobile resize bugs
                        }
                    }
                );
            };

            // Tech Items (Grid Stagger)
            animateIn(".tech-item", ".tech-grid", 0.05);

            // Contributions
            animateIn(".contributions-wrapper", ".contributions-wrapper");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="py-32 bg-background relative overflow-hidden transition-colors duration-500">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

            <div ref={containerRef} className="container px-4 md:px-6 mx-auto relative z-10">

                <div className="flex flex-col gap-24 lg:gap-32">

                    {/* Technologies */}
                    <div className="w-full max-w-6xl mx-auto tech-grid grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start">
                        {/* Header Column */}
                        <div className="text-left">
                            <span className="font-mono text-xs text-muted/60 uppercase tracking-widest mb-6 block">01 / Ecosystem</span>
                            <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground tracking-tighter leading-[0.9]">
                                Tech<br />Stack.
                            </h2>
                        </div>

                        {/* Content Column - Category Groups */}
                        <div className="space-y-10 pt-2 lg:pt-0">
                            {SKILLS.map((category, catIndex) => (
                                <div key={catIndex} className="relative pt-6 first:pt-4">
                                    <h3 className="absolute top-0 left-0 text-[10px] sm:text-xs font-mono text-muted/60 uppercase tracking-widest">{category.title}</h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        {category.items.map((skill, i) => {
                                            const iconInfo = getTechIconInfo(skill.name);
                                            const iconClass = iconInfo?.iconClass;
                                            const FallbackIcon = iconInfo?.FallbackIcon;
                                            const isTier1 = skill.tier !== 2;

                                            return (
                                                <div 
                                                    key={i} 
                                                    className={`tech-item group flex items-center gap-2.5 px-3 py-1.5 transition-all duration-300 rounded-lg cursor-default 
                                                        ${isTier1 
                                                            ? 'opacity-100 border border-border bg-foreground/[0.06] font-medium hover:bg-foreground/10 hover:border-foreground/40' 
                                                            : 'opacity-60 border border-border/40 bg-transparent font-normal hover:opacity-100 hover:bg-foreground/5 hover:border-border/80'}`}
                                                    title={skill.description}
                                                >
                                                    {/* Icon Header */}
                                                    <div className={`text-base flex items-center justify-center transition-colors duration-300 ${isTier1 ? 'text-foreground/80 group-hover:text-foreground' : 'text-muted group-hover:text-foreground/80'}`}>
                                                        {iconClass ? (
                                                            <i className={`${iconClass}`} />
                                                        ) : FallbackIcon ? (
                                                            <FallbackIcon size={16} strokeWidth={2} />
                                                        ) : (
                                                            <div className="w-4 h-4 rounded-full bg-foreground/20" />
                                                        )}
                                                    </div>

                                                    <span className={`font-mono text-xs tracking-wide transition-colors ${isTier1 ? 'text-foreground group-hover:text-foreground' : 'text-muted group-hover:text-foreground/90'}`}>
                                                        {skill.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contributions Graph */}
                    <div className="w-full max-w-6xl mx-auto contributions-wrapper grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start">
                        {/* Header Column */}
                        <div className="text-left lg:sticky lg:top-32">
                            <span className="font-mono text-xs text-muted/60 uppercase tracking-widest mb-6 block">02 / Code</span>
                            <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground tracking-tighter leading-[0.9]">
                                Open<br />Source.
                            </h2>
                            <p className="mt-8 text-muted leading-relaxed">
                                Constant shipping, continuous learning. I actively contribute to the ecosystems I rely on and build tools that accelerate the community.
                            </p>
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
        </section>
    );
};
