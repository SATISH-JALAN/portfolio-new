
import React, { forwardRef } from 'react';
import { useSound } from '../../context/SoundContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
    children, 
    className = '', 
    variant = 'primary', 
    size = 'md',
    onMouseEnter,
    onClick,
    ...props 
}, ref) => {
    const { playHover, playClick } = useSound();

    const baseStyles = "inline-flex items-center justify-center font-mono text-sm transition-all duration-500 focus:outline-none disabled:opacity-50 active:scale-95";
    
    // Updated to use CSS variables
    const variants = {
        primary: "bg-foreground text-background hover:bg-muted/80 hover:shadow-[0_0_20px_rgba(120,120,120,0.3)] border border-transparent",
        outline: "border border-border text-foreground bg-transparent hover:bg-foreground hover:text-background hover:border-foreground",
        ghost: "text-muted hover:text-foreground hover:bg-foreground/5"
    };

    const sizes = {
        sm: "h-8 px-3 text-xs rounded-sm",
        md: "h-10 px-6 rounded-sm",
        lg: "h-12 px-8 text-base rounded-sm"
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        playHover();
        if (onMouseEnter) onMouseEnter(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        playClick();
        if (onClick) onClick(e);
    };

    return (
        <button 
            ref={ref}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
    <div className={`border border-border bg-background/50 ${className}`} {...props}>
        {children}
    </div>
);

export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, className = '', ...props }) => (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-mono border border-border text-muted ${className}`} {...props}>
        {children}
    </span>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
    <div className="relative group">
        <input
            className={`
                flex h-14 w-full border-b border-border bg-transparent px-4 py-3 
                text-base text-foreground placeholder:text-muted placeholder:uppercase placeholder:text-xs placeholder:tracking-widest
                focus:outline-none focus:bg-foreground/5 transition-all duration-500 
                disabled:cursor-not-allowed disabled:opacity-50 font-mono relative z-10
                ${className}
            `}
            {...props}
        />
        {/* Animated Bottom Border - Enhanced */}
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-foreground transition-all duration-500 ease-out group-focus-within:w-full group-focus-within:h-[3px] shadow-[0_-2px_15px_rgba(120,120,120,0.3)] z-20" />
        
        {/* Animated Background Glow with Pulse */}
        <div className="absolute inset-0 bg-foreground/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent animate-pulse" />
        </div>
    </div>
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => (
    <div className="relative group">
        <textarea
            className={`
                flex min-h-[120px] w-full border-b border-border bg-transparent px-4 py-3 
                text-base text-foreground placeholder:text-muted placeholder:uppercase placeholder:text-xs placeholder:tracking-widest
                focus:outline-none focus:bg-foreground/5 transition-all duration-500 
                disabled:cursor-not-allowed disabled:opacity-50 font-mono relative z-10
                ${className}
            `}
            {...props}
        />
        {/* Animated Bottom Border - Enhanced */}
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-foreground transition-all duration-500 ease-out group-focus-within:w-full group-focus-within:h-[3px] shadow-[0_-2px_15px_rgba(120,120,120,0.3)] z-20" />
        
        {/* Animated Background Glow with Pulse */}
        <div className="absolute inset-0 bg-foreground/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent animate-pulse" />
        </div>
    </div>
);
