import React from 'react';

export const GithubGraph: React.FC = () => {
    // Generate simulated contribution data
    // We will render columns (weeks) and rows (days)
    const weeks = 52;
    const days = 7;
    
    // Create a 2D array representation for cleaner rendering
    const grid = Array.from({ length: weeks }, () => 
        Array.from({ length: days }, () => {
            const rand = Math.random();
            if (rand > 0.92) return 4;
            if (rand > 0.82) return 3;
            if (rand > 0.65) return 2;
            if (rand > 0.45) return 1;
            return 0;
        })
    );

    const getSquareColor = (level: number) => {
        switch(level) {
            case 1: return "bg-zinc-800";
            case 2: return "bg-zinc-700";
            case 3: return "bg-zinc-500";
            case 4: return "bg-white";
            default: return "bg-zinc-900/50";
        }
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-end">
                <div className="text-xs font-mono text-zinc-400">
                    <span className="text-white font-bold">1,240</span> contributions in the last year
                </div>
                <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-zinc-600">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-[1px] bg-zinc-900/50"></div>
                        <div className="w-2.5 h-2.5 rounded-[1px] bg-zinc-800"></div>
                        <div className="w-2.5 h-2.5 rounded-[1px] bg-zinc-700"></div>
                        <div className="w-2.5 h-2.5 rounded-[1px] bg-zinc-500"></div>
                        <div className="w-2.5 h-2.5 rounded-[1px] bg-white"></div>
                    </div>
                    <span>More</span>
                </div>
            </div>

            <div className="w-full overflow-hidden relative">
                <div className="flex gap-[3px] overflow-x-auto pb-2 no-scrollbar mask-gradient-right">
                    {grid.map((week, wIndex) => (
                        <div key={wIndex} className="flex flex-col gap-[3px]">
                            {week.map((level, dIndex) => (
                                <div 
                                    key={`${wIndex}-${dIndex}`} 
                                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[1px] ${getSquareColor(level)} hover:scale-125 hover:z-10 transition-transform duration-200 cursor-none`}
                                    title={`${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][dIndex]} - ${level} contributions`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};