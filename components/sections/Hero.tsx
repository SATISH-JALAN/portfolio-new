import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { PORTFOLIO_DATA, SOCIALS } from '../../constants';
import { Button } from '../ui/Elements';

interface HeroProps {
    loading?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ loading = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        if (loading) return; // Wait for loading to finish

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            gsap.set(".hero-char", { y: "100%" });
            gsap.set(".hero-fade", { opacity: 0, y: 30 });
            gsap.set(".hero-image-wrapper", { clipPath: "inset(0 0 100% 0)" });
            // Initial state: Hidden (clipped completely from right)
            gsap.set(".signature-text", { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" });

            tl.to(".hero-image-wrapper", { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.out" })
                // Reveal from left to right
                .to(".signature-text", { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 2.5, ease: "power2.out" }, "-=0.5")
                .to(".hero-fade", { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" }, "-=2");

        }, containerRef);

        return () => ctx.revert();
    }, [loading]);

    const handleImageMouseMove = (e: React.MouseEvent) => {
        if (!imageContainerRef.current || !imageRef.current) return;

        const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - left - width / 2;
        const mouseY = e.clientY - top - height / 2;

        gsap.to(imageRef.current, {
            x: mouseX * 0.1,
            y: mouseY * 0.08,
            scale: 1.1,
            duration: 1,
            ease: "power2.out",
            overwrite: "auto"
        });
    };

    const handleImageMouseLeave = () => {
        if (!imageRef.current) return;

        gsap.to(imageRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto"
        });
    };

    const scrollToWork = () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section ref={containerRef} id="hero" className="min-h-screen flex items-center relative px-4 md:px-8 lg:px-16 overflow-hidden">

            {/* Main Layout - Side by Side */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-20">

                {/* Left - Photo */}
                <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                    <div
                        ref={imageContainerRef}
                        className="relative w-[300px] md:w-[380px] lg:w-[420px] aspect-[3/4] group"
                        onMouseMove={handleImageMouseMove}
                        onMouseLeave={handleImageMouseLeave}
                    >
                        {/* Main Image */}
                        <div className="hero-image-wrapper w-full h-full overflow-hidden bg-neutral-900">
                            <img
                                ref={imageRef}
                                src="/satish.jpeg"
                                alt="Satish Jalan"
                                className="w-full h-full object-cover will-change-transform"
                            />
                        </div>

                        {/* Subtle corner accents */}
                        <div className="absolute -top-3 -left-3 w-12 h-12 border-l-2 border-t-2 border-foreground/20" />
                        <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r-2 border-b-2 border-foreground/20" />
                    </div>
                </div>

                {/* Right - Content */}
                <div className="order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">

                    {/* Greeting */}
                    <p className="hero-fade text-muted text-lg md:text-xl tracking-widest uppercase mb-4">
                        Hey! It's me
                    </p>

                    {/* Name - Signature Style */}
                    <h1 className="mb-8 flex flex-col">
                        <span className="font-signature text-[14vw] md:text-[10vw] lg:text-[6vw] leading-[1.1] tracking-normal text-foreground overflow-visible relative">
                            <span className="inline-block signature-text">Satish Jalan</span>
                        </span>
                    </h1>

                    {/* Role */}
                    <p className="hero-fade text-foreground/60 text-base md:text-lg tracking-wide mb-3">
                        {PORTFOLIO_DATA.role}
                    </p>

                    {/* Short Bio */}
                    <p className="hero-fade text-muted text-sm md:text-base leading-relaxed max-w-md mb-8">
                        {PORTFOLIO_DATA.bio}
                    </p>

                    {/* CTA & Status Row */}
                    <div className="hero-fade flex flex-col sm:flex-row items-center gap-6">
                        <Button
                            onClick={scrollToWork}
                            size="lg"
                            className="bg-foreground text-background hover:bg-foreground/90 rounded-none uppercase font-medium tracking-widest text-sm px-8"
                        >
                            View Work <ArrowRight className="ml-3 w-4 h-4" />
                        </Button>

                        {/* Availability */}
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="font-mono text-xs text-muted uppercase tracking-wider">
                                {PORTFOLIO_DATA.availability}
                            </span>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="hero-fade flex items-center gap-4 mt-8">
                        {SOCIALS.filter(s => ['GitHub', 'LinkedIn', 'Twitter'].includes(s.platform)).map((social) => {
                            const Icon = social.platform === 'GitHub' ? Github : social.platform === 'Twitter' ? Twitter : Linkedin;
                            return (
                                <a
                                    key={social.platform}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group relative flex items-center justify-center w-12 h-12 border border-white/10 rounded-full text-muted transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background hover:scale-110"
                                    aria-label={social.platform}
                                >
                                    <Icon size={20} className="transition-transform duration-300" />
                                </a>
                            );
                        })}
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-xs text-muted uppercase tracking-widest">Scroll</span>
                <ArrowDown className="w-4 h-4 text-muted animate-bounce" />
            </div>

            {/* Subtle vertical line accent */}
            <div className="hidden lg:block absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
            <div className="hidden lg:block absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
        </section >
    );
};
