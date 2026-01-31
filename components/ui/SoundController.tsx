
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSound } from '../../context/SoundContext';

export const SoundController: React.FC = () => {
    const { isMuted, toggleSound, playHover } = useSound();
    const containerRef = useRef<HTMLButtonElement>(null);
    const barsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Animation Logic
    useEffect(() => {
        // Clear any existing animations first
        barsRef.current.forEach((bar) => {
            if (bar) gsap.killTweensOf(bar);
        });

        if (!isMuted) {
            // Animate bars when sound is ON
            barsRef.current.forEach((bar, i) => {
                if (!bar) return;
                gsap.to(bar, {
                    height: gsap.utils.random(6, 18), 
                    duration: 0.2 + (Math.random() * 0.1),
                    ease: "power1.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: i * 0.05,
                    onRepeat: () => {
                        // Dynamically update height on repeat for randomness
                        gsap.to(bar, { height: gsap.utils.random(6, 18), duration: 0.2 });
                    }
                });
            });
        } else {
            // Reset to dots when sound is OFF
            barsRef.current.forEach((bar) => {
                if (!bar) return;
                gsap.to(bar, {
                    height: 4,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        }
        
        return () => {
             barsRef.current.forEach((bar) => {
                if (bar) gsap.killTweensOf(bar);
            });
        };
    }, [isMuted]);

    return (
        <div className="fixed bottom-8 right-8 z-[50]">
            <button
                ref={containerRef}
                onClick={toggleSound}
                onMouseEnter={playHover}
                className="group relative w-12 h-12 flex items-center justify-center gap-[3px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg overflow-hidden"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {/* Visual Bars */}
                <div className="flex items-center gap-[3px] h-6 pointer-events-none">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            ref={(el) => { barsRef.current[i] = el }}
                            className={`w-[3px] rounded-full transition-colors duration-300 ${isMuted ? 'bg-zinc-500' : 'bg-green-400'}`}
                            style={{ height: '4px' }}
                        />
                    ))}
                </div>

                {/* Aesthetic Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
            
            {/* Tooltip Label */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-md text-[10px] font-mono text-zinc-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">
                {isMuted ? "ENABLE SOUND" : "MUTE"}
            </div>
        </div>
    );
};
