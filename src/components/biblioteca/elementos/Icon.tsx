import { icons, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  color?: string;
  strokeWidth?: number;
  variant?: 'default' | 'filled' | 'outlined' | 'rounded';
}

export const Icon = ({ 
  name, 
  size = 20, 
  className, 
  color = 'currentColor',
  strokeWidth = 2,
  variant = 'default',
  ...props 
}: IconProps) => {
  const LucideIcon = icons[name] as LucideIcon;

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const variantStyles = {
    default: '',
    filled: 'fill-current',
    outlined: 'fill-none',
    rounded: 'rounded-full p-1 bg-current/10',
  };

  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  );
};

// Ícones pré-definidos para o contexto devocional
export const DevotionalIcons = {
  // Atividades
  book: 'BookOpen' as IconName,
  pray: 'Heart' as IconName,
  quiz: 'HelpCircle' as IconName,
  passage: 'Scroll' as IconName,
  
  // Estados
  completed: 'CheckCircle' as IconName,
  inProgress: 'Clock' as IconName,
  locked: 'Lock' as IconName,
  
  // Navegação
  home: 'Home' as IconName,
  growth: 'TrendingUp' as IconName,
  profile: 'User' as IconName,
  settings: 'Settings' as IconName,
  
  // Ações
  play: 'Play' as IconName,
  pause: 'Pause' as IconName,
  next: 'ChevronRight' as IconName,
  previous: 'ChevronLeft' as IconName,
  close: 'X' as IconName,
  
  // Elementos
  star: 'Star' as IconName,
  heart: 'Heart' as IconName,
  fire: 'Flame' as IconName,
  crown: 'Crown' as IconName,
  trophy: 'Trophy' as IconName,
  
  // Comunicação
  share: 'Share2' as IconName,
  comment: 'MessageCircle' as IconName,
  like: 'ThumbsUp' as IconName,
} as const;