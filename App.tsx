import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Tools from './components/Tools';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import { ThemeProvider } from './components/ThemeContext';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'tools'>('home');
  const [targetSection, setTargetSection] = useState<string | null>(null);

  const handleNavigate = (view: 'home' | 'tools', sectionId?: string) => {
    setCurrentView(view);
    if (sectionId) {
      setTargetSection(sectionId);
    } else {
      // Scroll to top if just changing views without a specific section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle scrolling to specific section after view change ensures DOM is ready
  useEffect(() => {
    if (currentView === 'home' && targetSection) {
      const timer = setTimeout(() => {
        const element = document.querySelector(targetSection);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
        setTargetSection(null);
      }, 100);
      return () => clearTimeout(timer);
    } else if (currentView === 'tools' && !targetSection) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView, targetSection]);

  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background font-sans text-slate-900 dark:text-slate-200 selection:bg-secondary selection:text-white transition-colors duration-300">
        <Header currentView={currentView} onNavigate={handleNavigate} />
        
        {currentView === 'home' ? (
          <div className="animate-in fade-in duration-500">
            <Hero />
            <Services />
            <Experience />
            <Skills />
            <Education />
            <Contact />
          </div>
        ) : (
          <div className="pt-20 animate-in slide-in-from-right duration-500">
            <Tools onBack={() => handleNavigate('home')} />
          </div>
        )}
        
        <AIChat />
      </main>
    </ThemeProvider>
  );
}

export default App;