
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { mockJornada } from '@/data/mockData';

export const Sucesso = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Redirecionar se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleIniciarJornada = () => {
    navigate('/app');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        {/* Ícone de Sucesso */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-20"></div>
          <div className="relative w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle size={40} className="text-white" />
          </div>
        </div>

        {/* Mensagem de Boas-vindas */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Bem-vindo(a), {user.nome.split(' ')[0]}! 🎉
          </h1>
          <p className="text-muted-foreground">
            Sua inscrição foi confirmada com sucesso
          </p>
        </div>

        {/* Detalhes da Jornada */}
        <div className="bg-card border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 justify-center">
            <Sparkles size={20} className="text-primary" />
            <span className="font-medium">Sua Jornada Espiritual</span>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{mockJornada.titulo}</h3>
            <p className="text-sm text-muted-foreground">
              {mockJornada.duracao} dias de crescimento espiritual
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            ✓ Devocionais diários personalizados<br />
            ✓ Passagens bíblicas selecionadas<br />
            ✓ Quiz interativo para fixação<br />
            ✓ Orações guiadas
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Button
            onClick={handleIniciarJornada}
            className="w-full py-3 text-lg"
            size="lg"
          >
            <div className="flex items-center gap-2">
              Começar Primeiro Dia
              <ArrowRight size={20} />
            </div>
          </Button>

          <p className="text-xs text-muted-foreground">
            Você pode acessar sua jornada a qualquer momento
          </p>
        </div>
      </div>
    </div>
  );
};
