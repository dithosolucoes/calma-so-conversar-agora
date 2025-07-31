import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AchievementCard } from '../funcionais/AchievementCard';
import { Typography } from '../elementos/Typography';
import { Badge } from '../elementos/Badge';

interface Achievement {
  id: string;
  titulo: string;
  descricao: string;
  icon: keyof typeof import('lucide-react').icons;
  desbloqueada: boolean;
  progresso?: number;
  progressoTexto?: string;
  raridade?: 'comum' | 'raro' | 'epico' | 'lendario';
  dataDesbloqueio?: string;
  recompensa?: string;
}

interface AchievementGridProps {
  titulo?: string;
  achievements: Achievement[];
  onAchievementClick?: (achievement: Achievement) => void;
  variant?: 'default' | 'compact' | 'detailed';
  columns?: 1 | 2 | 3;
  className?: string;
  showFilter?: boolean;
  showStats?: boolean;
}

export const AchievementGrid = ({
  titulo,
  achievements,
  onAchievementClick,
  variant = 'default',
  columns = 2,
  className,
  showFilter = true,
  showStats = true,
}: AchievementGridProps) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [rarityFilter, setRarityFilter] = useState<'all' | 'comum' | 'raro' | 'epico' | 'lendario'>('all');

  const filteredAchievements = achievements.filter(achievement => {
    const statusMatch = filter === 'all' || 
      (filter === 'unlocked' && achievement.desbloqueada) ||
      (filter === 'locked' && !achievement.desbloqueada);
    
    const rarityMatch = rarityFilter === 'all' || achievement.raridade === rarityFilter;
    
    return statusMatch && rarityMatch;
  });

  const unlockedCount = achievements.filter(a => a.desbloqueada).length;
  const progressPercent = achievements.length > 0 ? (unlockedCount / achievements.length) * 100 : 0;

  const gridClasses = cn(
    "grid gap-4",
    columns === 1 && "grid-cols-1",
    columns === 2 && "grid-cols-1 md:grid-cols-2",
    columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  );

  const filterOptions = [
    { value: 'all', label: 'Todas', count: achievements.length },
    { value: 'unlocked', label: 'Desbloqueadas', count: unlockedCount },
    { value: 'locked', label: 'Bloqueadas', count: achievements.length - unlockedCount },
  ];

  const rarityOptions = [
    { value: 'all', label: 'Todas' },
    { value: 'comum', label: 'Comum' },
    { value: 'raro', label: 'Raro' },
    { value: 'epico', label: 'Épico' },
    { value: 'lendario', label: 'Lendário' },
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="space-y-4">
        {titulo && (
          <Typography variant="h4" className="font-bold">
            {titulo}
          </Typography>
        )}
        
        {showStats && (
          <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg">
            <div className="flex-1">
              <Typography variant="h6" className="font-semibold">
                {unlockedCount} de {achievements.length} conquistas
              </Typography>
              <div className="mt-2 w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <Typography variant="h4" color="primary" className="font-bold">
                {Math.round(progressPercent)}%
              </Typography>
              <Typography variant="caption" color="muted">
                Completo
              </Typography>
            </div>
          </div>
        )}
      </div>

      {/* Filtros */}
      {showFilter && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Typography variant="caption" className="self-center font-medium">
              Status:
            </Typography>
            {filterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value as any)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  filter === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                )}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Typography variant="caption" className="self-center font-medium">
              Raridade:
            </Typography>
            {rarityOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setRarityFilter(option.value as any)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  rarityFilter === option.value
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid de Conquistas */}
      {filteredAchievements.length === 0 ? (
        <div className="text-center py-12">
          <Typography variant="h6" color="muted">
            Nenhuma conquista encontrada
          </Typography>
          <Typography variant="bodySmall" color="muted">
            Ajuste os filtros para ver mais conquistas
          </Typography>
        </div>
      ) : (
        <div className={gridClasses}>
          {filteredAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              titulo={achievement.titulo}
              descricao={achievement.descricao}
              icon={achievement.icon}
              desbloqueada={achievement.desbloqueada}
              progresso={achievement.progresso}
              progressoTexto={achievement.progressoTexto}
              raridade={achievement.raridade}
              dataDesbloqueio={achievement.dataDesbloqueio}
              recompensa={achievement.recompensa}
              onClick={() => onAchievementClick?.(achievement)}
              variant={variant}
            />
          ))}
        </div>
      )}
    </div>
  );
};