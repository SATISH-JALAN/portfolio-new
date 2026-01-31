import React, { useState, useEffect } from 'react';

export const TimeWidget: React.FC = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'Asia/Kolkata'
            }).format(now);
            setTime(timeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-3 font-mono text-[10px] text-muted tracking-widest pointer-events-auto mix-blend-difference group cursor-help">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <div className="flex flex-col items-start leading-none gap-1">
                <span className="text-foreground">{time} <span className="text-zinc-500">IST</span></span>
                <span className="h-0 overflow-hidden group-hover:h-auto group-hover:overflow-visible transition-all duration-300 opacity-0 group-hover:opacity-100 absolute top-full mt-2">
                    LOCAL TIME
                </span>
            </div>
        </div>
    );
};