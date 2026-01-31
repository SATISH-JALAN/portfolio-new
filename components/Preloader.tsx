import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const hasCompleted = useRef(false);

    useEffect(() => {
        // Prevent scroll
        document.body.style.overflow = 'hidden';
        
        // Counter Animation
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 5) + 1;
            });
        }, 30);

        // Safety fallback: Force complete after 4 seconds max to prevent stuck "black screen"
        const fallbackTimer = setTimeout(() => {
            if (!hasCompleted.current) {
                completeAnimation();
            }
        }, 4000);

        return () => {
            clearInterval(interval);
            clearTimeout(fallbackTimer);
            // Ensure body scroll is restored if component unmounts unexpectedly
            document.body.style.overflow = '';
        };
    }, []);

    const completeAnimation = () => {
        if (hasCompleted.current) return;
        hasCompleted.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                if (containerRef.current) {
                    containerRef.current.style.display = 'none';
                }
                onComplete();
            }
        });

        if (textRef.current && containerRef.current) {
            tl.to(textRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.in"
            })
            .to(containerRef.current, {
                scaleY: 0,
                transformOrigin: "top",
                duration: 1,
                ease: "expo.inOut"
            }, "-=0.3");
        } else {
            // If refs are missing for some reason, just complete immediately
            onComplete();
        }
    };

    useEffect(() => {
        if (count >= 100) {
            setCount(100);
            completeAnimation();
        }
    }, [count]);

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 z-[9999] bg-black text-white flex items-end justify-end p-8 md:p-16 overflow-hidden touch-none"
            style={{ overscrollBehavior: 'none' }}
        >
            <div ref={textRef} className="flex flex-col items-end">
                <div className="text-[15vw] md:text-[12vw] font-display font-bold leading-none tracking-tighter">
                    {count}%
                </div>
                <div className="font-mono text-zinc-500 text-sm md:text-base uppercase tracking-widest mt-2">
                    System Loading...
                </div>
            </div>
        </div>
    );
};