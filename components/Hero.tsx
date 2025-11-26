import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeroProps {
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = translations[language].hero;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-slate-900 overflow-hidden">
      {/* Background Image with Parallax & Zoom Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1920&q=80"
          alt="Car on coastal road"
          style={{
            transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0005})`,
          }}
          className="w-full h-full object-cover opacity-60 will-change-transform transition-transform duration-75 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-48 md:pb-32">
        <div className="lg:w-2/3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
            {t.title} <span className="text-teal-400">{t.titleHighlight}</span> {t.titleSuffix}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 md:mb-10 max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Booking Widget */}
        <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-8 lg:flex lg:items-end lg:space-x-4 max-w-4xl transform translate-y-0 lg:translate-y-12 border border-slate-100 relative z-10">
          <div className="flex-1 mb-4 lg:mb-0 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">{t.pickupLoc}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <select className="block w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white appearance-none text-slate-900 text-sm md:text-base">
                  <option>{t.locations.airport}</option>
                  <option>{t.locations.train}</option>
                  <option>{t.locations.benidorm}</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">{t.pickupDate}</label>
              <input 
                type="date" 
                className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 text-sm md:text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">{t.returnDate}</label>
              <input 
                type="date" 
                className="block w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 text-sm md:text-base"
              />
            </div>
          </div>

          <div className="lg:w-48 mt-4 lg:mt-0">
            <button className="w-full bg-teal-600 text-white py-3.5 rounded-lg font-bold text-lg hover:bg-teal-700 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-teal-600/30 flex items-center justify-center">
              <span>{t.search}</span>
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative curved bottom */}
      <div className="absolute bottom-0 w-full z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[40px] md:h-[100px] text-slate-50 fill-current">
          <path d="M0 120L1440 120L1440 0C1440 0 1082.5 88 720 88C357.5 88 0 0 0 0L0 120Z" />
        </svg>
      </div>
    </div>
  );
};