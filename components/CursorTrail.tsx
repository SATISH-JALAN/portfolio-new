import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CursorTrail: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const text = textRef.current;
        
        // Only run on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches || !cursor || !text) {
            if (cursor) cursor.style.display = 'none';
            return;
        }

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const onMouseEnterLink = (e: Event) => {
            const target = e.currentTarget as HTMLElement;
            const action = target.getAttribute('data-cursor') || '';
            
            if (action) {
                text.innerText = action;
                gsap.to(cursor, { width: 80, height: 80, backgroundColor: 'var(--foreground)', duration: 0.3, ease: 'power3.out', mixBlendMode: 'normal' });
                gsap.to(text, { opacity: 1, duration: 0.2, delay: 0.1 });
            } else {
                gsap.to(cursor, { width: 48, height: 48, backgroundColor: 'transparent', border: '1px solid var(--muted)', duration: 0.3, ease: 'power3.out', mixBlendMode: 'difference' });
            }
        };

        const onMouseLeaveLink = () => {
            gsap.to(cursor, { width: 12, height: 12, backgroundColor: 'var(--foreground)', border: '0px solid transparent', duration: 0.3, ease: 'power3.out', mixBlendMode: 'difference' });
            gsap.to(text, { opacity: 0, duration: 0.1 });
        };

        window.addEventListener("mousemove", onMouseMove);
        
        let links: NodeListOf<Element>;

        // Use event delegation for hover states
        const attachListeners = () => {
            links = document.querySelectorAll('a, button, [data-cursor]');
            links.forEach(link => {
                link.removeEventListener('mouseenter', onMouseEnterLink);
                link.removeEventListener('mouseleave', onMouseLeaveLink);
                link.addEventListener('mouseenter', onMouseEnterLink);
                link.addEventListener('mouseleave', onMouseLeaveLink);
            });
        };

        // Mutation observer to handle dynamically added elements
        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });
        attachListeners();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            observer.disconnect();
            if (links) {
                links.forEach(link => {
                    link.removeEventListener('mouseenter', onMouseEnterLink);
                    link.removeEventListener('mouseleave', onMouseLeaveLink);
                });
            }
        };
    }, []);

    return (
        <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-foreground rounded-full pointer-events-none z-[100] mix-blend-difference flex items-center justify-center overflow-hidden border-0">
            <span ref={textRef} className="text-[10px] font-display text-background opacity-0 pointer-events-none font-bold uppercase tracking-wider"></span>
        </div>
    );
};