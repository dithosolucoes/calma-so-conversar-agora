
import { Check, Clock, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface AtividadeCardProps {
  titulo: string;
  icon: React.ReactNode;
  tempo: string;
  completada: boolean;
  onClick: () => void;
}

export const AtividadeCard = ({ titulo, icon, tempo, completada, onClick }: AtividadeCardProps) => {
  const [expandido, setExpandido] = useState(false);

  const handleCardClick = () => {
    setExpandido(!expandido);
  };

  const handleIniciarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      className={cn(
        "w-full rounded-lg border transition-all",
        completada
          ? "bg-green-50 border-green-200 text-green-700"
          : "bg-background border-border"
      )}
    >
      <button
        onClick={handleCardClick}
        className="w-full p-4 hover:bg-muted/30 transition-colors rounded-lg"
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

          <div className="text-muted-foreground">
            {expandido ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </button>

      {expandido && (
        <div className="px-4 pb-4 pt-2 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-3">
            {completada 
              ? "Atividade concluída! Você pode revisitá-la quando quiser."
              : `Complete esta atividade em aproximadamente ${tempo}.`
            }
          </p>
          
          <button
            onClick={handleIniciarClick}
            className={cn(
              "w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 font-medium transition-colors",
              completada
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Play size={16} />
            {completada ? "Revisar" : "Iniciar"}
          </button>
        </div>
      )}
    </div>
  );
};
