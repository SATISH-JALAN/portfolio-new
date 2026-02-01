
import React, { useState, useEffect, useRef } from 'react';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { YearReview } from './components/sections/YearReview';
import { Goals2026 } from './components/pages/Goals2026';
import { CursorTrail } from './components/CursorTrail';
import { ScrollToTop } from './components/ScrollToTop';
import { FloatingNavbar } from './components/FloatingNavbar';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { Preloader } from './components/Preloader';
import { TextScramble } from './components/ui/TextScramble';
import { TimeWidget } from './components/ui/TimeWidget';
import { PORTFOLIO_DATA } from './constants';
import gsap from 'gsap';

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'goals'>('home');
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Lock scroll during loading or modal open
  useEffect(() => {
    if (loading || isProjectModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [loading, isProjectModalOpen]);

  // Initial Loading Scroll Lock
  useEffect(() => {
    if (loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

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

  const handleNavigate = (view: 'wrap' | 'goals') => {
    // Fade out effect could be added here if we wrapped content in a ref
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  return (
    <>
      {/* Show Preloader until loading is false */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className={`min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground transition-colors duration-500 ${loading ? 'h-screen overflow-hidden pointer-events-none opacity-0' : 'opacity-100'}`}>

        {/* Scroll Progress Bar - Only on Home */}
        {currentView === 'home' && (
          <div className="fixed top-0 left-0 w-full h-1 z-[60] mix-blend-difference pointer-events-none">
            <div ref={progressBarRef} className="h-full bg-white w-full scale-x-0" />
          </div>
        )}

        <CursorTrail />

        {/* Only show scroll to top on home */}
        {currentView === 'home' && <ScrollToTop />}

        {/* Navbar hidden on sub-pages for "distinct page" feel */}
        {currentView === 'home' && <FloatingNavbar hidden={isProjectModalOpen} />}

        {/* Theme Toggle - Hidden when modal is open OR when on sub-pages (optional, but keeping it visible on sub-pages is better UX) */}
        <ThemeToggle hidden={isProjectModalOpen} />



        {/* Top Bar - Absolute Position (Scrolls with page) */}
        <nav className="absolute top-0 left-0 right-0 z-40 py-6 pointer-events-none">
          <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
            <button onClick={() => setCurrentView('home')} className="font-display font-bold text-xl tracking-tight text-foreground uppercase pointer-events-auto mix-blend-difference group">
              <TextScramble text={PORTFOLIO_DATA.name.split(' ')[0]} />
              <span className="text-muted group-hover:text-accent transition-colors">.</span>
            </button>

            {/* Right side widgets */}
            <div className="hidden md:flex items-center gap-6 pointer-events-auto md:pr-24">
              <TimeWidget />
            </div>
          </div>
        </nav>

        <main className="relative z-10">
          {currentView === 'home' ? (
            <>
              <Hero loading={loading} />
              <About />
              <Projects onModalOpen={setIsProjectModalOpen} />
              <YearReview onNavigate={handleNavigate} />
              <Contact />
            </>
          ) : (
            <Goals2026 onBack={handleBack} />
          )}
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
