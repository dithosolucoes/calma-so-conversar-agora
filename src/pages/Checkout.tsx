
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { mockJornada } from '@/data/mockData';

export const Checkout = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular processo de checkout
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Fazer login simulado
    login({
      nome: formData.nome,
      email: formData.email,
      jornada_ativa_id: mockJornada.id
    });

    setIsLoading(false);
    navigate('/sucesso');
  };

  const isFormValid = formData.nome && formData.email && formData.senha;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">Finalizar Inscrição</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Resumo da Jornada */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Resumo da Jornada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <img 
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=80&h=60&fit=crop"
                alt={mockJornada.titulo}
                className="w-16 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm">{mockJornada.titulo}</h3>
                <p className="text-xs text-muted-foreground">{mockJornada.duracao} dias</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold text-green-600">Gratuito</span>
            </div>
          </CardContent>
        </Card>

        {/* Formulário */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Seus Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Crie uma Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.senha}
                  onChange={(e) => handleInputChange('senha', e.target.value)}
                  minLength={6}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} />
                    Começar Jornada Gratuita
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Segurança */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
          <CreditCard size={16} />
          <span>Seus dados estão seguros conosco</span>
        </div>
      </div>
    </div>
  );
};
