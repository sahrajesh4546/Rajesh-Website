import React from 'react';
import { EDUCATION } from '../constants';
import { GraduationCap, Award } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Academic Background</h2>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {EDUCATION.map((edu) => (
            <div key={edu.id} className="bg-surface rounded-2xl p-8 border border-slate-200 dark:border-white/5 flex flex-col items-center text-center hover:border-secondary/50 transition-colors shadow-lg shadow-slate-200/50 dark:shadow-black/20 hover:shadow-secondary/10">
              <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 text-secondary rounded-full flex items-center justify-center mb-6 border border-slate-100 dark:border-white/5">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{edu.degree}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-4">{edu.institution}</p>
              <div className="mt-auto space-y-2">
                 <span className="inline-block px-4 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-sm text-slate-700 dark:text-slate-300 font-semibold">{edu.period}</span>
                 {edu.details && (
                   <div className="text-sm text-secondary font-medium flex items-center justify-center gap-1 pt-2">
                     <Award size={14} />
                     {edu.details}
                   </div>
                 )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;