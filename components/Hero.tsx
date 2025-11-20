import React from 'react';
import { ArrowRight, Briefcase, MapPin, Mail, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="hero" className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-background transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]"></div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-[-10%] md:left-[10%] w-96 h-96 bg-primary/30 rounded-full mix-blend-screen filter blur-[128px] opacity-50 animate-blob"></div>
            <div className="absolute top-40 right-[-10%] md:right-[10%] w-96 h-96 bg-secondary/30 rounded-full mix-blend-screen filter blur-[128px] opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-[20%] w-96 h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm text-secondary text-sm font-medium mb-8 animate-fade-in-up shadow-lg shadow-purple-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            Available for Data & Analytics Roles
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1] animate-fade-in-up [animation-delay:200ms]">
            Turning Complex Data into <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent animate-gradient-x">Business Growth</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:400ms]">
            {PERSONAL_INFO.summary}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up [animation-delay:600ms]">
            <a 
              href="#contact" 
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-secondary to-primary text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1"
            >
              Contact Me <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </a>
            <a 
              href="#services" 
              onClick={(e) => handleScrollTo(e, '#services')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-semibold hover:bg-slate-50 dark:hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-sm shadow-sm"
            >
              View Services <Briefcase size={20} />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-slate-500 dark:text-slate-400 text-sm font-medium border-t border-slate-200 dark:border-white/5 pt-8 max-w-3xl mx-auto animate-fade-in-up [animation-delay:800ms]">
             <div className="flex items-center gap-2 hover:text-secondary transition-colors">
                <MapPin size={18} className="text-secondary" />
                {PERSONAL_INFO.location}
             </div>
             <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Mail size={18} className="text-secondary" />
                {PERSONAL_INFO.email}
             </a>
             <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Phone size={18} className="text-secondary" />
                {PERSONAL_INFO.phone}
             </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;