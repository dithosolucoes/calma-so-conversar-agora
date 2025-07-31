import { cn } from '@/lib/utils';
import { Typography } from '../elementos/Typography';
import { Icon } from '../elementos/Icon';
import { Badge } from '../elementos/Badge';

interface ScreenHeaderProps {
  titulo: string;
  subtitulo?: string;
  userName?: string;
  greeting?: string;
  iconName?: keyof typeof import('lucide-react').icons;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error';
  };
  actions?: React.ReactNode;
  variant?: 'default' | 'greeting' | 'minimal';
  className?: string;
  gradient?: boolean;
}

export const ScreenHeader = ({
  titulo,
  subtitulo,
  userName,
  greeting,
  iconName,
  badge,
  actions,
  variant = 'default',
  className,
  gradient = false,
}: ScreenHeaderProps) => {
  const getGreeting = () => {
    if (greeting) return greeting;
    
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  if (variant === 'greeting') {
    return (
      <div className={cn(
        "space-y-2 py-6",
        gradient && "bg-gradient-to-r from-primary/5 to-secondary/5 -mx-4 px-4 rounded-lg",
        className
      )}>
        <Typography variant="h5" color="muted">
          {getGreeting()}{userName ? `, ${userName}!` : '!'}
        </Typography>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              {iconName && (
                <Icon name={iconName} size={24} className="text-primary" />
              )}
              <Typography 
                variant="h2" 
                className={cn(
                  "font-bold",
                  gradient && "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                )}
              >
                {titulo}
              </Typography>
              {badge && (
                <Badge variant={badge.variant} size="sm">
                  {badge.text}
                </Badge>
              )}
            </div>
            
            {subtitulo && (
              <Typography variant="bodyLarge" color="muted">
                {subtitulo}
              </Typography>
            )}
          </div>
          
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center justify-between py-4", className)}>
        <div className="flex items-center gap-3">
          {iconName && (
            <Icon name={iconName} size={20} className="text-primary" />
          )}
          <Typography variant="h4" className="font-bold">
            {titulo}
          </Typography>
          {badge && (
            <Badge variant={badge.variant} size="sm">
              {badge.text}
            </Badge>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "space-y-4 pb-6 border-b border-border",
      gradient && "bg-gradient-to-r from-primary/5 to-secondary/5 -mx-4 px-4 pt-4 rounded-t-lg",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            {iconName && (
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name={iconName} size={24} className="text-primary" />
              </div>
            )}
            
            <div>
              <Typography 
                variant="h2" 
                className={cn(
                  "font-bold",
                  gradient && "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                )}
              >
                {titulo}
              </Typography>
              {badge && (
                <Badge variant={badge.variant} size="sm" className="mt-1">
                  {badge.text}
                </Badge>
              )}
            </div>
          </div>
          
          {subtitulo && (
            <Typography variant="bodyLarge" color="muted">
              {subtitulo}
            </Typography>
          )}
          
          {userName && (
            <Typography variant="body" color="muted">
              Olá, {userName}! {getGreeting()}.
            </Typography>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};