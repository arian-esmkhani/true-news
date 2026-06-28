"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Search, Haze} from "lucide-react";

const Routes = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/page/search', label: 'Search', icon: Search },
  { path: '/page/newest', label: 'New Articles', icon: Haze },
  { path: '/components/Economy/topic', label: 'Economy', icon: Info },
  { path: '/components/Political/topic', label: 'Political', icon: Info },
  { path: '/components/Culture/topic', label: 'Culture', icon: Info },
  { path: '/components/Technology/topic', label: 'Technology', icon: Info },
  { path: '/page/about', label: 'About', icon: Info },
];

export function AppNav() {
  const pathname = usePathname();
  
  return (
    <div className="sticky top-0 z-50">
        <div className="text-center bg-linear-to-r from-cyan-800/70 to-zinc-800 py-5
        px-4 border-b border-zinc-600/30 dark:from-cyan-950/76">
          <p className="text-sm font-medium text-gray-100">
              <span className="font-bold text-white mr-2">Everting You want it</span>
              <span className="text-gray-300 mx-2">|</span>
              <span className="text-gray-200 mr-2">Best where to learn Pc word</span>
              <span className="text-gray-300 mx-2">|</span>
              <span className="text-rose-700/80 font-semibold">Do it daily</span>
          </p>
        </div>
      
      <nav className="hidden md:block w-full bg-linear-to-b from-indigo-800/80 to-gray-900/80 
                    backdrop-blur-lg shadow-xl/30 shadow-pink-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-neutral-400/80">
              PcPologist
            </span>
            
            <div className="flex items-center gap-8"> 
              {Routes.map((route) => {
                const isActive = pathname === route.path;
                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={`text-sm font-medium transition-colors duration-200 relative group
                              ${isActive ? 'text-black/80' : 'text-gray-300 hover:text-pink-700/50'}`}
                  >
                    {route.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-pink-700 
                                  transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                );
              })} 
            </div>
          </div>
        </div>
      </nav>
      
      <div className="md:hidden bg-linear-to-b from-indigo-800/80 
      to-gray-900/80 py-3 px-3 shadow-xl/30 shadow-pink-700 ">
        <div className="flex items-center justify-between">
          <Link className="text-lg font-bold text-neutral-400/80" href="/" key={"/"}>
            PcPologist
          </Link>
        </div>
      </div>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-indigo-800/80 backdrop-blur-md 
                     border-t rounded-t-4xl border-b-pink-700 py-2 opacity-55">
        <div className="flex justify-around items-center px-1">
          {Routes.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.path;
            
            return (
              <Link
                key={route.path}
                href={route.path}
                className="flex flex-col items-center transition-all duration-200 active:scale-95"
              >
                <div className={`p-1.5 rounded-lg mb-0.5 ${isActive ? 'bg-black/45' : ''}`}>
                  <Icon 
                    size={18} 
                    className={isActive ? 'text-pink-800/90' : 'text-gray-400'} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span className={`text-xs font-medium ${isActive ? 'text-pink-800/90' : 'text-gray-400'}`}>
                  {route.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      
      <div className="md:hidden h-16"></div>
    </div>
  );
}