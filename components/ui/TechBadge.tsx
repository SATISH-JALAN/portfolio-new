import React from 'react';
import { Badge } from './Elements';
import { Code2, Cpu, Database, Globe, Layers, Layout, Terminal, LucideIcon } from 'lucide-react';

interface TechBadgeProps {
    name: string;
}

// Custom SVG Icon Components using official Simple Icons paths
const JavaScriptIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="#F7DF1E" className="w-[1em] h-[1em]" {...props}>
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
    </svg>
);

const NodeJsIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="#5FA04E" className="w-[1em] h-[1em]" {...props}>
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
    </svg>
);

const RustIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[1em] h-[1em]" {...props}>
        <path d="M23.8346 11.7033l-1.0073-.6236a13.7268 13.7268 0 00-.0283-.2936l.8656-.8069a.3483.3483 0 00-.1154-.578l-1.1066-.414a8.4958 8.4958 0 00-.087-.2856l.6904-.9587a.3462.3462 0 00-.2257-.5446l-1.1663-.1894a9.3574 9.3574 0 00-.1407-.2622l.49-1.0761a.3437.3437 0 00-.0274-.3361.3486.3486 0 00-.3006-.154l-1.1845.0416a6.7444 6.7444 0 00-.1873-.2268l.2723-1.153a.3472.3472 0 00-.417-.4172l-1.1532.2724a14.0183 14.0183 0 00-.2278-.1873l.0415-1.1845a.3442.3442 0 00-.49-.328l-1.076.491c-.0872-.0476-.1742-.0952-.2623-.1407l-.1903-1.1673A.3483.3483 0 0016.256.955l-.9597.6905a8.4867 8.4867 0 00-.2855-.086l-.414-1.1066a.3483.3483 0 00-.5781-.1154l-.8069.8666a9.2936 9.2936 0 00-.2936-.0284L12.2946.1683a.3462.3462 0 00-.5892 0l-.6236 1.0073a13.7383 13.7383 0 00-.2936.0284L9.9803.3374a.3462.3462 0 00-.578.1154l-.4141 1.1065c-.0962.0274-.1903.0567-.2855.086L7.744.955a.3483.3483 0 00-.5447.2258L7.009 2.348a9.3574 9.3574 0 00-.2622.1407l-1.0762-.491a.3462.3462 0 00-.49.328l.0416 1.1845a7.9826 7.9826 0 00-.2278.1873L3.8413 3.425a.3472.3472 0 00-.4171.4171l.2713 1.1531c-.0628.075-.1255.1509-.1863.2268l-1.1845-.0415a.3462.3462 0 00-.328.49l.491 1.0761a9.167 9.167 0 00-.1407.2622l-1.1662.1894a.3483.3483 0 00-.2258.5446l.6904.9587a13.303 13.303 0 00-.087.2855l-1.1065.414a.3483.3483 0 00-.1155.5781l.8656.807a9.2936 9.2936 0 00-.0283.2935l-1.0073.6236a.3442.3442 0 000 .5892l1.0073.6236c.008.0982.0182.1964.0283.2936l-.8656.8079a.3462.3462 0 00.1155.578l1.1065.4141c.0273.0962.0567.1914.087.2855l-.6904.9587a.3452.3452 0 00.2268.5447l1.1662.1893c.0456.088.0922.1751.1408.2622l-.491 1.0762a.3462.3462 0 00.328.49l1.1834-.0415c.0618.0769.1235.1528.1873.2277l-.2713 1.1541a.3462.3462 0 00.4171.4161l1.153-.2713c.075.0638.151.1255.2279.1863l-.0415 1.1845a.3442.3442 0 00.49.327l1.0761-.49c.087.0486.1741.0951.2622.1407l.1903 1.1662a.3483.3483 0 00.5447.2268l.9587-.6904a9.299 9.299 0 00.2855.087l.414 1.1066a.3452.3452 0 00.5781.1154l.8079-.8656c.0972.0111.1954.0203.2936.0294l.6236 1.0073a.3472.3472 0 00.5892 0l.6236-1.0073c.0982-.0091.1964-.0183.2936-.0294l.8069.8656a.3483.3483 0 00.578-.1154l.4141-1.1066a8.4626 8.4626 0 00.2855-.087l.9587.6904a.3452.3452 0 00.5447-.2268l.1903-1.1662c.088-.0456.1751-.0931.2622-.1407l1.0762.49a.3472.3472 0 00.49-.327l-.0415-1.1845a6.7267 6.7267 0 00.2267-.1863l1.1531.2713a.3472.3472 0 00.4171-.416l-.2713-1.1542c.0628-.0749.1255-.1508.1863-.2278l1.1845.0415a.3442.3442 0 00.328-.49l-.49-1.076c.0475-.0872.0951-.1742.1407-.2623l1.1662-.1893a.3483.3483 0 00.2258-.5447l-.6904-.9587.087-.2855 1.1066-.414a.3462.3462 0 00.1154-.5781l-.8656-.8079c.0101-.0972.0202-.1954.0283-.2936l1.0073-.6236a.3442.3442 0 000-.5892zm-6.7413 8.3551a.7138.7138 0 01.2986-1.396.714.714 0 11-.2997 1.396zm-.3422-2.3142a.649.649 0 00-.7715.5l-.3573 1.6685c-1.1035.501-2.3285.7795-3.6193.7795a8.7368 8.7368 0 01-3.6951-.814l-.3574-1.6684a.648.648 0 00-.7714-.499l-1.473.3158a8.7216 8.7216 0 01-.7613-.898h7.1676c.081 0 .1356-.0141.1356-.088v-2.536c0-.074-.0536-.0881-.1356-.0881h-2.0966v-1.6077h2.2677c.2065 0 1.1065.0587 1.394 1.2088.0901.3533.2875 1.5044.4232 1.8729.1346.413.6833 1.2381 1.2685 1.2381h3.5716a.7492.7492 0 00.1296-.0131 8.7874 8.7874 0 01-.8119.9526zM6.8369 20.024a.714.714 0 11-.2997-1.396.714.714 0 01.2997 1.396zM4.1177 8.9972a.7137.7137 0 11-1.304.5791.7137.7137 0 011.304-.579zm-.8352 1.9813l1.5347-.6824a.65.65 0 00.33-.8585l-.3158-.7147h1.2432v5.6025H3.5669a8.7753 8.7753 0 01-.2834-3.348zm6.7343-.5437V8.7836h2.9601c.153 0 1.0792.1772 1.0792.8697 0 .575-.7107.7815-1.2948.7815zm10.7574 1.4862c0 .2187-.008.4363-.0243.651h-.9c-.09 0-.1265.0586-.1265.1477v.413c0 .973-.5487 1.1846-1.0296 1.2382-.4576.0517-.9648-.1913-1.0275-.4717-.2704-1.5186-.7198-1.8436-1.4305-2.4034.8817-.5599 1.799-1.386 1.799-2.4915 0-1.1936-.819-1.9458-1.3769-2.3153-.7825-.5163-1.6491-.6195-1.883-.6195H5.4682a8.7651 8.7651 0 014.907-2.7699l1.0974 1.151a.648.648 0 00.9182.0213l1.227-1.1743a8.7753 8.7753 0 016.0044 4.2762l-.8403 1.8982a.652.652 0 00.33.8585l1.6178.7188c.0283.2875.0425.577.0425.8717zm-9.3006-9.5993a.7128.7128 0 11.984 1.0316.7137.7137 0 01-.984-1.0316zm8.3389 6.71a.7107.7107 0 01.9395-.3625.7137.7137 0 11-.9405.3635z" />
    </svg>
);

const GsapIcon = (props: any) => (
    <svg viewBox="0 0 24 24" className="w-[1.5em] h-[1.5em]" {...props}>
        <rect x="0" y="4" width="24" height="16" rx="3" ry="3" fill="#88CE02" />
        <text x="12" y="15" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold" fontFamily="Arial, sans-serif">GSAP</text>
    </svg>
);

// Combined React + Next.js icon
const ReactNextIcon = (props: any) => (
    <div className="flex items-center gap-0.5" {...props}>
        {/* React Logo */}
        <svg viewBox="0 0 24 24" fill="#61DAFB" className="w-[1.1em] h-[1.1em]">
            <circle cx="12" cy="12" r="2.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)" />
        </svg>
        <span className="text-[0.6em] text-muted-foreground">/</span>
        {/* Next.js Logo */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[1.1em] h-[1.1em]">
            <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
        </svg>
    </div>
);

const WebSocketIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]" {...props}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
        <path d="m12 5-7 7 7 7" />
    </svg>
);

const ICON_MAP: Record<string, React.FC<any> | null> = {
    // Exact matches for custom SVG icons
    'javascript': JavaScriptIcon,
    'node.js': NodeJsIcon,
    'nodejs': NodeJsIcon,
    'rust': RustIcon,
    'gsap': GsapIcon,
    'react': ReactNextIcon,
    'react / next.js': ReactNextIcon,
    'next.js': ReactNextIcon,
    'nextjs': ReactNextIcon,
    'websocket': WebSocketIcon,
    'socket.io': WebSocketIcon,
};

// Devicon class mapping
const DEVICON_MAP: Record<string, string> = {
    'typescript': 'devicon-typescript-plain colored',
    'tailwind': 'devicon-tailwindcss-original colored',
    'tailwindcss': 'devicon-tailwindcss-original colored',
    'firebase': 'devicon-firebase-plain colored',
    'mongodb': 'devicon-mongodb-plain colored',
    'postgresql': 'devicon-postgresql-plain colored',
    'postgres': 'devicon-postgresql-plain colored',
    'redis': 'devicon-redis-plain colored',
    'docker': 'devicon-docker-plain colored',
    'solidity': 'devicon-solidity-plain text-gray-300',
    'express': 'devicon-express-original text-white',
    'express.js': 'devicon-express-original text-white',
    'expressjs': 'devicon-express-original text-white',
    'prisma': 'devicon-prisma-original colored',
    'git': 'devicon-git-plain colored',
    'python': 'devicon-python-plain colored',
    'java': 'devicon-java-plain colored',
    'vite': 'devicon-vitejs-plain colored',
    'three.js': 'devicon-threejs-original colored',
    'threejs': 'devicon-threejs-original colored',
    'figma': 'devicon-figma-plain colored',
    'flutter': 'devicon-flutter-plain colored',
    'dart': 'devicon-dart-plain colored',
    'mysql': 'devicon-mysql-plain colored',
    'android': 'devicon-android-plain colored',
    'linux': 'devicon-linux-plain text-white',
};

// Fallback Lucide icons for special cases
const FALLBACK_MAP: Record<string, LucideIcon> = {
    'gemini': Cpu,
    'shadcn': Layout,
    'framer': Layers,
    'zod': Layers,
    'stellar': Globe,
    'soroban': Globe,
    'freighter': Globe,
};

export const getTechIconInfo = (name: string): { iconClass: string | null, FallbackIcon: LucideIcon | React.FC<any> } => {
    const normalized = name.toLowerCase().trim();

    // 1. Check for custom SVG icon (exact match)
    if (ICON_MAP[normalized]) {
        return { iconClass: null, FallbackIcon: ICON_MAP[normalized]! };
    }

    // 2. Check for Devicon class
    if (DEVICON_MAP[normalized]) {
        return { iconClass: DEVICON_MAP[normalized], FallbackIcon: Code2 };
    }

    // 3. Check for Lucide fallback
    for (const [key, icon] of Object.entries(FALLBACK_MAP)) {
        if (normalized.includes(key)) {
            return { iconClass: null, FallbackIcon: icon };
        }
    }

    // 4. Default fallback
    return { iconClass: null, FallbackIcon: Code2 };
};

export const TechBadge: React.FC<TechBadgeProps> = ({ name }) => {
    const { iconClass, FallbackIcon } = getTechIconInfo(name);

    return (
        <Badge className="bg-muted/10 hover:bg-muted/20 text-foreground/80 hover:text-foreground border-border/50 transition-colors flex items-center gap-1.5 px-3 py-1.5">
            {iconClass ? (
                <i className={`${iconClass} text-lg`} />
            ) : (
                <FallbackIcon size={14} className="opacity-70" />
            )}
            <span className="font-mono text-xs">{name}</span>
        </Badge>
    );
};
