import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Textarea } from '../ui/Elements';
import { SOCIALS, PORTFOLIO_DATA } from '../../constants';
import { TextScramble } from '../ui/TextScramble';
import { Copy, Check, Github, Twitter, Linkedin, LucideIcon } from 'lucide-react';
import gsap from 'gsap';


// Custom WhatsApp Icon using Bootstrap Icon SVG
const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="currentColor"
        className={`bi bi-whatsapp ${className}`}
        viewBox="0 0 16 16"
    >
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
);

// Custom Social Icon Component with Enhanced Physics
const SocialIcon: React.FC<{ social: typeof SOCIALS[0] }> = ({ social }) => {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const iconRef = useRef<LucideIcon>(null);

    const getIcon = (name: string): React.ElementType => {
        switch (name.toLowerCase()) {
            case 'github': return Github;
            case 'twitter': return Twitter;
            case 'linkedin': return Linkedin;
            case 'whatsapp': return WhatsAppIcon; // Custom Bootstrap Icon
            default: return Github;
        }
    };
    const Icon = getIcon(social.icon);

    useEffect(() => {
        const el = linkRef.current;
        if (!el) return;

        const xTo = gsap.quickTo(el, "x", { duration: 1.2, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(el, "y", { duration: 1.2, ease: "elastic.out(1, 0.3)" });
        const rotTo = gsap.quickTo(el, "rotation", { duration: 1, ease: "power3.out" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = el.getBoundingClientRect();

            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Enhanced "Jiggle" Logic
            // Stronger multiplier for movement and add rotation based on X movement
            xTo(x * 0.6);
            yTo(y * 0.6);
            rotTo(x * 0.8); // Rotate based on horizontal pull
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            rotTo(0);
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const isWhatsApp = social.icon === 'whatsapp';

    return (
        <a
            ref={linkRef}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className={`
                group relative flex items-center justify-center w-14 h-14 border border-border rounded-full text-muted transition-colors duration-300
                ${isWhatsApp
                    ? 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]'
                    : 'hover:text-background hover:bg-foreground'
                }
            `}
            aria-label={social.platform}
        >
            <Icon
                size={24}
                className="transition-transform duration-300 group-hover:scale-110"
            />
        </a>
    );
};

export const Contact: React.FC = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(PORTFOLIO_DATA.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-24 relative bg-background transition-colors duration-500">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-24">

                    {/* Left Column - Big Text */}
                    <div className="md:w-1/2">
                        <h2 className="text-[12vw] md:text-[8vw] leading-[0.8] font-display font-bold text-foreground mb-8 tracking-tighter">
                            LET'S<br />TALK
                        </h2>

                        <div className="space-y-8 mt-12">
                            <div>
                                <h3 className="text-sm font-mono text-muted mb-2 uppercase">Email Me</h3>
                                <button
                                    onClick={handleCopyEmail}
                                    className="group flex items-center gap-3 text-xl md:text-2xl text-foreground hover:text-muted transition-colors border-b border-border pb-1 text-left w-fit"
                                >
                                    {copied ? (
                                        <span className="text-green-500 font-mono tracking-tight flex items-center gap-2">
                                            <Check size={20} /> COPIED TO CLIPBOARD
                                        </span>
                                    ) : (
                                        <>
                                            <TextScramble text={PORTFOLIO_DATA.email} />
                                            <Copy size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted" />
                                        </>
                                    )}
                                </button>
                            </div>

                            <div>
                                <h3 className="text-sm font-mono text-muted mb-4 uppercase">Socials</h3>
                                <div className="flex flex-wrap gap-4">
                                    {SOCIALS.map((social) => (
                                        <SocialIcon key={social.platform} social={social} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="md:w-1/2 md:pt-12">
                        <form className="space-y-8 max-w-md ml-auto" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-4">
                                <label className="text-sm font-mono text-muted uppercase">Your Name</label>
                                <Input placeholder="ENTER YOUR NAME" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-mono text-muted uppercase">Email Address</label>
                                <Input type="email" placeholder="ENTER YOUR EMAIL" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-mono text-muted uppercase">Message</label>
                                <Textarea placeholder="WHAT'S ON YOUR MIND?" className="min-h-[150px]" />
                            </div>

                            {/* Enhanced Button: Smoother background, subtle scale on hover */}
                            <Button
                                size="lg"
                                className="
                                    w-full bg-foreground text-background 
                                    hover:bg-zinc-200 dark:hover:bg-zinc-300
                                    transition-all duration-500 ease-out
                                    font-bold uppercase tracking-wider
                                    hover:scale-[1.02] active:scale-[0.98]
                                    hover:shadow-lg
                                "
                            >
                                Send Message
                            </Button>
                        </form>
                    </div>

                </div>

                <div className="mt-32 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-muted font-mono text-xs">
                    <span>© {new Date().getFullYear()} {PORTFOLIO_DATA.name.toUpperCase()}</span>
                    <span>INDIA</span>
                    <span>DESIGNED & ENGINEERED</span>
                </div>
            </div>
        </section>
    );
};