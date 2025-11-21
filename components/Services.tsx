import React from 'react';
import { SERVICES } from '../constants';
import { Monitor, Database, Check, ArrowRight, Sparkles, AppWindow, Presentation, FileText, Palette, ArrowLeft } from 'lucide-react';

interface ServicesProps {
  onBack?: () => void;
}

const Services: React.FC<ServicesProps> = ({ onBack }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'web':
        return <Monitor size={32} className="text-secondary" />;
      case 'software':
        return <AppWindow size={32} className="text-secondary" />;
      case 'presentation':
        return <Presentation size={32} className="text-secondary" />;
      case 'form':
        return <FileText size={32} className="text-secondary" />;
      case 'design':
        return <Palette size={32} className="text-secondary" />;
      case 'data':
      default:
        return <Database size={32} className="text-secondary" />;
    }
  };

  const handleContactClick = () => {
      if (onBack) {
          onBack();
          // Wait for navigation then scroll
          setTimeout(() => {
              const element = document.querySelector('#contact');
              if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
              }
          }, 100);
      }
  };

  return (
    <section className="min-h-screen bg-background text-slate-900 dark:text-slate-200 px-4 md:px-6 pb-20 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-12 pt-8">
             <button onClick={onBack} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors font-medium shadow-sm group">
               <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> <span>Back to Portfolio</span>
             </button>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-white/50 dark:bg-white/5 rounded-lg mb-4 backdrop-blur-sm border border-slate-200 dark:border-white/10">
            <Sparkles size={20} className="text-secondary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">Professional Services</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Specialized solutions tailored to your needs. From data analytics to digital presence, I help you achieve your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {SERVICES.map((service) => (
            <div key={service.id} className="group relative bg-surface rounded-3xl p-8 border border-slate-200 dark:border-white/5 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-2 flex flex-col shadow-xl dark:shadow-black/20 shadow-slate-200/50 overflow-hidden">
              
              {/* Glowing Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Top Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

              <div className="flex flex-col h-full relative z-10">
                <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-secondary/20 transition-colors duration-300 border border-slate-100 dark:border-white/5 group-hover:border-secondary/20">
                  {getIcon(service.iconType)}
                </div>
                
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-secondary transition-colors">{service.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed flex-grow text-sm">
                  {service.description}
                </p>

                <div className="bg-slate-50 dark:bg-black/20 rounded-xl p-6 mb-8 border border-slate-100 dark:border-white/5">
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                        <Check size={16} className="text-secondary shrink-0 mt-1" />
                        <span className="text-xs font-medium opacity-90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-white/5">
                    {service.price && (
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Starting from</span>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">{service.price}</span>
                        </div>
                    )}
                    <button 
                      onClick={handleContactClick}
                      className="inline-flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-white/5 hover:bg-secondary dark:hover:bg-secondary text-slate-900 dark:text-white hover:text-white rounded-xl font-semibold transition-all duration-300 text-xs border border-slate-200 dark:border-white/10 hover:border-secondary group-hover:shadow-lg group-hover:shadow-secondary/25"
                    >
                      Get Started <ArrowRight size={16} />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;