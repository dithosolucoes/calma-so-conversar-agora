
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { BookOpen, Users, TrendingUp, DollarSign, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const WriterDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Jornadas Criadas',
      value: '3',
      description: '+1 este mês',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      title: 'Usuários Ativos',
      value: '124',
      description: '+12% vs mês anterior',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Engajamento',
      value: '87%',
      description: 'Taxa de conclusão',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Receita Total',
      value: 'R$ 2.480',
      description: '+23% este mês',
      icon: DollarSign,
      color: 'text-green-600'
    }
  ];

  return (
    <WriterLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral da sua plataforma de conteúdo</p>
          </div>
          <Button onClick={() => navigate('/escritor/jornadas/nova')} variant="premium">
            <Plus size={20} />
            Nova Jornada
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover-lift cursor-pointer" onClick={() => navigate('/escritor/jornadas/nova')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={20} />
                Criar Nova Jornada
              </CardTitle>
              <CardDescription>
                Comece uma nova jornada devocional para seus leitores
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover-lift cursor-pointer" onClick={() => navigate('/escritor/templates')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={20} />
                Usar Template
              </CardTitle>
              <CardDescription>
                Escolha um template pronto e personalize rapidamente
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover-lift cursor-pointer" onClick={() => navigate('/escritor/produtos')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign size={20} />
                Gerenciar Produtos
              </CardTitle>
              <CardDescription>
                Configure preços e publique suas jornadas
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas interações com suas jornadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div className="flex-1">
                  <p className="font-medium">Nova compra da jornada "21 Dias de Fé"</p>
                  <p className="text-sm text-muted-foreground">há 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">Usuário completou dia 7 de "Crescimento Espiritual"</p>
                  <p className="text-sm text-muted-foreground">há 4 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <div className="flex-1">
                  <p className="font-medium">Nova avaliação 5 estrelas recebida</p>
                  <p className="text-sm text-muted-foreground">ontem</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </WriterLayout>
  );
};
