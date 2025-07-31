import { cn } from '@/lib/utils';
import { DevotionalCard } from '../funcionais/DevotionalCard';
import { Typography } from '../elementos/Typography';
import { LoadingSpinner } from '../elementos/LoadingSpinner';
import { Card, CardContent } from '@/components/ui/card';

interface Atividade {
  id: string;
  titulo: string;
  tipo: 'devocional' | 'passagem' | 'quiz' | 'oracao';
  tempo: string;
  completada: boolean;
  conteudo?: string;
  progresso?: number;
}

interface ActivitySectionProps {
  titulo: string;
  atividades: Atividade[];
  onActivityClick: (atividade: Atividade) => void;
  onActivityComplete?: (id: string) => void;
  isLoading?: boolean;
  variant?: 'default' | 'compact' | 'grid';
  className?: string;
  emptyMessage?: string;
  showProgress?: boolean;
}

export const ActivitySection = ({
  titulo,
  atividades,
  onActivityClick,
  onActivityComplete,
  isLoading = false,
  variant = 'default',
  className,
  emptyMessage = 'Nenhuma atividade disponível',
  showProgress = false,
}: ActivitySectionProps) => {
  const completedCount = atividades.filter(a => a.completada).length;
  const progressPercent = atividades.length > 0 ? (completedCount / atividades.length) * 100 : 0;

  const renderEmptyState = () => (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="space-y-3">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Typography variant="h4" color="muted">📚</Typography>
          </div>
          <Typography variant="h6" color="muted">{emptyMessage}</Typography>
          <Typography variant="bodySmall" color="muted">
            As atividades aparecerão aqui quando estiverem disponíveis.
          </Typography>
        </div>
      </CardContent>
    </Card>
  );

  const renderActivities = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (atividades.length === 0) {
      return renderEmptyState();
    }

    const containerClasses = cn(
      variant === 'grid' && "grid grid-cols-1 md:grid-cols-2 gap-4",
      variant !== 'grid' && "space-y-4"
    );

    return (
      <div className={containerClasses}>
        {atividades.map((atividade) => (
          <DevotionalCard
            key={atividade.id}
            titulo={atividade.titulo}
            tipo={atividade.tipo}
            tempo={atividade.tempo}
            completada={atividade.completada}
            progresso={atividade.progresso}
            conteudo={atividade.conteudo}
            onClick={() => onActivityClick(atividade)}
            onComplete={() => onActivityComplete?.(atividade.id)}
            variant={variant === 'compact' ? 'compact' : 'default'}
            showProgress={showProgress}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Typography variant="h4" className="font-bold">
          {titulo}
        </Typography>
        
        {atividades.length > 0 && (
          <div className="flex items-center gap-3">
            <Typography variant="caption" color="muted">
              {completedCount} de {atividades.length} concluídas
            </Typography>
            
            {showProgress && (
              <div className="flex items-center gap-2">
                <div className="w-20 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <Typography variant="caption" className="min-w-0 text-primary font-medium">
                  {Math.round(progressPercent)}%
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>

      {renderActivities()}
      
      {isLoading && (
        <div className="flex justify-center py-4">
          <LoadingSpinner text="Carregando atividades..." />
        </div>
      )}
    </div>
  );
};