import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Palette,
  Zap,
  Layout,
  Star,
  Heart,
  Trophy,
  Flame,
  Crown,
  Copy,
  Lightbulb,
  Activity,
  BarChart3
} from 'lucide-react';

// Importar componentes da biblioteca
import {
  Badge as BibliotecaBadge,
  Icon,
  Typography,
  LoadingSpinner,
  DevotionalCard,
  ProgressTracker,
  StatsCard,
  AchievementCard,
  templateBuilder,
  designTokens
} from '@/components/biblioteca';

export default function WriterBiblioteca() {
  const [copiedCode, setCopiedCode] = useState<string>('');

  const copyCode = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const ComponentExample = ({ 
    title, 
    description, 
    component, 
    code 
  }: { 
    title: string; 
    description: string; 
    component: React.ReactNode; 
    code: string; 
  }) => (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyCode(code, title)}
            className="gap-2"
          >
            <Copy size={16} />
            {copiedCode === title ? 'Copiado!' : 'Copiar'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-lg bg-muted/20">
          {component}
        </div>
        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
            Ver código
          </summary>
          <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
            <code>{code}</code>
          </pre>
        </details>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center">
          <Lightbulb size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold gradient-text">Biblioteca de Componentes</h1>
          <p className="text-muted-foreground">Sistema hierárquico completo para criação de produtos devocionais</p>
        </div>
      </div>

      <Tabs defaultValue="elementos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="elementos">Elementos</TabsTrigger>
          <TabsTrigger value="funcionais">Funcionais</TabsTrigger>
          <TabsTrigger value="secoes">Seções</TabsTrigger>
          <TabsTrigger value="layouts">Layouts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* ELEMENTOS BÁSICOS */}
        <TabsContent value="elementos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ComponentExample
              title="Badge"
              description="Marcadores e etiquetas com variantes"
              component={
                <div className="flex flex-wrap gap-2">
                  <BibliotecaBadge variant="default">Padrão</BibliotecaBadge>
                  <BibliotecaBadge variant="success">Sucesso</BibliotecaBadge>
                  <BibliotecaBadge variant="warning">Aviso</BibliotecaBadge>
                  <BibliotecaBadge variant="devocional">Devocional</BibliotecaBadge>
                </div>
              }
              code={`<Badge variant="success">Sucesso</Badge>`}
            />

            <ComponentExample
              title="Ícones"
              description="Sistema de ícones com variantes"
              component={
                <div className="flex items-center gap-4">
                  <Icon name="Heart" size={24} variant="default" />
                  <Icon name="Star" size={24} variant="filled" />
                  <Icon name="Crown" size={24} variant="rounded" />
                </div>
              }
              code={`<Icon name="Heart" size={24} variant="filled" />`}
            />

            <ComponentExample
              title="Typography"
              description="Sistema tipográfico completo"
              component={
                <div className="space-y-2">
                  <Typography variant="h3">Título Principal</Typography>
                  <Typography variant="body">Texto do corpo</Typography>
                  <Typography variant="caption" color="muted">Legenda</Typography>
                </div>
              }
              code={`<Typography variant="h3">Título</Typography>`}
            />

            <ComponentExample
              title="Loading"
              description="Indicadores de carregamento"
              component={
                <div className="flex items-center gap-4">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" text="Carregando..." />
                  <LoadingSpinner size="lg" variant="white" />
                </div>
              }
              code={`<LoadingSpinner size="md" text="Carregando..." />`}
            />
          </div>
        </TabsContent>

        {/* COMPONENTES FUNCIONAIS */}
        <TabsContent value="funcionais" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComponentExample
              title="DevotionalCard"
              description="Cartão de atividade devocional"
              component={
                <DevotionalCard
                  titulo="Salmo da Manhã"
                  tipo="devocional"
                  tempo="5 min"
                  completada={false}
                  progresso={30}
                  conteudo="Uma reflexão matinal sobre gratidão"
                  variant="compact"
                />
              }
              code={`<DevotionalCard
  titulo="Salmo da Manhã"
  tipo="devocional"
  tempo="5 min"
  completada={false}
/>`}
            />

            <ComponentExample
              title="StatsCard"
              description="Cartão de estatísticas"
              component={
                <StatsCard
                  titulo="Sequência"
                  valor="7 dias"
                  icon={Flame}
                  trend="up"
                  trendValue="+2"
                  color="success"
                  variant="compact"
                />
              }
              code={`<StatsCard
  titulo="Sequência"
  valor="7 dias"
  icon={Flame}
  trend="up"
  trendValue="+2"
/>`}
            />

            <ComponentExample
              title="ProgressTracker"
              description="Rastreador de progresso"
              component={
                <ProgressTracker
                  diasTotais={7}
                  diaAtual={3}
                  variant="compact"
                  showLabels={true}
                />
              }
              code={`<ProgressTracker
  diasTotais={7}
  diaAtual={3}
  variant="compact"
/>`}
            />

            <ComponentExample
              title="AchievementCard"
              description="Cartão de conquista"
              component={
                <AchievementCard
                  titulo="Primeiro Passo"
                  descricao="Complete seu primeiro devocional"
                  icon="Trophy"
                  desbloqueada={true}
                  raridade="comum"
                  variant="compact"
                />
              }
              code={`<AchievementCard
  titulo="Primeiro Passo"
  descricao="Complete seu primeiro devocional"
  icon="Trophy"
  desbloqueada={true}
/>`}
            />
          </div>
        </TabsContent>

        {/* SEÇÕES */}
        <TabsContent value="secoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout size={20} />
                Seções de Conteúdo
              </CardTitle>
              <CardDescription>
                Componentes complexos que combinam múltiplos elementos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 border rounded-lg">
                  <Activity size={32} className="mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">ActivitySection</h3>
                  <p className="text-sm text-muted-foreground">Lista de atividades devocionais</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <BarChart3 size={32} className="mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">StatsGrid</h3>
                  <p className="text-sm text-muted-foreground">Grade de estatísticas</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Trophy size={32} className="mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">AchievementGrid</h3>
                  <p className="text-sm text-muted-foreground">Grade de conquistas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LAYOUTS */}
        <TabsContent value="layouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout size={20} />
                Sistemas de Layout
              </CardTitle>
              <CardDescription>
                Estruturas completas para organização de páginas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold">ScreenHeader</h3>
                  <p className="text-sm text-muted-foreground">
                    Cabeçalho responsivo com suporte a avatares, badges e ações
                  </p>
                  <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
{`<ScreenHeader
  titulo="Dashboard"
  subtitulo="Bem-vindo de volta!"
  userName="João"
  badge={{ text: "Pro", variant: "success" }}
/>`}
                  </pre>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold">ScreenLayout</h3>
                  <p className="text-sm text-muted-foreground">
                    Layout completo com header, padding e variantes responsivas
                  </p>
                  <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
{`<ScreenLayout
  titulo="Minha Página"
  variant="centered"
  maxWidth="lg"
  background="gradient"
>
  {children}
</ScreenLayout>`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TEMPLATES */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette size={20} />
                Sistema de Templates
              </CardTitle>
              <CardDescription>
                Templates pré-configurados para diferentes estilos visuais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(templateBuilder.presets).map(([key, preset]) => (
                  <Card key={key} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: designTokens.colors.schemes[preset.colorScheme].primary }}
                        />
                        <h3 className="font-semibold">{preset.nome}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">{preset.categoria}</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">{preset.typography}</Badge>
                        <Badge variant="outline" className="text-xs">{preset.spacing}</Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => copyCode(
                          `templateBuilder.createTemplate(templateBuilder.presets.${key})`,
                          `template-${key}`
                        )}
                      >
                        {copiedCode === `template-${key}` ? 'Copiado!' : 'Usar Template'}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}