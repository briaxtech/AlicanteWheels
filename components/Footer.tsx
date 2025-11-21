import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language].footer;

  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span className="font-bold text-2xl tracking-tight">
                BrIAx<span className="text-teal-500">Wheels</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              {t.about}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">{t.locationsTitle}</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>{t.locs.alc}</li>
              <li>{t.locs.train}</li>
              <li>{t.locs.ben}</li>
              <li>{t.locs.tor}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t.contactTitle}</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +34 965 000 000
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                reservations@alicantewheels.es
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {t.rights}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">{t.privacy}</a>
            <a href="#" className="hover:text-white transition">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};