import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Importar toda a biblioteca
import {
  Badge,
  Icon,
  DevotionalIcons,
  Typography,
  Title,
  Text,
  Caption,
  LoadingSpinner,
  DevotionalCard,
  ProgressTracker,
  StatsCard,
  AchievementCard,
  ActivitySection,
  StatsGrid,
  AchievementGrid,
  ScreenHeader,
  ScreenLayout,
  templateBuilder,
  designTokens,
  applyColorScheme
} from '@/components/biblioteca';

export const BibliotecaPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('aurora');

  // Dados de exemplo
  const atividadesExemplo = [
    {
      id: '1',
      titulo: 'Devocional Matinal',
      tipo: 'devocional' as const,
      tempo: '5 min',
      completada: true,
      conteudo: 'Reflexão sobre gratidão e propósito',
    },
    {
      id: '2',
      titulo: 'Leitura Bíblica',
      tipo: 'passagem' as const,
      tempo: '10 min',
      completada: false,
      progresso: 60,
    },
    {
      id: '3',
      titulo: 'Quiz Semanal',
      tipo: 'quiz' as const,
      tempo: '3 min',
      completada: false,
    },
  ];

  const statsExemplo = [
    {
      id: '1',
      titulo: 'Streak Atual',
      valor: '12 dias',
      iconName: 'Flame' as const,
      color: 'success' as const,
      trend: 'up' as const,
      trendValue: '+2',
    },
    {
      id: '2',
      titulo: 'Atividades Completas',
      valor: '87',
      iconName: 'Check' as const,
      color: 'default' as const,
    },
    {
      id: '3',
      titulo: 'Pontos',
      valor: '1,240',
      iconName: 'Star' as const,
      color: 'default' as const,
    },
  ];

  const conquistasExemplo = [
    {
      id: '1',
      titulo: 'Primeira Semana',
      descricao: 'Complete 7 dias consecutivos',
      icon: 'Trophy' as const,
      desbloqueada: true,
      raridade: 'comum' as const,
      dataDesbloqueio: '15 Jan 2024',
    },
    {
      id: '2',
      titulo: 'Estudioso',
      descricao: 'Complete 50 atividades',
      icon: 'BookOpen' as const,
      desbloqueada: false,
      progresso: 74,
      raridade: 'raro' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <ScreenHeader
          titulo="Biblioteca de Componentes"
          subtitulo="Sistema hierárquico completo para construção de templates"
          variant="default"
          gradient={true}
        />

        <Tabs defaultValue="elementos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="elementos">Elementos</TabsTrigger>
            <TabsTrigger value="funcionais">Funcionais</TabsTrigger>
            <TabsTrigger value="secoes">Seções</TabsTrigger>
            <TabsTrigger value="layouts">Layouts</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
          </TabsList>

          {/* ELEMENTOS BÁSICOS */}
          <TabsContent value="elementos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="devocional">Devocional</Badge>
                  <Badge variant="oracao">Oração</Badge>
                  <Badge variant="completado">Completado</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tipografia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Title level={1}>Título H1</Title>
                <Title level={2}>Título H2</Title>
                <Text>Texto padrão do corpo</Text>
                <Caption>Texto de caption</Caption>
                <Typography variant="quote">
                  "Esta é uma citação de exemplo"
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ícones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Icon name={DevotionalIcons.book} size={24} />
                  <Icon name={DevotionalIcons.pray} size={24} />
                  <Icon name={DevotionalIcons.quiz} size={24} />
                  <Icon name={DevotionalIcons.completed} size={24} />
                  <Icon name={DevotionalIcons.star} size={24} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* COMPONENTES FUNCIONAIS */}
          <TabsContent value="funcionais" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cards Devocionais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {atividadesExemplo.map(atividade => (
                  <DevotionalCard
                    key={atividade.id}
                    titulo={atividade.titulo}
                    tipo={atividade.tipo}
                    tempo={atividade.tempo}
                    completada={atividade.completada}
                    progresso={atividade.progresso}
                    conteudo={atividade.conteudo}
                    onClick={() => console.log('Clicked', atividade.titulo)}
                    showProgress={true}
                  />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Tracker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ProgressTracker
                  diasTotais={21}
                  diaAtual={12}
                  variant="default"
                  showLabels={true}
                />
                <ProgressTracker
                  diasTotais={21}
                  diaAtual={12}
                  variant="compact"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stats Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {statsExemplo.map(stat => (
                    <StatsCard
                      key={stat.id}
                      titulo={stat.titulo}
                      valor={stat.valor}
                      iconName={stat.iconName}
                      color={stat.color}
                      trend={stat.trend}
                      trendValue={stat.trendValue}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEÇÕES */}
          <TabsContent value="secoes" className="space-y-6">
            <ActivitySection
              titulo="Atividades de Hoje"
              atividades={atividadesExemplo}
              onActivityClick={(atividade) => console.log('Activity clicked:', atividade)}
              showProgress={true}
              variant="default"
            />

            <StatsGrid
              titulo="Estatísticas"
              stats={statsExemplo}
              columns={3}
              gradient={true}
            />

            <AchievementGrid
              titulo="Conquistas"
              achievements={conquistasExemplo}
              columns={2}
              showFilter={true}
              showStats={true}
            />
          </TabsContent>

          {/* LAYOUTS */}
          <TabsContent value="layouts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Screen Headers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ScreenHeader
                  titulo="Header Padrão"
                  subtitulo="Com subtítulo e ícone"
                  variant="default"
                />
                
                <ScreenHeader
                  titulo="Bom dia!"
                  userName="João"
                  variant="greeting"
                  gradient={true}
                />
                
                <ScreenHeader
                  titulo="Header Minimal"
                  variant="minimal"
                  badge={{ text: "Beta", variant: "secondary" }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* TEMPLATES */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Builder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(templateBuilder.presets).map(([key, template]) => (
                    <Button
                      key={key}
                      variant={selectedTemplate === key ? "default" : "outline"}
                      onClick={() => setSelectedTemplate(key)}
                      className="h-auto p-4 flex flex-col gap-2"
                    >
                      <span className="font-semibold">{template.nome}</span>
                      <span className="text-xs opacity-70">{template.categoria}</span>
                    </Button>
                  ))}
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Preview: {templateBuilder.presets[selectedTemplate as keyof typeof templateBuilder.presets].nome}</h4>
                  <div 
                    className="p-4 rounded space-y-2 bg-primary/10 border-primary/20 border"
                  >
                    <Typography variant="h3" color="primary">
                      Título do Template
                    </Typography>
                    <Typography color="muted">
                      Este é um exemplo de como o template ficaria com as cores aplicadas.
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DESIGN TOKENS */}
          <TabsContent value="tokens" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Esquemas de Cores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(designTokens.colors.schemes).map(([name, scheme]) => (
                  <div key={name} className="space-y-2">
                    <h4 className="font-semibold capitalize">{name}</h4>
                    <div className="flex gap-2">
                      <div 
                        className="w-20 h-10 rounded border"
                        style={{ backgroundColor: scheme.primary }}
                        title={`Primary: ${scheme.primary}`}
                      />
                      <div 
                        className="w-20 h-10 rounded border"
                        style={{ backgroundColor: scheme.secondary }}
                        title={`Secondary: ${scheme.secondary}`}
                      />
                      <div 
                        className="w-20 h-10 rounded border"
                        style={{ backgroundColor: scheme.accent }}
                        title={`Accent: ${scheme.accent}`}
                      />
                      <div 
                        className="w-20 h-10 rounded border"
                        style={{ backgroundColor: scheme.background }}
                        title={`Background: ${scheme.background}`}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};