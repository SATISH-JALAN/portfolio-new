import React, { useEffect } from 'react';

export const Neko: React.FC = () => {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Check if neko script is already present
        const existingScript = document.querySelector('script[src*="neko.js"]');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://louisabraham.github.io/nekojs/neko.js';
            script.setAttribute('data-autostart', 'true');
            script.async = true;
            document.body.appendChild(script);
        }

        return () => {
            // Remove neko element if component unmounts
            const nekoEl = document.getElementById('neko') || document.querySelector('.neko');
            if (nekoEl) {
                nekoEl.remove();
            }
        };
    }, []);

    return null;
};
