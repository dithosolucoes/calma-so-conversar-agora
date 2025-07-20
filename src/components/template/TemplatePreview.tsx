
import { Heart, Book, BookOpen, HelpCircle, Users, Sparkles, Calendar } from 'lucide-react';
import { JornadaDias } from '@/components/hoje/WeekStreak';
import { AtividadeCard } from '@/components/hoje/AtividadeCard';
import { TemplateConfig } from '@/types/template';
import { mockUsuario, mockJornada } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface TemplatePreviewProps {
  template: TemplateConfig;
}

export const TemplatePreview = ({ template }: TemplatePreviewProps) => {
  const diaAtual = mockJornada.dias[mockUsuario.dia_atual - 1];
  const dataAtual = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const atividades = [
    {
      id: 'devocional' as const,
      titulo: 'Devocional',
      icon: <Book size={16} />,
      tempo: '5 min',
    },
    {
      id: 'passagem' as const,
      titulo: 'Passagem',
      icon: <BookOpen size={16} />,
      tempo: '3 min',
    },
    {
      id: 'quiz' as const,
      titulo: 'Quiz',
      icon: <HelpCircle size={16} />,
      tempo: '2 min',
    },
    {
      id: 'oracao' as const,
      titulo: 'Oração',
      icon: <Users size={16} />,
      tempo: '3 min',
    }
  ];

  // Aplicar configurações do template
  const getTituloSize = () => {
    switch (template.tipografia.tamanhoTitulo) {
      case 'pequeno': return 'text-lg';
      case 'medio': return 'text-xl';
      case 'grande': return 'text-2xl';
      default: return 'text-xl';
    }
  };

  const getTituloPeso = () => {
    switch (template.tipografia.pesoTitulo) {
      case 'normal': return 'font-normal';
      case 'semibold': return 'font-semibold';
      case 'bold': return 'font-bold';
      default: return 'font-semibold';
    }
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

  const containerStyle = {
    fontFamily: template.tipografia.fontePrimaria,
    '--primary': template.cores.primary,
    '--secondary': template.cores.secondary,
    '--accent': template.cores.accent,
    '--background': template.cores.background,
    '--card': template.cores.card,
    '--foreground': template.cores.text,
  } as React.CSSProperties;

  return (
    <div 
      className="w-full max-w-sm mx-auto bg-background text-foreground overflow-hidden scale-75 origin-top"
      style={containerStyle}
    >
      <div className="p-4 pb-16 space-y-4 min-h-[600px]">
        {/* Cabeçalho */}
        {template.layout.cabecalho !== 'minimal' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                template.elementos.gradientes ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-primary"
              )}>
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="flex-1">
                <h1 className={cn(getTituloSize(), getTituloPeso(), "text-foreground")}>
                  Olá, {mockUsuario.nome}!
                </h1>
                {template.layout.cabecalho === 'completo' && (
                  <p className="text-xs text-muted-foreground">Que bom te ver aqui hoje</p>
                )}
              </div>
            </div>
            
            {template.layout.mostrarProgresso && (
              <div className={cn("bg-card p-3 border", getCardBordas(), getCardSombra())}>
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <Calendar size={12} />
                  Progresso da sua jornada:
                </p>
                <JornadaDias 
                  diasTotais={mockJornada.duracao} 
                  diaAtual={mockUsuario.dia_atual} 
                />
              </div>
            )}
          </div>
        )}

        {/* Card Principal do Dia */}
        <div className={cn(
          "bg-card p-4 border",
          getCardBordas(),
          getCardSombra(),
          template.elementos.gradientes && "bg-gradient-to-br from-card to-card/80"
        )}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {template.layout.mostrarData && (
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
                  <Calendar size={10} />
                  {dataAtual}
                </div>
              )}
              <h2 className={cn(
                getTituloSize(),
                getTituloPeso(),
                "text-foreground"
              )}>
                {diaAtual.tema}
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Dia {mockUsuario.dia_atual} de {mockJornada.duracao}
              </p>
            </div>
            {template.layout.estiloBotaoFavorito && (
              <button className="p-2 rounded-full hover:bg-muted/50 transition-colors">
                <Heart size={14} className="text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Cards de Atividade */}
          <div className="space-y-2">
            <div className="flex items-center gap-1 mb-3">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <h3 className="text-sm font-medium text-foreground">Atividades de hoje</h3>
            </div>
            
            {atividades.slice(0, 2).map((atividade) => (
              <div 
                key={atividade.id}
                className={cn(
                  "w-full p-3 border transition-all duration-300",
                  getCardBordas(),
                  getCardSombra(),
                  template.cardsAtividade.estilo === 'compacto' ? 'bg-muted/30' : 'bg-card'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-lg flex items-center justify-center",
                    template.elementos.gradientes ? "bg-gradient-to-r from-primary to-primary-glow" : "bg-primary"
                  )}>
                    <div className="text-white text-xs">
                      {atividade.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-foreground">
                      {atividade.titulo}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-muted-foreground">{atividade.tempo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
