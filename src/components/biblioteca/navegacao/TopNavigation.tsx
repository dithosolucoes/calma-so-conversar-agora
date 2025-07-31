import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../elementos/Button';
import { UserAvatar } from '../elementos/Avatar';
import { Icon } from '../elementos/Icon';
import { Badge } from '../elementos/Badge';
import { Menu, Search, Bell, Settings } from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'success' | 'warning' | 'error';
  };
  active?: boolean;
}

interface TopNavigationProps {
  title?: string;
  subtitle?: string;
  navigation?: NavigationItem[];
  user?: {
    name: string;
    avatar?: string;
    level?: number;
  };
  actions?: React.ReactNode;
  variant?: 'default' | 'transparent' | 'elevated';
  showSearch?: boolean;
  showNotifications?: boolean;
  onMenuClick?: () => void;
  className?: string;
}

export const TopNavigation = ({
  title,
  subtitle,
  navigation = [],
  user,
  actions,
  variant = 'default',
  showSearch = false,
  showNotifications = false,
  onMenuClick,
  className,
}: TopNavigationProps) => {
  const variantStyles = {
    default: 'bg-background border-b border-border',
    transparent: 'bg-transparent',
    elevated: 'bg-background border-b border-border shadow-sm',
  };

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full px-4 py-3',
      variantStyles[variant],
      className
    )}>
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="md:hidden"
            >
              <Menu size={20} />
            </Button>
          )}
          
          {(title || subtitle) && (
            <div>
              {title && (
                <h1 className="text-lg font-semibold text-foreground">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-sm text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Center Section - Navigation */}
        {navigation.length > 0 && (
          <nav className="hidden md:flex items-center gap-2">
            {navigation.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? 'secondary' : 'ghost'}
                size="sm"
                className="gap-2"
                asChild
              >
                <a href={item.href}>
                  {item.icon && <Icon name={item.icon as any} size={16} />}
                  {item.label}
                  {item.badge && (
                    <Badge 
                      variant={item.badge.variant || 'default'} 
                      size="sm"
                    >
                      {item.badge.text}
                    </Badge>
                  )}
                </a>
              </Button>
            ))}
          </nav>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {showSearch && (
            <Button variant="ghost" size="icon">
              <Search size={20} />
            </Button>
          )}
          
          {showNotifications && (
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
            </Button>
          )}

          {actions}

          {user && (
            <div className="flex items-center gap-2">
              <UserAvatar
                name={user.name}
                src={user.avatar}
                level={user.level}
                showLevel={!!user.level}
                size="sm"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user.name}</p>
                {user.level && (
                  <p className="text-xs text-muted-foreground">
                    Nível {user.level}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Variante simplificada para apps devocionais
interface DevotionalTopNavProps {
  title: string;
  streak?: number;
  level?: number;
  onMenuClick?: () => void;
  user?: {
    name: string;
    avatar?: string;
  };
}

export const DevotionalTopNav = ({
  title,
  streak,
  level,
  onMenuClick,
  user,
}: DevotionalTopNavProps) => {
  return (
    <TopNavigation
      title={title}
      variant="elevated"
      onMenuClick={onMenuClick}
      user={user ? { ...user, level } : undefined}
      actions={
        <div className="flex items-center gap-2">
          {streak && (
            <Badge variant="success" className="gap-1">
              <Icon name="Flame" size={14} />
              {streak} dias
            </Badge>
          )}
        </div>
      }
    />
  );
};