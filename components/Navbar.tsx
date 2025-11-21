import React, { useState } from 'react';
import { ViewState, Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language].nav;

  const navLinks = [
    { label: t.home, view: ViewState.HOME },
    { label: t.fleet, view: ViewState.FLEET },
    { label: t.contact, view: ViewState.CONTACT },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={() => onNavigate(ViewState.HOME)}
          >
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center mr-3 group-hover:bg-teal-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-800">
              BrIAx<span className="text-teal-600">Wheels</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.view)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentView === link.view 
                    ? 'text-teal-600' 
                    : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            
            <div className="flex items-center space-x-2 text-sm font-semibold">
               <button 
                 onClick={() => setLanguage('en')} 
                 className={`${language === 'en' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'} transition-colors`}
               >
                 EN
               </button>
               <span className="text-slate-300">/</span>
               <button 
                 onClick={() => setLanguage('es')} 
                 className={`${language === 'es' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'} transition-colors`}
               >
                 ES
               </button>
            </div>

            <button className="bg-teal-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-700 transition shadow-lg shadow-teal-600/20">
              {t.book}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
             <div className="flex items-center space-x-2 text-sm font-bold">
               <button 
                 onClick={() => setLanguage('en')} 
                 className={`${language === 'en' ? 'text-teal-600' : 'text-slate-400'}`}
               >
                 EN
               </button>
               <span className="text-slate-300">/</span>
               <button 
                 onClick={() => setLanguage('es')} 
                 className={`${language === 'es' ? 'text-teal-600' : 'text-slate-400'}`}
               >
                 ES
               </button>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.view);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                  currentView === link.view
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4">
              <button className="w-full bg-teal-600 text-white px-5 py-3 rounded-lg text-base font-semibold shadow-md">
                {t.book}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};