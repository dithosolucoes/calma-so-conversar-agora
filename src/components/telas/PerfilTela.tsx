
import { User, Mail, LogOut, Settings, Bell, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { mockUsuario, mockJornada } from '@/data/mockData';

export const PerfilTela = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const configuracoes = [
    { icon: Bell, titulo: "Notificações", descricao: "Gerencie lembretes diários" },
    { icon: Shield, titulo: "Privacidade", descricao: "Configurações de dados" },
    { icon: Settings, titulo: "Preferências", descricao: "Personalizar experiência" }
  ];

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center shadow-lg">
            <User size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold gradient-text">{mockUsuario.nome}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Mail size={14} />
              {mockUsuario.email}
            </p>
          </div>
        </div>
      </div>

      {/* Minha Jornada Ativa */}
      <Card className="hover-lift animate-scale-in glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart size={20} className="text-red-500" />
            Minha Jornada Ativa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20">
            <img 
              src={mockJornada.imagem_capa} 
              alt={mockJornada.titulo}
              className="w-16 h-16 rounded-xl object-cover shadow-md hover-lift"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{mockJornada.titulo}</h3>
              <p className="text-sm text-muted-foreground">
                Dia {mockUsuario.dia_atual} de {mockJornada.duracao}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-500"
                    style={{ width: `${(mockUsuario.dia_atual / mockJornada.duracao) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-primary">
                  {Math.round((mockUsuario.dia_atual / mockJornada.duracao) * 100)}%
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-medium shadow-md">
                ✓ Ativa
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações */}
      <Card className="hover-lift animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={20} className="text-primary" />
            Configurações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {configuracoes.map((config, index) => {
            const Icon = config.icon;
            return (
              <button 
                key={index}
                className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-all hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon size={18} className="text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-foreground">{config.titulo}</h4>
                  <p className="text-xs text-muted-foreground">{config.descricao}</p>
                </div>
                <div className="text-muted-foreground">
                  <Settings size={16} />
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Logout */}
      <Card className="hover-lift animate-slide-up">
        <CardContent className="p-4">
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="w-full flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
          >
            <LogOut size={18} />
            Sair da Conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
