import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrambleTextPlugin);

interface TextScrambleProps {
    text: string;
    className?: string;
    reveal?: boolean; // If true, runs once on mount. If false/undefined, runs on hover.
}

export const TextScramble: React.FC<TextScrambleProps> = ({ text, className = "", reveal = false }) => {
    const textRef = useRef<HTMLSpanElement>(null);

    const scramble = () => {
        if (!textRef.current) return;
        gsap.to(textRef.current, {
            duration: 1.5,
            scrambleText: {
                text: text,
                chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+",
                revealDelay: 0.1,
                speed: 0.8
            },
            ease: "power1.out",
            overwrite: "auto"
        });
    };

    useEffect(() => {
        if (reveal) {
            // Wait slightly so Hero GSAP timeline coordinates well
            const timeout = setTimeout(() => scramble(), 500);
            return () => clearTimeout(timeout);
        }
    }, [reveal, text]);

    return (
        <span 
            ref={textRef}
            className={`inline-block font-mono ${className}`}
            onMouseEnter={!reveal ? scramble : undefined}
        >
            {reveal ? text.replace(/./g, " ") : text}
        </span>
    );
};