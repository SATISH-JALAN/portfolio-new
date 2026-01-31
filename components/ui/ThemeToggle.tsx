
import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb } from 'lucide-react';
import gsap from 'gsap';

interface ThemeToggleProps {
    hidden?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ hidden = false }) => {
    // We keep track of state for logic, but visual updates are handled by GSAP
    // to prevent jitter from conflicting React re-renders and CSS transitions.
    const [isDark, setIsDark] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const bulbRef = useRef<HTMLButtonElement>(null);
    const cordRef = useRef<HTMLDivElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);
    const isAnimating = useRef(false);

    useEffect(() => {
        // 1. Initial Theme Check & Setup
        // CHANGED: Defaults to Dark (true) unless 'light' is explicitly in localStorage.
        // This ignores system preference to preserve the portfolio's intended dark aesthetic.
        const checkTheme = () => {
            if (localStorage.theme === 'light') {
                return false; // isDark = false
            }
            return true; // isDark = true (Default)
        };

        const initialIsDark = checkTheme();
        setIsDark(initialIsDark);

        // 2. Set Initial Visual State immediately (No animation) to match theme
        if (!initialIsDark) {
            document.documentElement.classList.add('light');
            gsap.set(bulbRef.current, {
                color: "#eab308", // Yellow-500
                boxShadow: "0 0 40px 10px rgba(234, 179, 8, 0.5)",
                borderColor: "#eab308",
                backgroundColor: "rgba(255, 255, 255, 0.9)"
            });
        } else {
            document.documentElement.classList.remove('light');
            gsap.set(bulbRef.current, {
                color: "#71717a", // Zinc-500
                boxShadow: "0 0 0px 0px rgba(0,0,0,0)",
                borderColor: "#3f3f46", // Zinc-700
                backgroundColor: "rgba(24, 24, 27, 0.8)"
            });
        }

        // 3. Entrance Animation (Drop in from top) - Only run if not hidden initially
        if (isFirstRender.current && !hidden) {
            // Drop straight down without rotation to ensure it looks straight on load
            gsap.fromTo(containerRef.current,
                { y: -100, opacity: 0, rotation: 0 }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    rotation: 0,
                    duration: 1.5, 
                    ease: "elastic.out(1, 0.5)", 
                    delay: 1 
                }
            );
            gsap.fromTo(cordRef.current, { height: 0 }, { height: 64, duration: 1.5, ease: "bounce.out", delay: 1 });
        }
        isFirstRender.current = false;
    }, []);

    // Handle visibility changes (e.g., when modal opens/closes)
    useEffect(() => {
        if (!cordRef.current || !containerRef.current || isFirstRender.current) return;

        if (hidden) {
            // Retract up
            gsap.to(containerRef.current, { y: -150, opacity: 0, duration: 0.5, ease: "power3.in", overwrite: true });
        } else {
            // Drop down (restore)
            gsap.to(containerRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "bounce.out", overwrite: true, delay: 0.2 });
        }
    }, [hidden]);

    const toggleTheme = () => {
        if (!bulbRef.current || !cordRef.current || !containerRef.current || isAnimating.current || hidden) return;

        isAnimating.current = true;
        
        // Configuration for the pull interaction
        const BASE_HEIGHT = 64;
        const PULL_DISTANCE = 28; // Increased distance for better tactile feel
        const STRETCH_SCALE = (BASE_HEIGHT + PULL_DISTANCE) / BASE_HEIGHT;

        // Timeline for the interaction
        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating.current = false; // Unlock interaction
            }
        });

        // Step 1: Smooth Pull Down (Slower, weighted feel)
        tl.to(cordRef.current, {
            scaleY: STRETCH_SCALE,
            duration: 0.35,
            ease: "power3.inOut"
        }, "pull")
        .to(bulbRef.current, { 
            y: PULL_DISTANCE, 
            duration: 0.35, 
            ease: "power3.inOut"
        }, "pull");

        // Step 2: Release & Logic Switch
        tl.add(() => {
            const newIsDark = !isDark;
            setIsDark(newIsDark);
            
            // Flash Effect - Smoother fade
            if (newIsDark) {
                document.documentElement.classList.remove('light');
                localStorage.theme = 'dark';
                
                gsap.fromTo(flashRef.current, 
                    { autoAlpha: 1, backgroundColor: '#ffffff', mixBlendMode: 'difference' }, 
                    { autoAlpha: 0, duration: 1.2, ease: "power2.out" }
                );
            } else {
                document.documentElement.classList.add('light');
                localStorage.theme = 'light';
                
                gsap.fromTo(flashRef.current, 
                    { autoAlpha: 1, backgroundColor: '#ffffff', mixBlendMode: 'normal' }, 
                    { autoAlpha: 0, duration: 1.5, ease: "power2.out" }
                );
            }
        });

        // Step 3: Recoil (Up) - Fluid Elasticity
        tl.to(cordRef.current, {
            scaleY: 1,
            duration: 1.6,
            ease: "elastic.out(1, 0.3)" // Bouncier but smooth
        }, "release");
        
        // Animate Visual Props to new state during recoil
        tl.to(bulbRef.current, {
            y: 0,
            duration: 1.6,
            ease: "elastic.out(1, 0.3)",
            // Colors update...
            color: !isDark ? "#71717a" : "#eab308", 
            boxShadow: !isDark ? "0 0 0px 0px rgba(0,0,0,0)" : "0 0 50px 20px rgba(234, 179, 8, 0.6)",
            backgroundColor: !isDark ? "rgba(24, 24, 27, 0.8)" : "rgba(255, 255, 255, 0.9)",
            borderColor: !isDark ? "#3f3f46" : "#eab308"
        }, "release");

        // Step 4: Pendulum Swing Physics - Continuous Motion
        const randomKick = Math.random() > 0.5 ? 6 : -6; // Reduced angle for smoothness
        
        // Swing out gently as it recoils up
        tl.to(containerRef.current, {
            rotation: randomKick,
            duration: 0.5,
            ease: "power2.out"
        }, "release");

        // Long, slow settle
        tl.to(containerRef.current, {
            rotation: 0,
            duration: 5,
            ease: "elastic.out(1.5, 0.2)", // Low frequency sway
            transformOrigin: "top center"
        });
    };

    return (
        <>
            {/* Screen Flash Overlay */}
            <div 
                ref={flashRef} 
                className="fixed inset-0 z-[100] pointer-events-none opacity-0" 
            />

            {/* Hanging Bulb Container - Pivot Point for Swing */}
            <div 
                ref={containerRef}
                className="fixed top-0 right-8 md:right-16 z-50 flex flex-col items-center origin-top will-change-transform"
            >
                {/* The Cord - origin-top ensures it scales downwards */}
                <div 
                    ref={cordRef} 
                    className="w-[1px] bg-zinc-700 dark:bg-zinc-600 h-16 origin-top"
                />
                
                {/* The Bulb (Button) */}
                <button
                    ref={bulbRef}
                    onClick={toggleTheme}
                    disabled={hidden}
                    className="
                        relative group flex items-center justify-center w-10 h-10 rounded-full 
                        border backdrop-blur-md z-10
                        hover:border-zinc-500
                        active:scale-95
                        focus:outline-none
                        /* Note: No CSS transitions on color/shadow to avoid GSAP conflict */
                    "
                    aria-label="Toggle Theme"
                >
                    <Lightbulb size={20} strokeWidth={2} />
                    
                    {/* Filament Arc Animation on Hover */}
                    <div className="absolute inset-0 rounded-full pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle 
                                cx="50" cy="50" r="22" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1" 
                                strokeDasharray="10 100" 
                                className="opacity-0 group-hover:opacity-100 animate-[spin_3s_linear_infinite] origin-center transition-opacity duration-500"
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </>
    );
};
