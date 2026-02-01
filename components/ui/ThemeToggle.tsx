
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Lightbulb } from 'lucide-react';
import gsap from 'gsap';

interface ThemeToggleProps {
    hidden?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ hidden = false }) => {
    const [isDark, setIsDark] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const bulbRef = useRef<HTMLButtonElement>(null);
    const cordRef = useRef<HTMLDivElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);

    // Drag state refs
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const lastX = useRef(0);
    const velocity = useRef(0);
    const longPressTimer = useRef<NodeJS.Timeout | null>(null);
    const currentRotation = useRef(0);

    useEffect(() => {
        const checkTheme = () => {
            if (localStorage.theme === 'light') {
                return false;
            }
            return true;
        };

        const initialIsDark = checkTheme();
        setIsDark(initialIsDark);

        if (!initialIsDark) {
            document.documentElement.classList.add('light');
            gsap.set(bulbRef.current, {
                color: "#eab308",
                boxShadow: "0 0 40px 10px rgba(234, 179, 8, 0.5)",
                borderColor: "#eab308",
                backgroundColor: "rgba(255, 255, 255, 0.9)"
            });
        } else {
            document.documentElement.classList.remove('light');
            gsap.set(bulbRef.current, {
                color: "#71717a",
                boxShadow: "0 0 0px 0px rgba(0,0,0,0)",
                borderColor: "#3f3f46",
                backgroundColor: "rgba(24, 24, 27, 0.8)"
            });
        }

        if (isFirstRender.current && !hidden) {
            gsap.fromTo(containerRef.current,
                { y: -100, opacity: 0, rotation: 0 },
                { y: 0, opacity: 1, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 1 }
            );
            gsap.fromTo(cordRef.current, { height: 0 }, { height: 64, duration: 1.5, ease: "bounce.out", delay: 1 });
        }
        isFirstRender.current = false;
    }, []);

    useEffect(() => {
        if (!cordRef.current || !containerRef.current || isFirstRender.current) return;

        if (hidden) {
            gsap.to(containerRef.current, { y: -150, opacity: 0, duration: 0.5, ease: "power3.in", overwrite: true });
        } else {
            gsap.to(containerRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "bounce.out", overwrite: true, delay: 0.2 });
        }
    }, [hidden]);

    // Start drag on long press
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        if (hidden) return;

        const startX = e.clientX;
        dragStartX.current = startX;
        lastX.current = startX;
        velocity.current = 0;

        // Long press detection (300ms)
        longPressTimer.current = setTimeout(() => {
            isDragging.current = true;
            // Kill any ongoing swing animations
            gsap.killTweensOf(containerRef.current, "rotation");

            // Visual feedback - slight scale up
            gsap.to(bulbRef.current, {
                scale: 1.1,
                duration: 0.2,
                ease: "power2.out"
            });

            // Change cursor
            if (bulbRef.current) {
                bulbRef.current.style.cursor = 'grabbing';
            }
        }, 300);

        // Capture pointer for smooth tracking
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }, [hidden]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging.current || !containerRef.current) return;

        const currentX = e.clientX;
        const deltaX = currentX - dragStartX.current;

        // Calculate velocity for physics on release
        velocity.current = currentX - lastX.current;
        lastX.current = currentX;

        // Convert horizontal movement to rotation (max ±30 degrees) - INVERTED for natural feel
        const maxRotation = 30;
        const sensitivity = 0.3;
        let rotation = -deltaX * sensitivity; // Negated for correct direction
        rotation = Math.max(-maxRotation, Math.min(maxRotation, rotation));

        currentRotation.current = rotation;

        // Apply rotation immediately with GSAP for smoothness
        gsap.to(containerRef.current, {
            rotation: rotation,
            duration: 0.1,
            ease: "power1.out",
            overwrite: true
        });
    }, []);

    const handlePointerUp = useCallback((e: React.PointerEvent) => {
        // Clear long press timer if released early
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }

        // Reset cursor
        if (bulbRef.current) {
            bulbRef.current.style.cursor = 'pointer';
        }

        // Reset scale
        gsap.to(bulbRef.current, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
        });

        if (!isDragging.current) {
            // It was a short click, not a drag - toggle theme
            return; // Let onClick handle it
        }

        isDragging.current = false;

        if (!containerRef.current) return;

        // Physics-based swing on release
        const releaseVelocity = velocity.current * 0.5; // Scale velocity
        const currentRot = currentRotation.current;

        // Create natural pendulum swing based on release velocity
        const tl = gsap.timeline({ overwrite: 'auto' });

        // Add momentum based on velocity
        const momentumRotation = currentRot + releaseVelocity * 2;
        const clampedMomentum = Math.max(-35, Math.min(35, momentumRotation));

        // Swing with momentum
        tl.to(containerRef.current, {
            rotation: clampedMomentum,
            duration: 0.3,
            ease: "power1.out"
        });

        // Swing back (damped)
        tl.to(containerRef.current, {
            rotation: -clampedMomentum * 0.4,
            duration: 0.5,
            ease: "sine.inOut"
        });

        // Swing forward (more damped)
        tl.to(containerRef.current, {
            rotation: clampedMomentum * 0.15,
            duration: 0.4,
            ease: "sine.inOut"
        });

        // Settle to center
        tl.to(containerRef.current, {
            rotation: 0,
            duration: 0.6,
            ease: "sine.out",
            transformOrigin: "top center"
        });

        currentRotation.current = 0;
    }, []);

    const handlePointerCancel = useCallback(() => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
        isDragging.current = false;

        // Reset
        gsap.to(bulbRef.current, { scale: 1, duration: 0.2 });
        gsap.to(containerRef.current, { rotation: 0, duration: 0.5, ease: "sine.out" });

        if (bulbRef.current) {
            bulbRef.current.style.cursor = 'pointer';
        }
    }, []);

    const toggleTheme = () => {
        // Don't toggle if we were dragging
        if (isDragging.current) return;
        if (!bulbRef.current || !cordRef.current || !containerRef.current || hidden) return;

        const BASE_HEIGHT = 64;
        const PULL_DISTANCE = 28;
        const STRETCH_SCALE = (BASE_HEIGHT + PULL_DISTANCE) / BASE_HEIGHT;

        const tl = gsap.timeline({ overwrite: 'auto' });

        tl.to(cordRef.current, {
            scaleY: STRETCH_SCALE,
            duration: 0.25,
            ease: "power2.out"
        }, "pull")
            .to(bulbRef.current, {
                y: PULL_DISTANCE,
                duration: 0.25,
                ease: "power2.out"
            }, "pull");

        tl.add(() => {
            const newIsDark = !isDark;
            setIsDark(newIsDark);

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

        tl.to(cordRef.current, {
            scaleY: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.4)"
        }, "release");

        tl.to(bulbRef.current, {
            y: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.4)",
            color: !isDark ? "#71717a" : "#eab308",
            boxShadow: !isDark ? "0 0 0px 0px rgba(0,0,0,0)" : "0 0 50px 20px rgba(234, 179, 8, 0.6)",
            backgroundColor: !isDark ? "rgba(24, 24, 27, 0.8)" : "rgba(255, 255, 255, 0.9)",
            borderColor: !isDark ? "#3f3f46" : "#eab308"
        }, "release");

        // Pendulum swing after toggle
        const randomKick = Math.random() > 0.5 ? 10 : -10;

        tl.to(containerRef.current, {
            rotation: randomKick,
            duration: 0.8,
            ease: "sine.out",
            delay: 0.3
        });

        tl.to(containerRef.current, {
            rotation: -randomKick * 0.5,
            duration: 0.7,
            ease: "sine.inOut"
        });

        tl.to(containerRef.current, {
            rotation: 0,
            duration: 1.2,
            ease: "sine.inOut",
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
                {/* The Cord */}
                <div
                    ref={cordRef}
                    className="w-[1px] bg-zinc-700 dark:bg-zinc-600 h-16 origin-top"
                />

                {/* The Bulb (Button) - Now with drag handlers */}
                <button
                    ref={bulbRef}
                    onClick={toggleTheme}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerCancel}
                    onPointerLeave={handlePointerCancel}
                    disabled={hidden}
                    className="
                        relative group flex items-center justify-center w-10 h-10 rounded-full 
                        border backdrop-blur-md z-10 touch-none select-none
                        hover:border-zinc-500
                        active:scale-95
                        focus:outline-none
                        cursor-pointer
                    "
                    aria-label="Toggle Theme (click to toggle, long-press to drag)"
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
