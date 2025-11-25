
import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { Mail, Phone, MapPin, Linkedin, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-surface rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-black/40 border border-slate-200 dark:border-white/5">
          <div className="grid lg:grid-cols-2">
            
            {/* Contact Info */}
            <div className="p-10 md:p-16 flex flex-col justify-center lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Let's Work Together</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg leading-relaxed">
                I am currently available for opportunities in Data Reporting, Visualization, and MIS roles. 
                Whether you need a website built or data analyzed, I'm here to help.
              </p>
              
              <div className="space-y-6 mb-12">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 group p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/5">
                  <div className="p-4 bg-slate-100 dark:bg-white/5 text-secondary rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Email Me</div>
                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-200">{PERSONAL_INFO.email}</div>
                  </div>
                </a>
                
                <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-4 group p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/5">
                   <div className="p-4 bg-slate-100 dark:bg-white/5 text-secondary rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Call Me</div>
                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-200">{PERSONAL_INFO.phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 group p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/5">
                   <div className="p-4 bg-slate-100 dark:bg-white/5 text-secondary rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Location</div>
                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-200">{PERSONAL_INFO.location}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Connect Instantly</h3>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://www.linkedin.com/in/rajesh-kumar-sah/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-[#0077B5]/20 text-[#0077B5] border border-[#0077B5]/30 rounded-full hover:bg-[#0077B5] hover:text-white transition-all"
                  >
                      <Linkedin size={20} />
                      <span className="font-medium">LinkedIn</span>
                  </a>
                  
                  <a 
                    href="https://wa.me/9779815855166" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 rounded-full hover:bg-[#25D366] hover:text-white transition-all"
                  >
                      <MessageCircle size={20} />
                      <span className="font-medium">WhatsApp</span>
                  </a>

                  <a 
                    href="viber://chat?number=%2B9779815855166" 
                    className="flex items-center gap-2 px-6 py-3 bg-[#7360F2]/20 text-[#7360F2] border border-[#7360F2]/30 rounded-full hover:bg-[#7360F2] hover:text-white transition-all"
                  >
                      <Phone size={20} />
                      <span className="font-medium">Viber</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Decorative Side - Data Dashboard Image */}
            <div className="relative h-64 lg:h-auto bg-slate-900 lg:order-2 overflow-hidden group">
               {/* Background Image */}
               <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop")' }}></div>
               
               <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-primary/60 to-background/90 mix-blend-multiply"></div>
               
               <div className="absolute inset-0 flex items-center justify-center p-12">
                 <div className="text-center relative z-10 animate-fade-in-up">
                    <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-6 border border-white/20 shadow-2xl">
                        <MessageCircle size={48} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Have a project in mind?</h3>
                    <p className="text-slate-100 font-medium drop-shadow-sm max-w-sm mx-auto">
                        I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                    </p>
                 </div>
               </div>
            </div>

          </div>
        </div>
        
        <footer className="mt-20 text-center">
            <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} Rajesh Kumar Sah. All rights reserved.
            </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
