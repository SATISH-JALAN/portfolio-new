import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CursorTrail: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        
        // Only run on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches || !cursor || !follower) {
            if (cursor) cursor.style.display = 'none';
            if (follower) follower.style.display = 'none';
            return;
        }

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
        const xToFollower = gsap.quickTo(follower, "x", { duration: 0.5, ease: "power3" });
        const yToFollower = gsap.quickTo(follower, "y", { duration: 0.5, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            xToFollower(e.clientX);
            yToFollower(e.clientY);
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <>
            <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference" />
            <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border border-zinc-500 rounded-full pointer-events-none z-[99] mix-blend-difference opacity-50 transition-opacity duration-300" />
        </>
    );
};