import React, { useState, useEffect, useRef } from 'react';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { YearReview } from './components/sections/YearReview';
import { Contact } from './components/sections/Contact';
import { CursorTrail } from './components/CursorTrail';
import { ScrollToTop } from './components/ScrollToTop';
import { FloatingNavbar } from './components/FloatingNavbar';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { Preloader } from './components/Preloader';
import { TextScramble } from './components/ui/TextScramble';
import { TimeWidget } from './components/ui/TimeWidget';
import { PORTFOLIO_DATA } from './constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Lock scroll during loading or modal open
  useEffect(() => {
    if (loading || isProjectModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [loading, isProjectModalOpen]);

  // Initial Loading Scroll Lock & GSAP Sync
  useEffect(() => {
    if (loading) {
      window.scrollTo(0, 0);
    } else {
      // When loading finishes, the DOM expands from h-screen to full height.
      // We MUST instruct GSAP to recalculate all its trigger positions globally.
      // We use a slight delay to ensure the browser has painted the new layout.
      setTimeout(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.refresh();
      }, 100);
      setTimeout(() => ScrollTrigger.refresh(), 500); // Failsafe for slower mobile paints
    }
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (progressBarRef.current) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height);

        gsap.to(progressBarRef.current, {
          scaleX: scrolled,
          transformOrigin: "left",
          duration: 0.1,
          ease: "none"
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Show Preloader until loading is false */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className={`min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground transition-colors duration-500 ${loading ? 'h-screen overflow-hidden pointer-events-none opacity-0' : 'opacity-100'}`}>

        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-[60] mix-blend-difference pointer-events-none">
          <div ref={progressBarRef} className="h-full bg-white w-full scale-x-0" />
        </div>

        <CursorTrail />

        <ScrollToTop />

        <FloatingNavbar hidden={isProjectModalOpen} />

        <ThemeToggle hidden={isProjectModalOpen} />

        {/* Top Bar - Absolute Position (Scrolls with page) */}
        <nav className="absolute top-0 left-0 right-0 z-40 py-6 pointer-events-none">
          <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
            <button className="font-display font-bold text-xl tracking-tight text-foreground uppercase pointer-events-auto mix-blend-difference group">
              <TextScramble text={PORTFOLIO_DATA.name.split(' ')[0]} />
              <span className="text-muted group-hover:text-accent transition-colors">.</span>
            </button>

            {/* Right side widgets */}
            <div className="hidden md:flex items-center gap-6 pointer-events-auto md:pr-24">
              <TimeWidget />
            </div>
          </div>
        </nav>

        <main className="relative z-10 pb-32 md:pb-40">
          <Hero loading={loading} />
          <Projects onModalOpen={setIsProjectModalOpen} />
          <About />
          <YearReview />
          <Contact />
        </main>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AppContent />
  );
};

export default App;
