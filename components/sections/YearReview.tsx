
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, CheckSquare } from 'lucide-react';
import { Button } from '../ui/Elements';

gsap.registerPlugin(ScrollTrigger);

interface YearReviewProps {
    onNavigate: (page: 'wrap' | 'goals') => void;
}

export const YearReview: React.FC<YearReviewProps> = ({ onNavigate }) => {
    const containerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial state - card is visible but positioned down
            gsap.set(".review-card", { y: 30, opacity: 1 });

            // Animate to final position when scrolled into view
            gsap.to(".review-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="review-section py-32 bg-background relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-center">

                    {/* Header Column */}
                    <div className="text-left">
                        <span className="font-mono text-xs text-muted/60 uppercase tracking-widest mb-2 block">05 / Vision</span>
                        <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground tracking-tighter leading-[0.9]">
                            2026<br />Goals.
                        </h2>
                    </div>

                    {/* Content Column */}
                    <div className="pt-2 lg:pt-0">
                        <div
                            onClick={() => onNavigate('goals')}
                            className="review-card group relative border border-border bg-foreground/5 p-8 md:p-12 cursor-pointer hover:bg-foreground/10 transition-colors duration-500 rounded-sm"
                        >
                            <div className="absolute top-8 right-8 text-muted group-hover:text-foreground transition-colors">
                                <CheckSquare size={32} />
                            </div>

                            <div className="space-y-6">
                                <span className="font-mono text-xs text-orange-500 block uppercase tracking-widest">In Progress</span>

                                <p className="text-lg md:text-xl text-muted leading-relaxed max-w-lg group-hover:text-foreground/80 transition-colors">
                                    The roadmap ahead. Technical targets, habit tracking, and the vision for the upcoming year.
                                </p>

                                <div className="flex items-center gap-4 text-foreground font-mono text-sm uppercase tracking-wider group-hover:gap-6 transition-all pt-4">
                                    View Checklist <ArrowRight size={16} />
                                </div>
                            </div>

                            {/* Background Decoration */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
