
import { TrendingUp, Calendar, Target, Award, Flame, Clock, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsuario, mockJornada } from '@/data/mockData';

export const CrescimentoTela = () => {
  const progresso = Math.round((mockUsuario.dia_atual / mockJornada.duracao) * 100);
  const diasRestantes = mockJornada.duracao - mockUsuario.dia_atual;
  const streak = 5; // Mock streak
  const pontos = 150; // Mock pontos

  const conquistas = [
    { icon: Flame, titulo: "Primeira Semana", descricao: "7 dias consecutivos", desbloqueada: true },
    { icon: Target, titulo: "Dedicado", descricao: "15 atividades completas", desbloqueada: true },
    { icon: Award, titulo: "Perseverante", descricao: "30 dias de jornada", desbloqueada: false }
  ];

  return (
    <div className="p-4 pb-20 space-y-6 min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold gradient-text">Seu Crescimento</h1>
            <p className="text-sm text-muted-foreground">Acompanhe sua evolução espiritual</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 animate-slide-up">
        <Card className="hover-lift glass-effect">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
              <Flame size={20} className="text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{streak}</div>
            <div className="text-xs text-muted-foreground">dias em sequência</div>
          </CardContent>
        </Card>

        <Card className="hover-lift glass-effect">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
              <Award size={20} className="text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{pontos}</div>
            <div className="text-xs text-muted-foreground">pontos ganhos</div>
          </CardContent>
        </Card>
      </div>

      {/* Progresso da Jornada */}
      <Card className="hover-lift animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 size={20} className="text-primary" />
            Progresso da Jornada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Concluído</span>
              <span className="text-sm text-primary font-bold">{progresso}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-1000 ease-out shadow-glow"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{mockUsuario.dia_atual}</div>
              <div className="text-xs text-muted-foreground">dias concluídos</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-muted-foreground">{diasRestantes}</div>
              <div className="text-xs text-muted-foreground">dias restantes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conquistas */}
      <Card className="hover-lift animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award size={20} className="text-primary" />
            Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {conquistas.map((conquista, index) => {
            const Icon = conquista.icon;
            return (
              <div 
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover-lift ${
                  conquista.desbloqueada 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                    : 'bg-muted/30 border-muted'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  conquista.desbloqueada 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-md' 
                    : 'bg-muted'
                }`}>
                  <Icon size={18} className={conquista.desbloqueada ? 'text-white' : 'text-muted-foreground'} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${conquista.desbloqueada ? 'text-green-700' : 'text-muted-foreground'}`}>
                    {conquista.titulo}
                  </h4>
                  <p className="text-xs text-muted-foreground">{conquista.descricao}</p>
                </div>
                {conquista.desbloqueada && (
                  <div className="text-green-600 text-xs font-medium px-2 py-1 bg-green-100 rounded-full">
                    ✓ Desbloqueada
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
