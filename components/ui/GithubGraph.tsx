import React, { useEffect, useState } from 'react';
import { ActivityCalendar, Activity, ThemeInput } from 'react-activity-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export const GithubGraph: React.FC = () => {
    const [contributionData, setContributionData] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalContributions, setTotalContributions] = useState(0);

    const username = "SATISH-JALAN";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
                const data = await response.json();

                if (data && data.contributions) {
                    setContributionData(data.contributions);
                    // Calculate total based on the fetched data logic if needed, 
                    // or the API typically returns total too, but let's sum it up manually to be safe
                    const total = data.contributions.reduce((acc: number, curr: Activity) => acc + curr.count, 0);
                    setTotalContributions(total);
                }
            } catch (error) {
                console.error("Error fetching GitHub data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const theme: ThemeInput = {
        light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
        dark: ['rgba(255, 255, 255, 0.05)', '#333', '#555', '#777', '#fff'],
    };

    // Custom dark theme palette matching the design
    // 0: bg-foreground/5 (which is roughly #27272a or similar depending on theme)
    // Levels 1-4: Progressive brightness
    const explicitTheme: ThemeInput = {
        light: ['#e0e0e0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: [
            'rgba(255, 255, 255, 0.05)', // level 0 (empty)
            '#3f3f46',                   // level 1 (zinc-700)
            '#71717a',                   // level 2 (zinc-500)
            '#a1a1aa',                   // level 3 (zinc-400)
            '#ffffff'                    // level 4 (white)
        ],
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-end">
                <div className="text-xs font-mono text-muted">
                    {loading ? (
                        <span className="animate-pulse">Loading data...</span>
                    ) : (
                        <>
                            <span className="text-foreground font-bold">{totalContributions}</span> contributions in the last year
                        </>
                    )}
                </div>

                {/* Legend is handled by the library internally or we can keep custom one if we hide library's */}
            </div>

            <div className="w-full overflow-hidden relative">
                {/* Mask for right edge fade usually */}
                <div className="overflow-x-auto pb-2 no-scrollbar mask-gradient-right">
                    {loading ? (
                        <div className="h-[140px] w-full animate-pulse bg-foreground/5 rounded-sm"></div>
                    ) : (
                        <ActivityCalendar
                            data={contributionData}
                            theme={explicitTheme}
                            blockSize={12}
                            blockMargin={4}
                            fontSize={12}
                            showWeekdayLabels={false} // Hide row labels if you want minimal look, or true
                            hideColorLegend={true}
                            renderBlock={(block, activity) => (
                                React.cloneElement(block, {
                                    'data-tooltip-id': 'react-tooltip',
                                    'data-tooltip-content': `${activity.count} contributions on ${activity.date}`,
                                    className: "hover:scale-125 transition-transform duration-200 cursor-pointer rounded-[2px]"
                                })
                            )}
                        />
                    )}
                    <ReactTooltip id="react-tooltip" className="z-50 !bg-zinc-900 !text-white !text-xs !py-1 !px-2 !rounded-md" />
                </div>
            </div>
        </div>
    );
};