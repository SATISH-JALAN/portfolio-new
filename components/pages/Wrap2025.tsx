
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';
import { WRAP_2025 } from '../../constants';
import { Button } from '../ui/Elements';

interface Wrap2025Props {
    onBack: () => void;
}

export const Wrap2025: React.FC<Wrap2025Props> = ({ onBack }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance
            gsap.from(".wrap-header", {
                y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2
            });

            gsap.from(".month-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "power3.out",
                delay: 0.4
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-background pt-32 pb-24 px-4 md:px-6 relative z-50">
            {/* Header */}
            <div className="container mx-auto mb-16 wrap-header">
                <Button variant="ghost" onClick={onBack} className="mb-8 pl-0 hover:bg-transparent hover:text-accent">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
                </Button>
                <h1 className="text-6xl md:text-8xl font-display font-bold text-foreground mb-4">
                    2025 WRAP
                </h1>
                <p className="text-muted text-lg font-mono max-w-2xl">
                    A year of code, caffeine, and commits. Here is the monthly breakdown.
                </p>
            </div>

            {/* Grid */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {WRAP_2025.map((item, index) => (
                    <div 
                        key={index} 
                        className="month-card group relative p-8 border border-border bg-foreground/5 hover:bg-foreground hover:text-background transition-all duration-300 rounded-sm min-h-[250px] flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <span className="font-mono text-xs opacity-50 uppercase tracking-widest border border-border/50 px-2 py-1 rounded">
                                {String(index + 1).padStart(2, '0')} / {item.month}
                            </span>
                        </div>

                        <div>
                            <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-background transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-muted group-hover:text-background/80 leading-relaxed transition-colors">
                                {item.description}
                            </p>
                        </div>
                        
                        {/* Decorative background number */}
                        <div className="absolute bottom-[-20px] right-[-20px] text-[120px] font-bold opacity-[0.03] group-hover:opacity-[0.1] font-display pointer-events-none select-none transition-opacity">
                            {index + 1}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
