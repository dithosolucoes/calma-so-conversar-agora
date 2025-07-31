import { cn } from '@/lib/utils';
import { Icon, DevotionalIcons } from '../elementos/Icon';
import { Typography } from '../elementos/Typography';
import { Badge } from '../elementos/Badge';

interface ProgressTrackerProps {
  diasTotais: number;
  diaAtual: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export const ProgressTracker = ({
  diasTotais,
  diaAtual,
  className,
  size = 'md',
  showLabels = true,
  variant = 'default',
}: ProgressTrackerProps) => {
  const sizeConfig = {
    sm: { circle: 'w-6 h-6 text-xs', spacing: 'gap-1' },
    md: { circle: 'w-8 h-8 text-xs', spacing: 'gap-1' },
    lg: { circle: 'w-10 h-10 text-sm', spacing: 'gap-2' },
  };

  const config = sizeConfig[size];

  const renderDay = (numeroDia: number) => {
    const isCompleto = numeroDia < diaAtual;
    const isAtual = numeroDia === diaAtual;
    const isFuturo = numeroDia > diaAtual;

    return (
      <div
        key={numeroDia}
        className={cn(
          "rounded-full flex items-center justify-center font-medium transition-all duration-300",
          config.circle,
          isCompleto && "bg-green-500 text-white shadow-lg shadow-green-500/25",
          isAtual && "bg-primary text-primary-foreground ring-2 ring-primary/20 shadow-lg",
          isFuturo && "bg-muted text-muted-foreground hover:bg-muted/80"
        )}
        title={`Dia ${numeroDia}${isCompleto ? ' - Concluído' : isAtual ? ' - Atual' : ' - Futuro'}`}
      >
        {isCompleto ? (
          <Icon name={DevotionalIcons.completed} size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
        ) : (
          numeroDia
        )}
      </div>
    );
  };

  const progressPercentage = ((diaAtual - 1) / diasTotais) * 100;

  if (variant === 'compact') {
    return (
      <div className={cn("space-y-2", className)}>
        {showLabels && (
          <div className="flex justify-between items-center">
            <Typography variant="caption">
              Dia {diaAtual} de {diasTotais}
            </Typography>
            <Badge variant="progresso" size="sm">
              {Math.round(progressPercentage)}%
            </Badge>
          </div>
        )}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    const diasCompletos = diaAtual - 1;
    const diasRestantes = diasTotais - diaAtual + 1;

    return (
      <div className={cn("space-y-4", className)}>
        {showLabels && (
          <div className="flex justify-between items-center">
            <Typography variant="h6">Progresso da Jornada</Typography>
            <Badge variant="progresso">
              {Math.round(progressPercentage)}% completo
            </Badge>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
          <div className="text-center">
            <Typography variant="h4" color="success" className="font-bold">
              {diasCompletos}
            </Typography>
            <Typography variant="caption">Completos</Typography>
          </div>
          <div className="text-center">
            <Typography variant="h4" color="primary" className="font-bold">
              {diaAtual}
            </Typography>
            <Typography variant="caption">Atual</Typography>
          </div>
          <div className="text-center">
            <Typography variant="h4" color="muted" className="font-bold">
              {diasRestantes}
            </Typography>
            <Typography variant="caption">Restantes</Typography>
          </div>
        </div>

        <div className={cn("flex items-center flex-wrap", config.spacing)}>
          {Array.from({ length: diasTotais }, (_, index) => renderDay(index + 1))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {showLabels && (
        <div className="flex justify-between items-center">
          <Typography variant="caption">
            Progresso: {diaAtual - 1} de {diasTotais} dias
          </Typography>
          <Badge variant="progresso" size="sm">
            {Math.round(progressPercentage)}%
          </Badge>
        </div>
      )}
      
      <div className={cn("flex items-center flex-wrap", config.spacing)}>
        {Array.from({ length: diasTotais }, (_, index) => renderDay(index + 1))}
      </div>
    </div>
  );
};