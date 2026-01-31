import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';

export const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    useEffect(() => {
        if (isVisible) {
            gsap.to(buttonRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                display: "flex"
            });
        } else {
            gsap.to(buttonRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    if (buttonRef.current && !isVisible) {
                         // GSAP handles display toggling often, but ensuring cleanup
                    }
                }
            });
        }
    }, [isVisible]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            ref={buttonRef}
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 z-40 hidden w-12 h-12 rounded-full border border-zinc-800 bg-black text-white items-center justify-center hover:bg-white hover:text-black transition-colors mix-blend-difference"
            aria-label="Scroll to top"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
            <ArrowUp size={20} />
        </button>
    );
};