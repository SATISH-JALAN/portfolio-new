import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MarqueeTextProps {
    text: string;
    direction?: 'left' | 'right';
    speed?: number;
}

export const MarqueeText: React.FC<MarqueeTextProps> = ({ text, direction = 'left', speed = 1 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !textRef.current) return;

        const moveDistance = textRef.current.scrollWidth - window.innerWidth;

        gsap.to(textRef.current, {
            x: direction === 'left' ? -moveDistance : moveDistance,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: speed,
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full overflow-hidden py-12 md:py-24 pointer-events-none select-none bg-background">
            <div 
                ref={textRef} 
                className={`flex whitespace-nowrap font-pixel font-bold text-[15vw] leading-none tracking-tighter text-foreground/5 uppercase ${direction === 'right' ? '-translate-x-1/2' : ''}`}
            >
                {/* Repeat text to ensure it covers the screen */}
                {text} • {text} • {text} • {text}
            </div>
        </div>
    );
};
