
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeekStreakProps {
  streak: number[]; // Array de 7 elementos (0 ou 1)
}

export const WeekStreak = ({ streak }: WeekStreakProps) => {
  const diasSemana = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {diasSemana.map((dia, index) => (
          <div
            key={index}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
              streak[index] === 1
                ? "bg-orange-500 text-white"
                : "bg-muted text-muted-foreground"
            )}
          >
            {streak[index] === 1 ? (
              <Flame size={14} />
            ) : (
              dia
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
