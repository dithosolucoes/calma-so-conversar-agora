
import { useState } from 'react';
import { Heart, Book, BookOpen, HelpCircle, Users, Sparkles, Calendar } from 'lucide-react';
import { JornadaDias } from '@/components/hoje/WeekStreak';
import { AtividadeCard } from '@/components/hoje/AtividadeCard';
import { AtividadeModal } from '@/components/modais/AtividadeModal';
import { mockUsuario, mockJornada } from '@/data/mockData';
import { AtividadeStatus } from '@/types/devocional';

export const HojeTela = () => {
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

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Cabeçalho */}
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center shadow-lg">
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold gradient-text">Olá, {mockUsuario.nome}!</h1>
            <p className="text-sm text-muted-foreground">Que bom te ver aqui hoje</p>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-4 border shadow-sm hover-lift">
          <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <Calendar size={16} />
            Progresso da sua jornada:
          </p>
          <JornadaDias 
            diasTotais={mockJornada.duracao} 
            diaAtual={mockUsuario.dia_atual} 
          />
        </div>
      </div>

      {/* Card Principal do Dia */}
      <div className="bg-card rounded-xl p-6 shadow-lg border hover-lift animate-scale-in glass-effect">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
              <Calendar size={14} />
              {dataAtual}
            </div>
            <h2 className="text-xl font-semibold gradient-text">{diaAtual.tema}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Dia {mockUsuario.dia_atual} de {mockJornada.duracao}
            </p>
          </div>
          <button className="p-3 rounded-full hover:bg-muted/50 transition-all hover-lift group">
            <Heart size={20} className="text-muted-foreground group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Cards de Atividade */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h3 className="font-medium text-foreground">Atividades de hoje</h3>
          </div>
          
          {atividades.map((atividade, index) => (
            <div 
              key={atividade.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
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
