import React from 'react';
import { EXPERIENCES } from '../constants';
import { Calendar } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-background relative transition-colors duration-300">
       {/* Decorative blurred circle */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen filter blur-[128px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-secondary tracking-widest uppercase mb-2">Career Path</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Professional Experience</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mt-4 md:mt-0">Proven track record in data reporting & sales operations.</p>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-white/10 ml-4 md:ml-10 space-y-12">
          {EXPERIENCES.map((job, index) => (
            <div key={job.id} className="relative pl-8 md:pl-12 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-background bg-secondary shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover:scale-125 transition-transform duration-300"></div>
              
              <div className="grid md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-4">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-secondary transition-colors">{job.role}</h4>
                  <p className="text-primary font-medium text-lg mb-2">{job.company}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-sm">
                    <Calendar size={14} />
                    {job.period}
                  </div>
                </div>
                <div className="md:col-span-8 bg-surface rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all shadow-lg shadow-slate-200/50 dark:shadow-black/20">
                   <ul className="space-y-3">
                     {job.description.map((desc, i) => (
                       <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                         <div className="mt-2 min-w-[6px] h-1.5 rounded-full bg-secondary"></div>
                         <span>{desc}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;