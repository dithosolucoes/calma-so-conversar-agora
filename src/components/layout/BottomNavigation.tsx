
import { useState } from 'react';
import { Home, TrendingUp, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: 'hoje' | 'crescimento' | 'perfil';
  onTabChange: (tab: 'hoje' | 'crescimento' | 'perfil') => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'hoje' as const, label: 'Hoje', icon: Home },
    { id: 'crescimento' as const, label: 'Crescimento', icon: TrendingUp },
    { id: 'perfil' as const, label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border z-50 shadow-2xl">
      <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300 hover-lift",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full animate-scale-in" />
              )}
              
              <div className={cn(
                "p-1 rounded-lg transition-all duration-300",
                isActive && "bg-white shadow-md"
              )}>
                <Icon size={20} className={isActive ? "text-primary" : ""} />
              </div>
              
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                isActive ? "text-primary" : ""
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
