
import { Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AtividadeCardProps {
  titulo: string;
  icon: React.ReactNode;
  tempo: string;
  completada: boolean;
  onClick: () => void;
}

export const AtividadeCard = ({ titulo, icon, tempo, completada, onClick }: AtividadeCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-lg border transition-all hover:scale-[1.02]",
        completada
          ? "bg-green-50 border-green-200 text-green-700"
          : "bg-background border-border hover:border-primary/50"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          completada ? "bg-green-100" : "bg-muted"
        )}>
          {icon}
        </div>
        
        <div className="flex-1 text-left">
          <h3 className={cn(
            "font-medium",
            completada && "line-through"
          )}>
            {titulo}
          </h3>
          
          <div className="flex items-center gap-1 mt-1">
            {completada ? (
              <>
                <Check size={14} className="text-green-600" />
                <span className="text-sm text-green-600">Concluído</span>
              </>
            ) : (
              <>
                <Clock size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{tempo}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
