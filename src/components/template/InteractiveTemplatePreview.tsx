
import { useState } from 'react';
import { Heart, Book, BookOpen, HelpCircle, Users, Sparkles, Calendar } from 'lucide-react';
import { JornadaDias } from '@/components/hoje/WeekStreak';
import { AtividadeCard } from '@/components/hoje/AtividadeCard';
import { AtividadeModal } from '@/components/modais/AtividadeModal';
import { TemplateConfig } from '@/types/template';
import { mockUsuario, mockJornada } from '@/data/mockData';
import { AtividadeStatus } from '@/types/devocional';
import { cn } from '@/lib/utils';

interface InteractiveTemplatePreviewProps {
  template: TemplateConfig;
}

export const InteractiveTemplatePreview = ({ template }: InteractiveTemplatePreviewProps) => {
  const [atividadesStatus, setAtividadesStatus] = useState<AtividadeStatus>({
    devocional: false,
    passagem: false,
    quiz: false,
    oracao: false
  });

  const [modalAtivo, setModalAtivo] = useState<{
    tipo: 'devocional' | 'passagem' | 'quiz' | 'oracao' | null;
    titulo: string;
    conteudo: string;
  }>({ tipo: null, titulo: '', conteudo: '' });

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
      icon: <Book size={20} />,
      tempo: '5 min',
      conteudo: diaAtual.devocional
    },
    {
      id: 'passagem' as const,
      titulo: 'Passagem',
      icon: <BookOpen size={20} />,
      tempo: '3 min',
      conteudo: diaAtual.passagem
    },
    {
      id: 'quiz' as const,
      titulo: 'Quiz',
      icon: <HelpCircle size={20} />,
      tempo: '2 min',
      conteudo: ''
    },
    {
      id: 'oracao' as const,
      titulo: 'Oração',
      icon: <Users size={20} />,
      tempo: '3 min',
      conteudo: diaAtual.oracao
    }
  ];

  const abrirModal = (atividade: typeof atividades[0]) => {
    setModalAtivo({
      tipo: atividade.id,
      titulo: atividade.titulo,
      conteudo: atividade.conteudo
    });
  };

  const fecharModal = () => {
    if (modalAtivo.tipo) {
      setAtividadesStatus(prev => ({
        ...prev,
        [modalAtivo.tipo!]: true
      }));
    }
    setModalAtivo({ tipo: null, titulo: '', conteudo: '' });
  };

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
    <div className="relative">
      <div 
        className="w-full max-w-sm mx-auto bg-background text-foreground overflow-hidden scale-75 origin-top border rounded-lg"
        style={containerStyle}
      >
        <div className={cn(
          "p-4 pb-20 space-y-6 min-h-[600px]",
          template.elementos.gradientes && "bg-gradient-to-b from-background to-muted/20"
        )}>
          {/* Cabeçalho */}
          {template.layout.cabecalho !== 'minimal' && (
            <div className={cn(
              "space-y-4",
              template.cardsAtividade.animacao && "animate-fade-in"
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shadow-lg",
                  template.elementos.gradientes 
                    ? "bg-gradient-to-r from-primary to-primary-glow" 
                    : "bg-primary"
                )}>
                  <Sparkles size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h1 className={cn(
                    getTituloSize(),
                    getTituloPeso(),
                    template.elementos.gradientes ? "gradient-text" : "text-foreground"
                  )}>
                    Olá, {mockUsuario.nome}!
                  </h1>
                  {template.layout.cabecalho === 'completo' && (
                    <p className="text-sm text-muted-foreground">Que bom te ver aqui hoje</p>
                  )}
                </div>
              </div>
              
              {template.layout.mostrarProgresso && (
                <div className={cn(
                  "bg-card p-4 border",
                  getCardBordas(),
                  getCardSombra(),
                  template.cardsAtividade.animacao && "hover-lift"
                )}>
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                    <Calendar size={16} />
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
            "bg-card p-6 border",
            getCardBordas(),
            getCardSombra(),
            template.cardsAtividade.animacao && "hover-lift animate-scale-in",
            template.elementos.gradientes && "glass-effect"
          )}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                {template.layout.mostrarData && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                    <Calendar size={14} />
                    {dataAtual}
                  </div>
                )}
                <h2 className={cn(
                  getTituloSize(),
                  getTituloPeso(),
                  template.elementos.gradientes ? "gradient-text" : "text-foreground"
                )}>
                  {diaAtual.tema}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Dia {mockUsuario.dia_atual} de {mockJornada.duracao}
                </p>
              </div>
              {template.layout.estiloBotaoFavorito && (
                <button className={cn(
                  "p-3 rounded-full hover:bg-muted/50 transition-all group",
                  template.cardsAtividade.animacao && "hover-lift"
                )}>
                  <Heart size={20} className="text-muted-foreground group-hover:text-red-500 transition-colors" />
                </button>
              )}
            </div>

            {/* Cards de Atividade */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className={cn(
                  "w-2 h-2 rounded-full bg-primary",
                  template.cardsAtividade.animacao && "animate-pulse"
                )} />
                <h3 className="font-medium text-foreground">Atividades de hoje</h3>
              </div>
              
              {atividades.map((atividade, index) => (
                <div 
                  key={atividade.id}
                  className={cn(
                    template.cardsAtividade.animacao && "animate-fade-in"
                  )}
                  style={{ 
                    animationDelay: template.cardsAtividade.animacao ? `${index * 0.1}s` : '0s' 
                  }}
                >
                  <AtividadeCard
                    titulo={atividade.titulo}
                    icon={atividade.icon}
                    tempo={atividade.tempo}
                    completada={atividadesStatus[atividade.id]}
                    onClick={() => abrirModal(atividade)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AtividadeModal
        isOpen={modalAtivo.tipo !== null}
        onClose={fecharModal}
        titulo={modalAtivo.titulo}
        conteudo={modalAtivo.conteudo}
        tipo={modalAtivo.tipo || 'devocional'}
        quiz={modalAtivo.tipo === 'quiz' ? diaAtual.quiz : undefined}
      />
    </div>
  );
};
