
import { useState } from 'react';
import { Heart, Book, BookOpen, HelpCircle, Users } from 'lucide-react';
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
    <div className="p-4 pb-20 space-y-6">
      {/* Cabeçalho */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Olá, {mockUsuario.nome}!</h1>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Sua jornada:</p>
          <JornadaDias 
            diasTotais={mockJornada.duracao} 
            diaAtual={mockUsuario.dia_atual} 
          />
        </div>
      </div>

      {/* Card Principal do Dia */}
      <div className="bg-card rounded-xl p-6 shadow-sm border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground capitalize">{dataAtual}</p>
            <h2 className="text-xl font-semibold mt-1">{diaAtual.tema}</h2>
          </div>
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <Heart size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Cards de Atividade */}
        <div className="space-y-3">
          {atividades.map((atividade) => (
            <AtividadeCard
              key={atividade.id}
              titulo={atividade.titulo}
              icon={atividade.icon}
              tempo={atividade.tempo}
              completada={atividadesStatus[atividade.id]}
              onClick={() => abrirModal(atividade)}
            />
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
