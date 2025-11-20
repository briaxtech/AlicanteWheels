import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Fleet } from './components/Fleet';
import { Chatbot } from './components/Chatbot';
import { Footer } from './components/Footer';
import { ViewState, Language } from './types';
import { translations } from './translations';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language].contact;

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col w-full max-w-[100vw] overflow-x-hidden">
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        language={language}
        setLanguage={setLanguage}
      />
      
      <main className="flex-grow">
        {currentView === ViewState.HOME && (
          <>
            <Hero language={language} />
            <Features language={language} />
            <Fleet language={language} />
          </>
        )}
        
        {currentView === ViewState.FLEET && (
          <>
            <div className="pt-10">
                <Fleet language={language} />
            </div>
          </>
        )}

        {currentView === ViewState.CONTACT && (
          <div className="py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-slate-900">{t.title}</h1>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
               <div>
                 <p className="text-lg text-slate-600 mb-6">
                   {t.subtitle}
                 </p>
                 <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                   <h3 className="font-bold text-xl mb-4">{t.office}</h3>
                   <p className="mb-2">{t.airport}</p>
                   <p className="mb-2">{t.hall}</p>
                   <p className="mb-2">{t.address}</p>
                 </div>
               </div>
               <div className="h-64 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-500">
                  {/* Placeholder for a map */}
                  <span>{t.mapPlaceholder}</span>
               </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer language={language} />
      <Chatbot language={language} />
    </div>
  );
};

export default App;
