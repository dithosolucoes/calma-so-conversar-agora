import React, { useState, createContext, useContext } from 'react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { TopNavigation } from '../navegacao/TopNavigation';
import { DashboardScreen } from '../telas/DashboardScreen';
import { cn } from '@/lib/utils';

// Context para estado global do app
interface ReaderAppContextType {
  currentRoute: string;
  navigate: (route: string) => void;
  user: {
    name: string;
    level: number;
    streak: number;
    points: number;
    avatar?: string;
  };
  updateUser: (updates: Partial<ReaderAppContextType['user']>) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ReaderAppContext = createContext<ReaderAppContextType | null>(null);

export const useReaderApp = () => {
  const context = useContext(ReaderAppContext);
  if (!context) {
    throw new Error('useReaderApp must be used within ReaderApp');
  }
  return context;
};

interface ReaderAppProps {
  initialUser?: Partial<ReaderAppContextType['user']>;
  initialRoute?: string;
  initialTheme?: 'light' | 'dark';
  customScreens?: Record<string, React.ComponentType<any>>;
  navigation?: Array<{
    label: string;
    route: string;
    icon: string;
  }>;
  showTopNavigation?: boolean;
  showBottomNavigation?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ReaderApp = ({
  initialUser = {},
  initialRoute = 'hoje',
  initialTheme = 'light',
  customScreens = {},
  navigation,
  showTopNavigation = true,
  showBottomNavigation = true,
  className,
  children,
}: ReaderAppProps) => {
  const [currentRoute, setCurrentRoute] = useState(initialRoute);
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);
  const [user, setUser] = useState({
    name: 'Usuário',
    level: 1,
    streak: 0,
    points: 0,
    ...initialUser,
  });

  const navigate = (route: string) => {
    setCurrentRoute(route);
  };

  const updateUser = (updates: Partial<typeof user>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const contextValue: ReaderAppContextType = {
    currentRoute,
    navigate,
    user,
    updateUser,
    theme,
    toggleTheme,
  };

  // Configuração padrão de navegação
  const defaultNavigation = navigation || [
    { label: 'Hoje', route: 'hoje', icon: 'Home' },
    { label: 'Crescimento', route: 'crescimento', icon: 'TrendingUp' },
    { label: 'Perfil', route: 'perfil', icon: 'User' },
  ];

  // Telas padrão
  const defaultScreens = {
    hoje: () => (
      <DashboardScreen
        data={{
          user,
          stats: [
            { titulo: 'Sequência', valor: `${user.streak} dias`, icon: 'Flame', color: 'success' as const },
            { titulo: 'Nível', valor: user.level.toString(), icon: 'Crown', color: 'default' as const },
            { titulo: 'Pontos', valor: user.points.toString(), icon: 'Star', color: 'default' as const },
            { titulo: 'Meta', valor: '7/7', icon: 'Target', color: 'success' as const },
          ],
          weekProgress: { diasTotais: 7, diaAtual: Math.min(user.streak, 7) },
          recentAchievements: [],
          todayActivity: user.streak === 0 ? {
            titulo: 'Primeiro Devocional',
            tipo: 'devocional' as const,
            tempo: '5 min',
            completada: false,
            progresso: 0,
            conteudo: 'Inicie sua jornada espiritual',
          } : undefined,
        }}
      />
    ),
    crescimento: () => (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Crescimento Espiritual</h2>
        <p className="text-muted-foreground">Acompanhe seu progresso e conquistas</p>
      </div>
    ),
    perfil: () => (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Meu Perfil</h2>
        <p className="text-muted-foreground">Gerencie suas informações e preferências</p>
      </div>
    ),
    ...customScreens,
  };

  const CurrentScreen = defaultScreens[currentRoute] || defaultScreens.hoje;

  return (
    <ReaderAppContext.Provider value={contextValue}>
      <div className={cn(
        'min-h-screen bg-background text-foreground',
        theme === 'dark' && 'dark',
        className
      )}>
        {showTopNavigation && (
          <TopNavigation
            title="Devocional"
            user={{
              name: user.name,
              avatar: user.avatar,
              level: user.level,
            }}
            variant="elevated"
          />
        )}

        <main className={cn(
          'flex-1',
          showTopNavigation && 'pt-16',
          showBottomNavigation && 'pb-16'
        )}>
          {children || <CurrentScreen />}
        </main>

        {showBottomNavigation && (
          <BottomNavigation
            activeTab={currentRoute}
            onTabChange={navigate}
            navigation={defaultNavigation}
          />
        )}
      </div>
    </ReaderAppContext.Provider>
  );
};

// Hook para facilitar navegação
export const useNavigation = () => {
  const { navigate, currentRoute } = useReaderApp();
  return { navigate, currentRoute };
};

// Hook para gerenciar usuário
export const useUser = () => {
  const { user, updateUser } = useReaderApp();
  return { user, updateUser };
};

// Componente wrapper para telas customizadas
export const ReaderScreen = ({ 
  children, 
  title, 
  className 
}: { 
  children: React.ReactNode; 
  title?: string; 
  className?: string; 
}) => {
  return (
    <div className={cn('min-h-full', className)}>
      {title && (
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};