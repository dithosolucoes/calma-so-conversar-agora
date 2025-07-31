import { cn } from '@/lib/utils';
import { StatsCard } from '../funcionais/StatsCard';
import { Typography } from '../elementos/Typography';

interface StatItem {
  id: string;
  titulo: string;
  valor: string | number;
  subtitulo?: string;
  iconName?: keyof typeof import('lucide-react').icons;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  badge?: string;
}

interface StatsGridProps {
  titulo?: string;
  stats: StatItem[];
  columns?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
  gradient?: boolean;
}

export const StatsGrid = ({
  titulo,
  stats,
  columns = 2,
  variant = 'default',
  className,
  gradient = false,
}: StatsGridProps) => {
  const gridClasses = cn(
    "grid gap-4",
    columns === 1 && "grid-cols-1",
    columns === 2 && "grid-cols-1 sm:grid-cols-2",
    columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  );

  return (
    <div className={cn("space-y-4", className)}>
      {titulo && (
        <Typography variant="h4" className="font-bold">
          {titulo}
        </Typography>
      )}
      
      <div className={gridClasses}>
        {stats.map((stat) => (
          <StatsCard
            key={stat.id}
            titulo={stat.titulo}
            valor={stat.valor}
            subtitulo={stat.subtitulo}
            iconName={stat.iconName}
            trend={stat.trend}
            trendValue={stat.trendValue}
            color={stat.color}
            variant={variant}
            badge={stat.badge}
            gradient={gradient}
          />
        ))}
      </div>
    </div>
  );
};