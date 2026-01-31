
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface SoundContextType {
    isMuted: boolean;
    toggleSound: () => void;
    playHover: () => void;
    playClick: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(true);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Initialize AudioContext lazily
    const initAudio = () => {
        if (!audioContextRef.current) {
            const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                audioContextRef.current = new AudioContextClass();
            }
        }
    };

    const toggleSound = () => {
        initAudio();
        
        if (isMuted) {
            // Unmuting
            if (audioContextRef.current?.state === 'suspended') {
                audioContextRef.current.resume();
            }
            playForcedClick(); // Play confirmation sound immediately
        }
        setIsMuted(!isMuted);
    };

    // Helper to play sound regardless of current mute state (used for the unmute action itself)
    const playForcedClick = () => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    };

    const playHover = () => {
        if (isMuted || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        // High pitched short blip
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    };

    const playClick = () => {
        if (isMuted || !audioContextRef.current) return;
        const ctx = audioContextRef.current;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        // Lower pitched "thock"
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    };

    return (
        <SoundContext.Provider value={{ isMuted, toggleSound, playHover, playClick }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};
