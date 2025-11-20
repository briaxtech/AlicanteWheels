import React from 'react';
import { Car, Language } from '../types';
import { translations } from '../translations';

const fleetData: Car[] = [
  {
    id: '1',
    name: 'Fiat 500 Hybrid',
    category: 'Economy',
    pricePerDay: 35,
    passengers: 4,
    transmission: 'Manual',
    // White Fiat 500
    imageUrl: 'https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?auto=format&fit=crop&w=800&q=80',
    features: ['Bluetooth', 'A/C', 'City Mode']
  },
  {
    id: '2',
    name: 'Volkswagen Golf',
    category: 'Compact',
    pricePerDay: 55,
    passengers: 5,
    transmission: 'Automatic',
    // Modern White Hatchback
    imageUrl: 'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?auto=format&fit=crop&w=800&q=80',
    features: ['Nav', 'Apple CarPlay', 'Cruise Control']
  },
  {
    id: '3',
    name: 'Audi Q3',
    category: 'SUV',
    pricePerDay: 85,
    passengers: 5,
    transmission: 'Automatic',
    // Audi Q3 Sportback (Blue)
    imageUrl: 'https://images.unsplash.com/photo-1603577089737-1dc1d0844a8d?auto=format&fit=crop&w=800&q=80',
    features: ['Leather Seats', 'Panoramic Roof', '4x4']
  },
  {
    id: '4',
    name: 'Mercedes V-Class',
    category: 'Van',
    pricePerDay: 140,
    passengers: 7,
    transmission: 'Automatic',
    // Mercedes Van
    imageUrl: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&w=800&q=80',
    features: ['Luxury Interior', 'Dual Zone AC', 'Tinted Glass']
  },
  {
    id: '5',
    name: 'Mini Cooper Cabrio',
    category: 'Convertible',
    pricePerDay: 95,
    passengers: 4,
    transmission: 'Automatic',
    // Mini Cooper Convertible (Top Down)
    imageUrl: 'https://images.unsplash.com/photo-1534552858327-752212b94146?auto=format&fit=crop&w=800&q=80',
    features: ['Soft Top', 'Sport Mode', 'Premium Sound']
  },
  {
    id: '6',
    name: 'Jeep Wrangler',
    category: 'Adventure',
    pricePerDay: 110,
    passengers: 4,
    transmission: 'Automatic',
    // Jeep Wrangler White
    imageUrl: 'https://images.unsplash.com/photo-1506351274128-949d15c67d0c?auto=format&fit=crop&w=800&q=80',
    features: ['Off-road Ready', 'Removable Top', 'Tow Bar']
  },
];

interface FleetProps {
  language: Language;
}

export const Fleet: React.FC<FleetProps> = ({ language }) => {
  const t = translations[language].fleet;

  return (
    <div className="bg-slate-50 py-24" id="fleet">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{t.title}</h2>
            <p className="text-slate-600 text-lg">{t.subtitle}</p>
          </div>
          <button className="mt-4 md:mt-0 text-teal-600 font-semibold hover:text-teal-700 flex items-center group">
            {t.viewAll} 
            <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleetData.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group">
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <img 
                  src={car.imageUrl} 
                  alt={car.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 uppercase tracking-wide shadow-sm">
                  {t.categories[car.category as keyof typeof t.categories] || car.category}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-bold text-slate-900">{car.name}</h3>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-slate-500 mb-6">
                  <div className="flex items-center bg-slate-50 px-2 py-1 rounded">
                    <svg className="w-4 h-4 mr-1.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {car.passengers}
                  </div>
                  <div className="flex items-center bg-slate-50 px-2 py-1 rounded">
                    <svg className="w-4 h-4 mr-1.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    {t.transmission[car.transmission as keyof typeof t.transmission] || car.transmission}
                  </div>
                </div>

                {/* Features list preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.map((f, i) => (
                        <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">
                            {t.features[f as keyof typeof t.features] || f}
                        </span>
                    ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 uppercase font-bold">Desde</span>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-slate-900">€{car.pricePerDay}</span>
                      <span className="text-slate-500 text-sm ml-1"> {t.perDay}</span>
                    </div>
                  </div>
                  <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-600/30 transition-all transform hover:-translate-y-0.5">
                    {t.book}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};