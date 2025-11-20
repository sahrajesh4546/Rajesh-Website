import React, { useState, useEffect } from 'react';
import { Menu, X, BarChart3, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface HeaderProps {
  currentView: 'home' | 'tools';
  onNavigate: (view: 'home' | 'tools', sectionId?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'AI Tools', href: 'tools' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { name: string; href: string }) => {
    e.preventDefault();
    setIsOpen(false);

    if (item.name === 'AI Tools') {
      onNavigate('tools');
    } else {
      onNavigate('home', item.href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    onNavigate('home', '#hero');
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-background/80 backdrop-blur-lg border-b border-slate-200 dark:border-white/5 shadow-lg dark:shadow-black/20 shadow-slate-200/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <a 
            href="#" 
            onClick={handleLogoClick}
            className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xl tracking-tight"
          >
            <div className="p-2 bg-gradient-to-br from-secondary to-primary rounded-xl shadow-lg shadow-purple-500/20 text-white">
              <BarChart3 size={24} />
            </div>
            <span>RAJESH<span className="text-secondary">.DATA</span></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`text-sm font-medium transition-all relative group ${
                  (currentView === 'tools' && item.name === 'AI Tools') || (currentView === 'home' && item.name === 'Home' && !scrolled)
                    ? 'text-secondary'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:scale-105'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-secondary to-primary transition-all ${
                   (currentView === 'tools' && item.name === 'AI Tools') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
            ))}
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-surface border-t border-slate-200 dark:border-white/5 p-4 shadow-2xl absolute w-full backdrop-blur-xl">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-base font-medium px-4 py-3 rounded-lg transition-all ${
                  (currentView === 'tools' && item.name === 'AI Tools')
                  ? 'bg-secondary/10 text-secondary'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;