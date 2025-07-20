
import { Check, Clock, ChevronDown, ChevronUp, Play, Sparkles } from 'lucide-react';
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
        "w-full rounded-xl border transition-all duration-300 hover-lift overflow-hidden",
        completada
          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm"
          : "bg-card border-border shadow-sm hover:shadow-md"
      )}
    >
      <button
        onClick={handleCardClick}
        className="w-full p-4 hover:bg-muted/20 transition-all duration-300 rounded-xl"
      >
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative",
            completada 
              ? "bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg" 
              : "bg-gradient-to-r from-primary to-primary-glow shadow-md hover:shadow-lg"
          )}>
            {completada ? (
              <div className="relative">
                <Check size={20} className="text-white" />
                <Sparkles size={12} className="text-white/70 absolute -top-1 -right-1" />
              </div>
            ) : (
              <div className="text-white">
                {icon}
              </div>
            )}
          </div>
          
          <div className="flex-1 text-left">
            <h3 className={cn(
              "font-semibold text-base",
              completada ? "text-green-700" : "text-foreground"
            )}>
              {titulo}
            </h3>
            
            <div className="flex items-center gap-2 mt-2">
              {completada ? (
                <>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700">
                    <Check size={12} />
                    <span className="text-xs font-medium">Concluído</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-green-300" />
                  <span className="text-xs text-green-600">+10 pontos</span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock size={12} />
                    <span className="text-xs">{tempo}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span className="text-xs text-primary font-medium">Clique para expandir</span>
                </>
              )}
            </div>
          </div>

          <div className={cn(
            "text-muted-foreground transition-transform duration-300",
            expandido && "rotate-180"
          )}>
            <ChevronDown size={20} />
          </div>
        </div>
      </button>

      {expandido && (
        <div className="px-4 pb-4 pt-2 border-t border-border/30 bg-muted/20 animate-fade-in">
          <div className="space-y-3">
            <div className={cn(
              "p-3 rounded-lg text-sm",
              completada 
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-background text-muted-foreground"
            )}>
              {completada 
                ? "🎉 Parabéns! Atividade concluída com sucesso. Você pode revisitá-la quando quiser para reforçar o aprendizado."
                : `📚 Complete esta atividade em aproximadamente ${tempo}. Cada passo te aproxima mais do seu crescimento espiritual.`
              }
            </div>
            
            <button
              onClick={handleIniciarClick}
              className={cn(
                "w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 hover-lift",
                completada
                  ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:shadow-lg"
                  : "bg-gradient-to-r from-primary to-primary-glow text-white hover:shadow-glow"
              )}
            >
              <Play size={16} />
              {completada ? "Revisar Conteúdo" : "Iniciar Atividade"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
