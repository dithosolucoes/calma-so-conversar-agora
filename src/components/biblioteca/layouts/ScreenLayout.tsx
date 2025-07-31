import { cn } from '@/lib/utils';
import { ScreenHeader } from './ScreenHeader';

interface ScreenLayoutProps {
  children: React.ReactNode;
  
  // Header props
  titulo?: string;
  subtitulo?: string;
  userName?: string;
  greeting?: string;
  headerIconName?: keyof typeof import('lucide-react').icons;
  headerBadge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error';
  };
  headerActions?: React.ReactNode;
  headerVariant?: 'default' | 'greeting' | 'minimal';
  headerGradient?: boolean;

  // Layout props
  variant?: 'default' | 'fullscreen' | 'centered' | 'sidebar';
  className?: string;
  contentClassName?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  // Background
  background?: 'default' | 'muted' | 'gradient' | 'pattern';
  
  // Show header
  showHeader?: boolean;
}

const maxWidthConfig = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
};

const paddingConfig = {
  none: 'p-0',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

const spacingConfig = {
  none: 'space-y-0',
  sm: 'space-y-2',
  md: 'space-y-4',
  lg: 'space-y-6',
  xl: 'space-y-8',
};

const backgroundConfig = {
  default: 'bg-background',
  muted: 'bg-muted/20',
  gradient: 'bg-gradient-to-br from-background via-primary/5 to-secondary/5',
  pattern: 'bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background',
};

export const ScreenLayout = ({
  children,
  titulo,
  subtitulo,
  userName,
  greeting,
  headerIconName,
  headerBadge,
  headerActions,
  headerVariant = 'default',
  headerGradient = false,
  variant = 'default',
  className,
  contentClassName,
  maxWidth = 'full',
  padding = 'md',
  spacing = 'md',
  background = 'default',
  showHeader = true,
}: ScreenLayoutProps) => {
  const containerClasses = cn(
    "min-h-screen",
    backgroundConfig[background],
    variant === 'fullscreen' && "h-screen",
    variant === 'centered' && "flex items-center justify-center",
    className
  );

  const contentClasses = cn(
    paddingConfig[padding],
    spacingConfig[spacing],
    variant === 'centered' ? maxWidthConfig[maxWidth] : `mx-auto ${maxWidthConfig[maxWidth]}`,
    variant === 'sidebar' && "ml-0", // Sidebar layouts handle their own max-width
    contentClassName
  );

  const content = (
    <>
      {showHeader && titulo && (
        <ScreenHeader
          titulo={titulo}
          subtitulo={subtitulo}
          userName={userName}
          greeting={greeting}
          iconName={headerIconName}
          badge={headerBadge}
          actions={headerActions}
          variant={headerVariant}
          gradient={headerGradient}
        />
      )}
      
      <div className={cn(
        !showHeader && spacingConfig[spacing]
      )}>
        {children}
      </div>
    </>
  );

  if (variant === 'centered') {
    return (
      <div className={containerClasses}>
        <div className={contentClasses}>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        {content}
      </div>
    </div>
  );
};