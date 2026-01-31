
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, Check } from 'lucide-react';
import { GOALS_2026 } from '../../constants';
import { Button } from '../ui/Elements';

interface Goals2026Props {
    onBack: () => void;
}

export const Goals2026: React.FC<Goals2026Props> = ({ onBack }) => {
    // Interactive state removed. Logic now relies purely on the static data from constants.
    const containerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const completedCount = GOALS_2026.filter(g => g.completed).length;
    const progress = (completedCount / GOALS_2026.length) * 100;

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".goal-header", {
                y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2
            });
            gsap.from(".goal-item", {
                x: -20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.5
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Animate progress bar when progress changes
    useLayoutEffect(() => {
        gsap.to(progressBarRef.current, {
            width: `${progress}%`,
            duration: 0.5,
            ease: "power2.out"
        });
    }, [progress]);

    return (
        <div ref={containerRef} className="min-h-screen bg-background pt-32 pb-24 px-4 md:px-6 relative z-50">
             {/* Header */}
             <div className="container mx-auto max-w-3xl mb-12 goal-header">
                <Button variant="ghost" onClick={onBack} className="mb-8 pl-0 hover:bg-transparent hover:text-accent">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
                </Button>
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-2">
                            2026 GOALS
                        </h1>
                        <p className="text-muted font-mono">Manifesting the future, one checkbox at a time.</p>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-display font-bold text-foreground">{Math.round(progress)}%</div>
                        <div className="text-xs font-mono text-muted uppercase tracking-widest">Completed</div>
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div ref={progressBarRef} className="h-full bg-green-500 w-0" />
                </div>
            </div>

            {/* Checklist (Read Only) */}
            <div className="container mx-auto max-w-3xl space-y-4">
                {GOALS_2026.map((goal) => (
                    <div 
                        key={goal.id}
                        className={`
                            goal-item group flex items-center gap-6 p-6 border rounded-sm transition-all duration-300
                            ${goal.completed 
                                ? 'bg-green-500/10 border-green-500/30' 
                                : 'bg-background border-border'
                            }
                        `}
                    >
                        {/* Status Icon */}
                        <div className={`
                            w-8 h-8 rounded border flex items-center justify-center transition-all duration-300
                            ${goal.completed 
                                ? 'bg-green-500 border-green-500 text-black' 
                                : 'bg-transparent border-muted'
                            }
                        `}>
                            <Check size={18} className={`transition-transform duration-300 ${goal.completed ? 'scale-100' : 'scale-0'}`} />
                        </div>

                        {/* Text */}
                        <span className={`
                            text-lg md:text-xl font-display transition-all duration-300
                            ${goal.completed ? 'text-green-500 line-through decoration-green-500/50' : 'text-foreground'}
                        `}>
                            {goal.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
