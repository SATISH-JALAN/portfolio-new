import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ArrowDown, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { PORTFOLIO_DATA, SOCIALS } from '../../constants';
import { Button } from '../ui/Elements';
import { TextScramble } from '../ui/TextScramble';

gsap.registerPlugin(SplitText);

interface HeroProps {
    loading?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ loading = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (loading) return;

        const tl = gsap.timeline();

        // 1. Image unmasking
        gsap.set(".hero-image-wrapper", { clipPath: "inset(100% 0 0 0)" }); // Slide up reveal
        
        // 2. Name split text
        const split = new SplitText(nameRef.current, { type: "chars,words" });
        gsap.set(split.chars, { y: 100, opacity: 0 });
        
        // 3. Other elements fade
        gsap.set(".hero-fade", { opacity: 0, y: 30 });

        tl.to(".hero-image-wrapper", { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.inOut" })
          .to(split.chars, { y: 0, opacity: 1, stagger: 0.02, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6")
          .to(".hero-fade", { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" }, "-=0.4");

        return () => split.revert();
    }, { dependencies: [loading], scope: containerRef });

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
        <section ref={containerRef} id="hero" className="min-h-screen flex items-center justify-center relative px-4 md:px-8 lg:px-16 overflow-hidden">
            {/* Dot Grid Background */}
            <div 
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                    backgroundSize: "32px 32px"
                }}
            />

            {/* Main Layout - Asymmetric */}
            <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-24 items-center py-10 relative z-10 pt-16 md:pt-10">

                {/* Left - Photo (Stacked Top on Mobile) */}
                <div className="order-1 lg:order-1 flex justify-center lg:justify-start">
                    <div
                        ref={imageContainerRef}
                        className="relative w-[220px] sm:w-[280px] md:w-[380px] lg:w-[420px] aspect-[3/4] group"
                        onMouseMove={handleImageMouseMove}
                        onMouseLeave={handleImageMouseLeave}
                    >
                        {/* Faint Radial Glow Behind Photo */}
                        <div 
                            className="absolute inset-0 -m-32 z-0 pointer-events-none" 
                            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)' }}
                        />

                        {/* Drop shadow wrapper to evade GSAP clipPath block */}
                        <div className="absolute inset-0 z-0" style={{ boxShadow: '0 20px 80px rgba(0,0,0,0.9)' }} />

                        {/* Main Image Wrapper */}
                        <div className="hero-image-wrapper w-full h-full overflow-hidden bg-neutral-900 relative z-10 rounded-2xl">
                            <img
                                ref={imageRef}
                                src="/satish.jpeg"
                                alt="Satish Jalan"
                                className="w-full h-full object-cover will-change-transform"
                            />
                            {/* SVG Noise Overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-40 z-20 mix-blend-overlay">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                                    <filter id="noiseFilter">
                                        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                                    </filter>
                                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right - Content */}
                <div className="order-2 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">

                    {/* Name - Split Text Reveal */}
                    <h1 ref={nameRef} className="mb-4 md:mb-6 font-pixel font-bold text-[clamp(60px,16vw,120px)] md:text-[10vw] lg:text-[6vw] leading-[1.0] tracking-tighter text-foreground overflow-hidden">
                        {PORTFOLIO_DATA.name}
                    </h1>

                    {/* Role */}
                    <p className="hero-fade text-foreground/80 font-mono text-xs md:text-sm tracking-widest uppercase mb-4 flex items-center gap-3">
                        <span className="text-accent">→</span> <TextScramble text={PORTFOLIO_DATA.role} reveal={!loading} />
                    </p>

                    {/* Short Bio */}
                    <div className="hero-fade mb-8 w-full max-w-lg">
                        <p className="text-muted text-sm md:text-base leading-relaxed">
                            {PORTFOLIO_DATA.bio} 
                            <br/><br/>
                            Specializing in modern web technologies, building scalable architectures, and crafting intuitive user experiences from the ground up.
                        </p>
                        {/* Typographic Divider */}
                        <div className="w-full h-px bg-white/20 mt-8"></div>
                    </div>

                    {/* CTA & Status Row */}
                    <div className="hero-fade flex flex-row flex-wrap justify-center lg:justify-start items-center gap-4 w-full">
                        <Button
                            onClick={scrollToWork}
                            size="lg"
                            className="bg-foreground text-background hover:bg-foreground/90 rounded-sm font-sans font-medium tracking-wide text-sm px-8 py-4 transition-all duration-300 shadow-md"
                            data-cursor="Scroll"
                        >
                            View Projects <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        
                        <a href={SOCIALS.find(s => s.platform === 'GitHub')?.url} target="_blank" rel="noreferrer" data-cursor="Open">
                            <Button
                                size="lg"
                                className="bg-transparent border border-border text-foreground hover:bg-foreground/5 rounded-sm font-sans font-medium tracking-wide text-sm px-6 py-4 flex items-center gap-2 transition-all duration-300"
                            >
                                <Github className="w-4 h-4" /> GitHub
                            </Button>
                        </a>

                        <a href="/resume.pdf" target="_blank" rel="noreferrer" data-cursor="Open">
                            <Button
                                size="lg"
                                className="bg-transparent border border-border text-foreground hover:bg-foreground/5 rounded-sm font-sans font-medium tracking-wide text-sm px-6 py-4 flex items-center gap-2 transition-all duration-300"
                            >
                                Resume
                            </Button>
                        </a>
                    </div>
                    
                    {/* Availability Indicator Moved Below */}
                    <div className="hero-fade mt-6 flex justify-center lg:justify-start items-center gap-3 px-4 py-2 bg-muted/10 border border-border rounded-full inline-flex mx-auto lg:mx-0">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-80"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4ADE80] opacity-80"></span>
                        </span>
                        <span className="font-mono text-[10px] text-muted uppercase tracking-wider font-semibold">
                            {PORTFOLIO_DATA.availability}
                        </span>
                    </div>


                </div>
            </div>
            
            {/* Subtle vertical line accent */}
            <div className="hidden lg:block absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
            <div className="hidden lg:block absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
        </section >
    );
};
