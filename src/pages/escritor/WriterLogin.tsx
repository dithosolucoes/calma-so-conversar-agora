
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWriterAuth } from '@/contexts/WriterAuthContext';
import { PenTool, BookOpen } from 'lucide-react';

export const WriterLogin = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: ''
  });
  const { login } = useWriterAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
    navigate('/escritor/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
            <PenTool size={24} className="text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl gradient-text flex items-center justify-center gap-2">
              <BookOpen size={24} />
              Plataforma do Escritor
            </CardTitle>
            <CardDescription className="mt-2">
              Acesse sua área de criação de conteúdo devocional
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Escritor</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full" variant="premium">
              Entrar na Plataforma
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
