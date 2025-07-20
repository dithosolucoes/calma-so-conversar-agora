
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AtividadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  titulo: string;
  conteudo: string;
  tipo: 'devocional' | 'passagem' | 'quiz' | 'oracao';
  quiz?: {
    pergunta: string;
    opcoes: string[];
    resposta_correta: string;
  };
}

export const AtividadeModal = ({ 
  isOpen, 
  onClose, 
  titulo, 
  conteudo, 
  tipo,
  quiz 
}: AtividadeModalProps) => {
  if (!isOpen) return null;

  const renderConteudo = () => {
    switch (tipo) {
      case 'quiz':
        return quiz ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{quiz.pergunta}</h3>
            <div className="space-y-2">
              {quiz.opcoes.map((opcao, index) => (
                <button
                  key={index}
                  className="w-full p-3 text-left rounded-lg border border-border hover:border-primary transition-colors"
                >
                  {opcao}
                </button>
              ))}
            </div>
          </div>
        ) : null;
      default:
        return (
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {conteudo}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">{titulo}</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-4 pb-20 overflow-y-auto">
        {renderConteudo()}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button 
          onClick={onClose} 
          className="w-full"
        >
          {tipo === 'quiz' ? 'Responder' : 'Concluir'}
        </Button>
      </div>
    </div>
  );
};
