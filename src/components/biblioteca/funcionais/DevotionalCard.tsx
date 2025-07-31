import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '../elementos/Badge';
import { Icon, DevotionalIcons } from '../elementos/Icon';
import { Typography } from '../elementos/Typography';
import { LoadingSpinner } from '../elementos/LoadingSpinner';

interface DevotionalCardProps {
  titulo: string;
  tipo: 'devocional' | 'passagem' | 'quiz' | 'oracao';
  tempo: string;
  completada: boolean;
  progresso?: number; // 0-100
  conteudo?: string;
  onClick?: () => void;
  onComplete?: () => void;
  isLoading?: boolean;
  variant?: 'default' | 'compact' | 'expanded';
  showProgress?: boolean;
}

const tipoConfig = {
  devocional: {
    icon: DevotionalIcons.book,
    color: 'devocional' as const,
    label: 'Devocional',
  },
  passagem: {
    icon: DevotionalIcons.passage,
    color: 'passagem' as const,
    label: 'Passagem',
  },
  quiz: {
    icon: DevotionalIcons.quiz,
    color: 'quiz' as const,
    label: 'Quiz',
  },
  oracao: {
    icon: DevotionalIcons.pray,
    color: 'oracao' as const,
    label: 'Oração',
  },
};

export const DevotionalCard = ({
  titulo,
  tipo,
  tempo,
  completada,
  progresso = 0,
  conteudo,
  onClick,
  onComplete,
  isLoading = false,
  variant = 'default',
  showProgress = false,
}: DevotionalCardProps) => {
  const [expandido, setExpandido] = useState(false);
  const config = tipoConfig[tipo];

  const handleCardClick = () => {
    if (variant === 'expanded') return;
    setExpandido(!expandido);
  };

  const handleIniciarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  const handleCompleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComplete?.();
  };

  const cardClasses = cn(
    "group cursor-pointer transition-all duration-300 hover:shadow-lg",
    completada && "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200",
    variant === 'compact' && "p-3",
    variant === 'expanded' && "cursor-default"
  );

  return (
    <Card className={cardClasses} onClick={handleCardClick}>
      <CardHeader className={cn(
        "pb-3",
        variant === 'compact' && "pb-2"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg transition-colors",
              completada 
                ? "bg-green-100 text-green-600" 
                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
            )}>
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : completada ? (
                <Icon name={DevotionalIcons.completed} size={20} />
              ) : (
                <Icon name={config.icon} size={20} />
              )}
            </div>
            
            <div className="space-y-1">
              <Typography variant="h6" className="text-sm font-semibold">
                {titulo}
              </Typography>
              <div className="flex items-center gap-2">
                <Badge variant={config.color} size="sm">
                  {config.label}
                </Badge>
                <Typography variant="caption" className="text-xs">
                  {tempo}
                </Typography>
              </div>
            </div>
          </div>

          {completada && (
            <Badge variant="completado" size="sm">
              <Icon name={DevotionalIcons.completed} size={12} />
              Concluído
            </Badge>
          )}
        </div>

        {showProgress && progresso > 0 && (
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <Typography variant="caption">Progresso</Typography>
              <Typography variant="caption">{progresso}%</Typography>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>
        )}
      </CardHeader>

      {(expandido || variant === 'expanded') && (
        <CardContent className="pt-0">
          {conteudo && (
            <Typography variant="bodySmall" className="text-muted-foreground mb-4">
              {conteudo}
            </Typography>
          )}
          
          <div className="flex gap-2">
            {!completada ? (
              <button
                onClick={handleIniciarClick}
                disabled={isLoading}
                className={cn(
                  "flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg",
                  "transition-all duration-300 hover:bg-primary/90",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "flex items-center justify-center gap-2"
                )}
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" variant="white" />
                ) : (
                  <>
                    <Icon name={DevotionalIcons.play} size={16} />
                    Iniciar
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleCompleteClick}
                className={cn(
                  "flex-1 bg-green-100 text-green-700 px-4 py-2 rounded-lg",
                  "transition-all duration-300 hover:bg-green-200",
                  "flex items-center justify-center gap-2"
                )}
              >
                <Icon name={DevotionalIcons.completed} size={16} />
                Revisitar
              </button>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};