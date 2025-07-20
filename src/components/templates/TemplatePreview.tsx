
import { useState } from 'react';
import { Heart, Book, BookOpen, HelpCircle, Users, Sparkles, Calendar } from 'lucide-react';
import { JornadaDias } from '@/components/hoje/WeekStreak';
import { AtividadeCard } from '@/components/hoje/AtividadeCard';
import { mockUsuario, mockJornada } from '@/data/mockData';
import { TemplateStyle } from '@/types/template';
import { cn } from '@/lib/utils';

interface TemplatePreviewProps {
  template: TemplateStyle;
  className?: string;
}

export const TemplatePreview = ({ template, className }: TemplatePreviewProps) => {
  const [atividadesStatus] = useState({
    devocional: false,
    passagem: false,
    quiz: false,
    oracao: false
  });

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
      conteudo: diaAtual.devocional
    },
    {
      id: 'passagem' as const,
      titulo: 'Passagem',
      icon: <BookOpen size={16} />,
      tempo: '3 min',
      conteudo: diaAtual.passagem
    },
    {
      id: 'quiz' as const,
      titulo: 'Quiz',
      icon: <HelpCircle size={16} />,
      tempo: '2 min',
      conteudo: ''
    },
    {
      id: 'oracao' as const,
      titulo: 'Oração',
      icon: <Users size={16} />,
      tempo: '3 min',
      conteudo: diaAtual.oracao
    }
  ];

  // Aplicar estilos do template via CSS custom properties
  const templateStyles = {
    '--template-primary': template.cores.primary,
    '--template-primary-glow': template.cores.primaryGlow,
    '--template-background': template.cores.background,
    '--template-card': template.cores.card,
    '--template-accent': template.cores.accent,
    '--template-radius': template.layout.cardRadius,
    '--template-spacing': template.layout.spacing,
    '--template-shadow': template.layout.shadow,
    '--template-font': template.tipografia.fontFamily,
    '--template-title-size': template.tipografia.fontSize.titulo,
    '--template-text-size': template.tipografia.fontSize.texto,
  } as React.CSSProperties;

  return (
    <div 
      className={cn(
        "w-full max-w-sm mx-auto bg-white rounded-xl shadow-xl overflow-hidden border-8 border-gray-200",
        "template-preview",
        className
      )}
      style={templateStyles}
    >
      {/* Status Bar Simulado */}
      <div className="bg-black text-white text-xs px-4 py-1 flex justify-between items-center">
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-2 bg-white rounded-sm"></div>
          <div className="w-4 h-2 bg-white rounded-sm"></div>
          <div className="w-4 h-2 bg-white rounded-sm"></div>
        </div>
      </div>

      {/* Conteúdo da HojeTela com estilos do template */}
      <div 
        className="p-3 pb-16 space-y-4 h-96 overflow-y-auto"
        style={{ 
          backgroundColor: template.cores.background,
          fontFamily: template.tipografia.fontFamily 
        }}
      >
        {/* Cabeçalho */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${template.cores.primary}, ${template.cores.primaryGlow})` 
              }}
            >
              <Sparkles size={14} className="text-white" />
            </div>
            <div className="flex-1">
              <h1 
                className="font-bold"
                style={{ 
                  fontSize: template.tipografia.fontSize.titulo,
                  background: `linear-gradient(135deg, ${template.cores.primary}, ${template.cores.primaryGlow})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Olá, {mockUsuario.nome}!
              </h1>
              <p className="text-xs text-gray-600">Que bom te ver aqui hoje</p>
            </div>
          </div>
          
          <div 
            className="rounded-lg p-3 border"
            style={{ 
              backgroundColor: template.cores.card,
              borderRadius: template.layout.cardRadius,
              boxShadow: template.layout.shadow
            }}
          >
            <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
              <Calendar size={12} />
              Progresso da sua jornada:
            </p>
            <JornadaDias 
              diasTotais={mockJornada.duracao} 
              diaAtual={mockUsuario.dia_atual} 
            />
          </div>
        </div>

        {/* Card Principal do Dia */}
        <div 
          className="rounded-lg p-4 border"
          style={{ 
            backgroundColor: template.cores.card,
            borderRadius: template.layout.cardRadius,
            boxShadow: template.layout.shadow
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div 
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-2"
                style={{ 
                  backgroundColor: `${template.cores.primary}1a`,
                  color: template.cores.primary
                }}
              >
                <Calendar size={10} />
                {dataAtual.slice(0, 20)}...
              </div>
              <h2 
                className="font-semibold"
                style={{ 
                  fontSize: template.tipografia.fontSize.subtitulo,
                  background: `linear-gradient(135deg, ${template.cores.primary}, ${template.cores.primaryGlow})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {diaAtual.tema}
              </h2>
              <p className="text-xs text-gray-600">
                Dia {mockUsuario.dia_atual} de {mockJornada.duracao}
              </p>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Heart size={14} className="text-gray-400" />
            </button>
          </div>

          {/* Mini Cards de Atividade */}
          <div className="space-y-2">
            <div className="flex items-center gap-1 mb-3">
              <div 
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: template.cores.primary }}
              />
              <h3 className="font-medium text-sm">Atividades de hoje</h3>
            </div>
            
            {atividades.map((atividade) => (
              <div 
                key={atividade.id}
                className="flex items-center gap-3 p-2 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ borderRadius: template.layout.cardRadius }}
              >
                <div 
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${template.cores.primary}, ${template.cores.primaryGlow})` 
                  }}
                >
                  <div className="text-white">
                    {atividade.icon}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{atividade.titulo}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>{atividade.tempo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Simulado */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t px-4 py-2">
        <div className="flex justify-around">
          <div className="flex flex-col items-center gap-1">
            <div 
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: template.cores.primary }}
            />
            <span className="text-xs">Hoje</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 rounded-full bg-gray-200" />
            <span className="text-xs">Crescimento</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 rounded-full bg-gray-200" />
            <span className="text-xs">Perfil</span>
          </div>
        </div>
      </div>
    </div>
  );
};
