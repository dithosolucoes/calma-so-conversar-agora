import { Check, Clock, ChevronDown, ChevronUp, Play, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { TemplateConfig } from '@/types/template';

interface CustomAtividadeCardProps {
  titulo: string;
  icon: React.ReactNode;
  tempo: string;
  completada: boolean;
  onClick: () => void;
  template: TemplateConfig;
}

export const CustomAtividadeCard = ({ titulo, icon, tempo, completada, onClick, template }: CustomAtividadeCardProps) => {
  const [expandido, setExpandido] = useState(false);

  const handleCardClick = () => {
    setExpandido(!expandido);
  };

  const handleIniciarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const getCardBordas = () => {
    switch (template.cardsAtividade.bordas) {
      case 'retas': return 'rounded-none';
      case 'arredondadas': return 'rounded-lg';
      case 'muito-arredondadas': return 'rounded-xl';
      default: return 'rounded-xl';
    }
  };

  const getCardSombra = () => {
    switch (template.cardsAtividade.sombra) {
      case 'nenhuma': return '';
      case 'suave': return 'shadow-sm';
      case 'media': return 'shadow-md';
      case 'forte': return 'shadow-lg';
      default: return 'shadow-sm';
    }
  };

  return (
    <div
      className={cn(
        "w-full border transition-all duration-300 overflow-hidden",
        getCardBordas(),
        getCardSombra(),
        template.cardsAtividade.animacao && "hover:scale-105"
      )}
      style={{
        backgroundColor: completada 
          ? `hsl(${template.cores.accent} / 0.1)` 
          : `hsl(${template.cores.card})`,
        borderColor: completada 
          ? `hsl(${template.cores.accent} / 0.3)` 
          : `hsl(${template.cores.secondary})`
      }}
    >
      <button
        onClick={handleCardClick}
        className="w-full p-4 transition-all duration-300"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = `hsl(${template.cores.secondary} / 0.2)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div className="flex items-center gap-4">
          <div 
            className={cn(
              "w-12 h-12 flex items-center justify-center transition-all duration-300 relative",
              getCardBordas()
            )}
            style={{
              backgroundColor: completada 
                ? `hsl(${template.cores.accent})` 
                : `hsl(${template.cores.primary})`,
              boxShadow: template.cardsAtividade.sombra !== 'nenhuma' 
                ? `0 4px 12px hsl(${template.cores.primary} / 0.3)` 
                : undefined
            }}
          >
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
            <h3 
              className="font-semibold text-base"
              style={{ 
                color: completada 
                  ? `hsl(${template.cores.accent})` 
                  : `hsl(${template.cores.text})` 
              }}
            >
              {titulo}
            </h3>
            
            <div className="flex items-center gap-2 mt-2">
              {completada ? (
                <>
                  <div 
                    className="flex items-center gap-1 px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: `hsl(${template.cores.accent} / 0.2)`,
                      color: `hsl(${template.cores.accent})`
                    }}
                  >
                    <Check size={12} />
                    <span className="text-xs font-medium">Concluído</span>
                  </div>
                  <div 
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: `hsl(${template.cores.accent} / 0.5)` }}
                  />
                  <span 
                    className="text-xs"
                    style={{ color: `hsl(${template.cores.accent})` }}
                  >
                    +10 pontos
                  </span>
                </>
              ) : (
                <>
                  <div 
                    className="flex items-center gap-1"
                    style={{ color: `hsl(${template.cores.text} / 0.7)` }}
                  >
                    <Clock size={12} />
                    <span className="text-xs">{tempo}</span>
                  </div>
                  <div 
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: `hsl(${template.cores.text} / 0.3)` }}
                  />
                  <span 
                    className="text-xs font-medium"
                    style={{ color: `hsl(${template.cores.primary})` }}
                  >
                    Clique para expandir
                  </span>
                </>
              )}
            </div>
          </div>

          <div 
            className={cn(
              "transition-transform duration-300",
              expandido && "rotate-180"
            )}
            style={{ color: `hsl(${template.cores.text} / 0.6)` }}
          >
            <ChevronDown size={20} />
          </div>
        </div>
      </button>

      {expandido && (
        <div 
          className="px-4 pb-4 pt-2 border-t animate-fade-in"
          style={{
            borderColor: `hsl(${template.cores.secondary} / 0.3)`,
            backgroundColor: `hsl(${template.cores.secondary} / 0.2)`
          }}
        >
          <div className="space-y-3">
            <div 
              className="p-3 rounded-lg text-sm border"
              style={{
                backgroundColor: completada 
                  ? `hsl(${template.cores.accent} / 0.1)` 
                  : `hsl(${template.cores.background})`,
                color: completada 
                  ? `hsl(${template.cores.accent})` 
                  : `hsl(${template.cores.text} / 0.7)`,
                borderColor: completada 
                  ? `hsl(${template.cores.accent} / 0.2)` 
                  : `hsl(${template.cores.secondary})`
              }}
            >
              {completada 
                ? "🎉 Parabéns! Atividade concluída com sucesso. Você pode revisitá-la quando quiser para reforçar o aprendizado."
                : `📚 Complete esta atividade em aproximadamente ${tempo}. Cada passo te aproxima mais do seu crescimento espiritual.`
              }
            </div>
            
            <button
              onClick={handleIniciarClick}
              className={cn(
                "w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300",
                template.cardsAtividade.animacao && "hover:scale-105"
              )}
              style={{
                backgroundColor: completada 
                  ? `hsl(${template.cores.accent})` 
                  : `hsl(${template.cores.primary})`,
                color: 'white',
                boxShadow: template.cardsAtividade.sombra !== 'nenhuma' 
                  ? `0 4px 20px hsl(${completada ? template.cores.accent : template.cores.primary} / 0.4)` 
                  : undefined
              }}
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