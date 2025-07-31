import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Icon } from '../elementos/Icon';
import { Typography } from '../elementos/Typography';
import { Badge } from '../elementos/Badge';

interface StatsCardProps {
  titulo: string;
  valor: string | number;
  subtitulo?: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconName?: keyof typeof import('lucide-react').icons;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
  badge?: string;
  gradient?: boolean;
}

const colorConfig = {
  default: {
    icon: 'text-muted-foreground',
    bg: 'bg-muted/20',
    value: 'text-foreground',
  },
  primary: {
    icon: 'text-primary',
    bg: 'bg-primary/10',
    value: 'text-primary',
  },
  success: {
    icon: 'text-green-600',
    bg: 'bg-green-50',
    value: 'text-green-700',
  },
  warning: {
    icon: 'text-yellow-600',
    bg: 'bg-yellow-50',
    value: 'text-yellow-700',
  },
  error: {
    icon: 'text-red-600',
    bg: 'bg-red-50',
    value: 'text-red-700',
  },
};

const trendConfig = {
  up: { icon: 'TrendingUp', color: 'text-green-600' },
  down: { icon: 'TrendingDown', color: 'text-red-600' },
  neutral: { icon: 'Minus', color: 'text-muted-foreground' },
};

export const StatsCard = ({
  titulo,
  valor,
  subtitulo,
  icon: IconComponent,
  iconName,
  trend,
  trendValue,
  color = 'default',
  variant = 'default',
  className,
  badge,
  gradient = false,
}: StatsCardProps) => {
  const config = colorConfig[color];
  const trendInfo = trend ? trendConfig[trend] : null;

  const renderIcon = () => {
    if (IconComponent) {
      return <IconComponent className={cn("h-5 w-5", config.icon)} />;
    }
    if (iconName) {
      return <Icon name={iconName} className={config.icon} size={20} />;
    }
    return null;
  };

  const cardClasses = cn(
    "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
    gradient && color === 'primary' && "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20",
    gradient && color === 'success' && "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200",
    gradient && color === 'warning' && "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200",
    gradient && color === 'error' && "bg-gradient-to-br from-red-50 to-pink-50 border-red-200",
    className
  );

  if (variant === 'compact') {
    return (
      <Card className={cardClasses}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {renderIcon()}
              <Typography variant="caption" className="font-medium">
                {titulo}
              </Typography>
            </div>
            <div className="text-right">
              <Typography variant="h6" className={cn("font-bold", config.value)}>
                {valor}
              </Typography>
              {trendInfo && trendValue && (
                <div className="flex items-center gap-1 text-xs">
                  <Icon name={trendInfo.icon as any} size={12} className={trendInfo.color} />
                  <span className={trendInfo.color}>{trendValue}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className={cardClasses}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {renderIcon() && (
                <div className={cn("p-2 rounded-lg", config.bg)}>
                  {renderIcon()}
                </div>
              )}
              <Typography variant="h6" className="font-medium">
                {titulo}
              </Typography>
            </div>
            {badge && <Badge variant="outline" size="sm">{badge}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <Typography 
              variant="h2" 
              className={cn("font-bold", config.value)}
            >
              {valor}
            </Typography>
            
            {subtitulo && (
              <Typography variant="caption" color="muted">
                {subtitulo}
              </Typography>
            )}
            
            {trendInfo && trendValue && (
              <div className="flex items-center gap-2 pt-2">
                <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs", 
                  trend === 'up' && 'bg-green-100 text-green-700',
                  trend === 'down' && 'bg-red-100 text-red-700',
                  trend === 'neutral' && 'bg-gray-100 text-gray-700'
                )}>
                  <Icon name={trendInfo.icon as any} size={12} />
                  {trendValue}
                </div>
                <Typography variant="caption" color="muted">
                  vs. período anterior
                </Typography>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cardClasses}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h6" className="font-medium text-muted-foreground">
            {titulo}
          </Typography>
          {renderIcon()}
        </div>
        
        <div className="space-y-2">
          <Typography 
            variant="h3" 
            className={cn("font-bold", config.value)}
          >
            {valor}
          </Typography>
          
          <div className="flex items-center justify-between">
            {subtitulo && (
              <Typography variant="caption" color="muted">
                {subtitulo}
              </Typography>
            )}
            
            {trendInfo && trendValue && (
              <div className="flex items-center gap-1">
                <Icon name={trendInfo.icon as any} size={14} className={trendInfo.color} />
                <Typography variant="caption" className={trendInfo.color}>
                  {trendValue}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};