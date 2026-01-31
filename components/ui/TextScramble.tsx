import React, { useRef, useState } from 'react';

interface TextScrambleProps {
    text: string;
    className?: string;
    reveal?: boolean; // If true, runs once on mount. If false/undefined, runs on hover.
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export const TextScramble: React.FC<TextScrambleProps> = ({ text, className = "", reveal = false }) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const scramble = () => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev => 
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
        }, 30);
    };

    React.useEffect(() => {
        if (reveal) scramble();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [reveal]);

    return (
        <span 
            className={`inline-block font-mono ${className}`}
            onMouseEnter={!reveal ? scramble : undefined}
        >
            {displayText}
        </span>
    );
};