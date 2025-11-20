import React from 'react';
import { SKILLS } from '../constants';
import { CheckCircle2 } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-background relative overflow-hidden transition-colors duration-300">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-secondary tracking-widest uppercase mb-2">Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Skills & Capabilities</h3>
          <p className="text-slate-600 dark:text-slate-400">A comprehensive toolset developed through years of data management and organizational operations.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SKILLS.map((skillGroup, idx) => (
            <div key={idx} className="bg-surface border border-slate-200 dark:border-white/5 rounded-2xl p-8 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors hover:border-secondary/30 group shadow-lg dark:shadow-none shadow-slate-200/50">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-white/5 pb-4 group-hover:text-secondary transition-colors">{skillGroup.category}</h4>
              <ul className="space-y-4">
                {skillGroup.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-secondary" />
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Visual Decor */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-30">
           {['Excel', 'Data Analysis', 'Reporting', 'Management'].map((tag, i) => (
              <div key={i} className="text-center py-8 border border-slate-300 dark:border-white/10 rounded-xl bg-slate-100 dark:bg-white/5">
                 <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">0{i+1}</div>
                 <div className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-sm">{tag}</div>
              </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;