import React, { useState, useEffect, useRef } from 'react';
import { Home, User, Briefcase, Mail } from 'lucide-react';
import gsap from 'gsap';
import { Magnetic } from './ui/Magnetic';

const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'Profile', icon: User },
    { id: 'work', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
];

export const FloatingNavbar: React.FC<{ hidden?: boolean }> = ({ hidden = false }) => {
    const [activeSection, setActiveSection] = useState('hero');
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Entrance animation
        const ctx = gsap.context(() => {
            gsap.fromTo(navRef.current,
                { y: 100, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.5 }
            );
        });

        // Scroll Spy Logic
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight * 0.4;

            for (const item of navItems) {
                const element = document.getElementById(item.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(item.id);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            ctx.revert();
        };
    }, []);

    // Animate hide/show based on hidden prop
    useEffect(() => {
        if (navRef.current) {
            if (hidden) {
                // Hide animation
                gsap.to(navRef.current, {
                    y: 100,
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.4,
                    ease: "power2.in",
                    pointerEvents: "none"
                });
            } else {
                // Show animation
                gsap.to(navRef.current, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    pointerEvents: "auto"
                });
            }
        }
    }, [hidden]);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            ref={navRef}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto"
        >
            {/* Dock Container */}
            <div className="flex items-center gap-2 p-2 rounded-2xl border border-zinc-800/60 bg-black/40 backdrop-blur-xl shadow-2xl ring-1 ring-white/5 transition-all duration-300 hover:bg-black/60 hover:border-zinc-700/60 hover:scale-105">

                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    const isHovered = hoveredTab === item.id;
                    const Icon = item.icon;

                    return (
                        <Magnetic key={item.id} strength={0.4}>
                            <button
                                onClick={() => scrollTo(item.id)}
                                onMouseEnter={() => setHoveredTab(item.id)}
                                onMouseLeave={() => setHoveredTab(null)}
                                className={`
                                    relative group flex flex-col items-center justify-center
                                    w-12 h-12 rounded-xl transition-all duration-300 ease-out
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20
                                    ${isActive
                                        ? 'bg-zinc-800 text-white shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.1)]'
                                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                                    }
                                `}
                                aria-label={item.label}
                            >
                                {/* Icon */}
                                <Icon
                                    size={20}
                                    strokeWidth={isActive ? 2 : 1.5}
                                    className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
                                />

                                {/* Active Indicator (Dot) */}
                                {isActive && (
                                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
                                )}

                                {/* Shadcn-style Tooltip */}
                                <div className={`
                                    absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5
                                    bg-zinc-950 border border-zinc-800 rounded-md shadow-xl
                                    text-[10px] font-medium text-zinc-200 tracking-wide
                                    transition-all duration-200 pointer-events-none whitespace-nowrap
                                    ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}
                                `}>
                                    {item.label}
                                    {/* Tooltip Arrow */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
                                </div>
                            </button>
                        </Magnetic>
                    )
                })}

                {/* Vertical Divider */}
                <div className="w-px h-6 bg-zinc-800/80 mx-1"></div>

                {/* Quick Action: Resume/CV (Example of Dock "Action") */}
                <Magnetic strength={0.4}>
                    <a
                        href="https://drive.google.com/file/d/1JjslPgDp8TboJcvraaQLxmgfkGb0mwml/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            flex items-center justify-center w-12 h-12 rounded-xl
                            bg-white text-black font-bold font-mono text-xs
                            hover:bg-zinc-200 transition-colors shadow-lg
                            group relative
                        "
                        aria-label="Resume"
                    >
                        CV
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-md shadow-xl text-[10px] text-zinc-200 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                            Resume
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
                        </div>
                    </a>
                </Magnetic>

            </div>
        </div>
    );
};