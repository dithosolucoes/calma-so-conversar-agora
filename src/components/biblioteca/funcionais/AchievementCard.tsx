import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '../elementos/Icon';
import { Typography } from '../elementos/Typography';
import { Badge } from '../elementos/Badge';

interface AchievementCardProps {
  titulo: string;
  descricao: string;
  icon: keyof typeof import('lucide-react').icons;
  desbloqueada: boolean;
  progresso?: number; // 0-100
  progressoTexto?: string;
  raridade?: 'comum' | 'raro' | 'epico' | 'lendario';
  dataDesbloqueio?: string;
  recompensa?: string;
  onClick?: () => void;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

const raridadeConfig = {
  comum: {
    bg: 'bg-gray-100',
    border: 'border-gray-300',
    text: 'text-gray-700',
    badge: 'bg-gray-500 text-white',
  },
  raro: {
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    text: 'text-blue-700',
    badge: 'bg-blue-500 text-white',
  },
  epico: {
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    text: 'text-purple-700',
    badge: 'bg-purple-500 text-white',
  },
  lendario: {
    bg: 'bg-yellow-100',
    border: 'border-yellow-300',
    text: 'text-yellow-700',
    badge: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
  },
};

export const AchievementCard = ({
  titulo,
  descricao,
  icon,
  desbloqueada,
  progresso,
  progressoTexto,
  raridade = 'comum',
  dataDesbloqueio,
  recompensa,
  onClick,
  variant = 'default',
  className,
}: AchievementCardProps) => {
  const config = raridadeConfig[raridade];

  const cardClasses = cn(
    "transition-all duration-300 cursor-pointer group",
    desbloqueada 
      ? "hover:shadow-lg hover:-translate-y-1 hover:scale-105" 
      : "opacity-60 hover:opacity-80",
    desbloqueada && raridade === 'lendario' && "animate-pulse shadow-lg shadow-yellow-200",
    className
  );

  const handleClick = () => {
    if (desbloqueada && onClick) {
      onClick();
    }
  };

  if (variant === 'compact') {
    return (
      <Card className={cardClasses} onClick={handleClick}>
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-full transition-all duration-300",
              desbloqueada ? config.bg : "bg-muted",
              desbloqueada ? config.text : "text-muted-foreground"
            )}>
              <Icon 
                name={icon} 
                size={16}
                className={desbloqueada ? '' : 'opacity-50'} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <Typography 
                variant="bodySmall" 
                className={cn(
                  "font-medium truncate",
                  desbloqueada ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {titulo}
              </Typography>
              {progresso !== undefined && !desbloqueada && (
                <div className="mt-1">
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${progresso}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {desbloqueada && (
              <Badge size="sm" className={config.badge}>
                ✓
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className={cn(cardClasses, desbloqueada && config.border)} onClick={handleClick}>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-4 rounded-xl transition-all duration-300",
                  desbloqueada ? config.bg : "bg-muted",
                  desbloqueada ? config.text : "text-muted-foreground",
                  desbloqueada && raridade === 'lendario' && "shadow-lg shadow-yellow-200",
                )}>
                  <Icon 
                    name={icon} 
                    size={32}
                    className={cn(
                      desbloqueada ? '' : 'opacity-50',
                      raridade === 'lendario' && desbloqueada && 'drop-shadow-lg'
                    )} 
                  />
                </div>
                
                <div className="space-y-1">
                  <Typography 
                    variant="h5" 
                    className={cn(
                      "font-bold",
                      desbloqueada ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {titulo}
                  </Typography>
                  <Typography 
                    variant="bodySmall" 
                    color={desbloqueada ? 'default' : 'muted'}
                  >
                    {descricao}
                  </Typography>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Badge size="sm" className={config.badge}>
                  {raridade.charAt(0).toUpperCase() + raridade.slice(1)}
                </Badge>
                {desbloqueada && (
                  <Badge variant="success" size="sm">
                    Desbloqueada
                  </Badge>
                )}
              </div>
            </div>

            {!desbloqueada && progresso !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Typography variant="caption">Progresso</Typography>
                  <Typography variant="caption">
                    {progressoTexto || `${progresso}%`}
                  </Typography>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progresso}%` }}
                  />
                </div>
              </div>
            )}

            {desbloqueada && dataDesbloqueio && (
              <div className="pt-2 border-t border-border">
                <Typography variant="caption" color="muted">
                  Desbloqueada em {dataDesbloqueio}
                </Typography>
              </div>
            )}

            {recompensa && (
              <div className="p-3 bg-primary/10 rounded-lg">
                <Typography variant="caption" className="font-medium text-primary">
                  Recompensa: {recompensa}
                </Typography>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cardClasses} onClick={handleClick}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-3 rounded-lg transition-all duration-300",
            desbloqueada ? config.bg : "bg-muted",
            desbloqueada ? config.text : "text-muted-foreground"
          )}>
            <Icon 
              name={icon} 
              size={24}
              className={desbloqueada ? '' : 'opacity-50'} 
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <Typography 
                variant="h6" 
                className={cn(
                  "font-semibold",
                  desbloqueada ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {titulo}
              </Typography>
              {desbloqueada && (
                <Badge variant="success" size="sm">
                  ✓
                </Badge>
              )}
            </div>
            
            <Typography 
              variant="bodySmall" 
              color={desbloqueada ? 'default' : 'muted'}
              className="mb-2"
            >
              {descricao}
            </Typography>

            {!desbloqueada && progresso !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <Typography variant="caption">
                    {progressoTexto || `${progresso}% completo`}
                  </Typography>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progresso}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};