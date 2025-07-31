import React from 'react';
import { ScreenLayout } from '../layouts/ScreenLayout';
import { StatsGrid } from '../secoes/StatsGrid';
import { ActivitySection } from '../secoes/ActivitySection';
import { AchievementGrid } from '../secoes/AchievementGrid';
import { ProgressTracker } from '../funcionais/ProgressTracker';
import { DevotionalCard } from '../funcionais/DevotionalCard';
import { Badge } from '../elementos/Badge';
import { Button } from '../elementos/Button';
import { cn } from '@/lib/utils';

interface DashboardData {
  user: {
    name: string;
    level: number;
    streak: number;
    points: number;
    avatar?: string;
  };
  stats: Array<{
    id: string;
    titulo: string;
    valor: string;
    icon: any;
    trend?: 'up' | 'down';
    trendValue?: string;
    color?: 'default' | 'success' | 'warning' | 'error';
  }>;
  todayActivity?: {
    titulo: string;
    tipo: 'devocional' | 'oracao' | 'passagem' | 'quiz';
    tempo: string;
    completada: boolean;
    progresso?: number;
    conteudo?: string;
  };
  weekProgress: {
    diasTotais: number;
    diaAtual: number;
  };
  recentAchievements: Array<{
    id: string;
    titulo: string;
    descricao: string;
    icon: keyof typeof import('lucide-react').icons;
    desbloqueada: boolean;
    raridade: 'comum' | 'raro' | 'epico' | 'lendario';
  }>;
}

interface DashboardScreenProps {
  data: DashboardData;
  variant?: 'default' | 'compact' | 'detailed';
  showWelcome?: boolean;
  onActivityClick?: (activity: any) => void;
  onViewAllStats?: () => void;
  onViewAllAchievements?: () => void;
  className?: string;
}

export const DashboardScreen = ({
  data,
  variant = 'default',
  showWelcome = true,
  onActivityClick,
  onViewAllStats,
  onViewAllAchievements,
  className,
}: DashboardScreenProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <ScreenLayout
      titulo={showWelcome ? `${getGreeting()}, ${data.user.name}!` : 'Dashboard'}
      subtitulo={showWelcome ? 'Continue sua jornada de crescimento espiritual' : undefined}
      variant="default"
      className={cn('space-y-6', className)}
    >
      {/* Header com informações do usuário */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Nível {data.user.level}</h2>
            <Badge variant="success" className="gap-1">
              🔥 {data.user.streak} dias
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {data.user.points} pontos conquistados
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{data.user.points}</p>
          <p className="text-xs text-muted-foreground">pontos</p>
        </div>
      </div>

      {/* Progresso da semana */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Progresso Semanal</h3>
          <Badge variant="outline">
            {data.weekProgress.diaAtual}/{data.weekProgress.diasTotais} dias
          </Badge>
        </div>
        <ProgressTracker
          diasTotais={data.weekProgress.diasTotais}
          diaAtual={data.weekProgress.diaAtual}
          variant={variant === 'compact' ? 'compact' : 'default'}
          showLabels={variant !== 'compact'}
        />
      </div>

      {/* Atividade de hoje */}
      {data.todayActivity && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Atividade de Hoje</h3>
            {data.todayActivity.completada && (
              <Badge variant="success">Concluída</Badge>
            )}
          </div>
          <DevotionalCard
            {...data.todayActivity}
            variant={variant === 'compact' ? 'compact' : 'default'}
            onClick={() => onActivityClick?.(data.todayActivity)}
          />
        </div>
      )}

      {/* Grid de estatísticas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Estatísticas</h3>
          {onViewAllStats && (
            <Button variant="ghost" size="sm" onClick={onViewAllStats}>
              Ver todas
            </Button>
          )}
        </div>
        <StatsGrid 
          stats={data.stats}
          variant={variant === 'compact' ? 'compact' : 'default'}
        />
      </div>

      {/* Conquistas recentes */}
      {data.recentAchievements.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Conquistas Recentes</h3>
            {onViewAllAchievements && (
              <Button variant="ghost" size="sm" onClick={onViewAllAchievements}>
                Ver todas
              </Button>
            )}
          </div>
          <AchievementGrid
            achievements={data.recentAchievements}
            variant={variant === 'compact' ? 'compact' : 'default'}
          />
        </div>
      )}

      {/* Ações rápidas */}
      <div className="flex gap-3 pt-4">
        <Button variant="default" className="flex-1">
          Iniciar Devocional
        </Button>
        <Button variant="outline" className="flex-1">
          Ver Progresso
        </Button>
      </div>
    </ScreenLayout>
  );
};

// Versão simplificada para uso básico
export const SimpleDashboard = ({ 
  userName, 
  streak, 
  level, 
  todayCompleted = false 
}: { 
  userName: string; 
  streak: number; 
  level: number; 
  todayCompleted?: boolean; 
}) => {
  const mockData: DashboardData = {
    user: { name: userName, level, streak, points: level * 100 },
    stats: [
      { id: '1', titulo: 'Sequência', valor: `${streak} dias`, icon: 'Flame', color: 'success' },
      { id: '2', titulo: 'Nível', valor: level.toString(), icon: 'Crown', color: 'default' },
      { id: '3', titulo: 'Pontos', valor: (level * 100).toString(), icon: 'Star', color: 'default' },
      { id: '4', titulo: 'Meta', valor: '7/7', icon: 'Target', color: 'success' },
    ],
    weekProgress: { diasTotais: 7, diaAtual: streak > 7 ? 7 : streak },
    recentAchievements: [],
  };

  if (!todayCompleted) {
    mockData.todayActivity = {
      titulo: 'Devocional Matinal',
      tipo: 'devocional',
      tempo: '5 min',
      completada: false,
      progresso: 0,
      conteudo: 'Comece seu dia com uma palavra de esperança',
    };
  }

  return <DashboardScreen data={mockData} variant="compact" />;
};