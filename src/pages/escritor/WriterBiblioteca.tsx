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
  // Fundamentos
  designTokens,
  // Elementos
  Badge as BibliotecaBadge,
  Icon,
  Typography,
  LoadingSpinner,
  Button as BibliotecaButton,
  Input as BibliotecaInput,
  Avatar,
  UserAvatar,
  Skeleton,
  SkeletonCard,
  // Funcionais
  DevotionalCard,
  ProgressTracker,
  StatsCard,
  AchievementCard,
  // Navegação
  TopNavigation,
  DevotionalTopNav,
  Breadcrumb,
  DevotionalBreadcrumb,
  // Telas
  DashboardScreen,
  SimpleDashboard,
  // Aplicação
  ThemeProvider,
  ThemeSelector,
  ReaderApp,
  // Template Builder (ainda será implementado)
  templateBuilder
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

      <Tabs defaultValue="fundamentos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 text-xs">
          <TabsTrigger value="fundamentos">Fundamentos</TabsTrigger>
          <TabsTrigger value="elementos">Elementos</TabsTrigger>
          <TabsTrigger value="funcionais">Funcionais</TabsTrigger>
          <TabsTrigger value="secoes">Seções</TabsTrigger>
          <TabsTrigger value="layouts">Layouts</TabsTrigger>
          <TabsTrigger value="navegacao">Navegação</TabsTrigger>
          <TabsTrigger value="telas">Telas</TabsTrigger>
          <TabsTrigger value="aplicacao">Aplicação</TabsTrigger>
        </TabsList>

        {/* 1. FUNDAMENTOS */}
        <TabsContent value="fundamentos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette size={20} />
                Design Tokens e Fundamentos
              </CardTitle>
              <CardDescription>
                Prótons, Elétrons e Nêutrons do sistema - cores, tipografia e espaçamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Esquemas de Cores</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(designTokens.colors.schemes).map(([name, colors]) => (
                      <div key={name} className="p-3 border rounded-lg">
                        <h4 className="text-sm font-medium mb-2">{name}</h4>
                        <div className="flex gap-1">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: colors.primary }}
                            title="Primary"
                          />
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: colors.secondary }}
                            title="Secondary"
                          />
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: colors.accent }}
                            title="Accent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Tipografia</h3>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Famílias disponíveis:</p>
                    <div className="space-y-1 text-sm">
                      <div>Primary: {designTokens.typography.families.primary.join(', ')}</div>
                      <div>Heading: {designTokens.typography.families.heading.join(', ')}</div>
                      <div>Mono: {designTokens.typography.families.mono.join(', ')}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                <pre className="text-xs overflow-x-auto">
{`import { designTokens, applyColorScheme } from '@/components/biblioteca';

// Aplicar esquema de cores
const styles = applyColorScheme('aurora');
// styles = { '--primary': 'hsl(248, 85%, 66%)', ... }

// Usar tokens
const primaryColor = designTokens.colors.schemes.aurora.primary;`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. ELEMENTOS BÁSICOS */}
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

            <ComponentExample
              title="Button"
              description="Botões com variantes devocionais"
              component={
                <div className="flex flex-wrap gap-2">
                  <BibliotecaButton variant="default">Padrão</BibliotecaButton>
                  <BibliotecaButton variant="devocional">Devocional</BibliotecaButton>
                  <BibliotecaButton variant="oracao">Oração</BibliotecaButton>
                  <BibliotecaButton variant="premium">Premium</BibliotecaButton>
                </div>
              }
              code={`<Button variant="devocional">Devocional</Button>`}
            />

            <ComponentExample
              title="Input"
              description="Campos de entrada especializados"
              component={
                <div className="space-y-3 max-w-sm">
                  <BibliotecaInput 
                    label="Nome" 
                    placeholder="Digite seu nome"
                    variant="default"
                  />
                  <BibliotecaInput 
                    label="Email" 
                    placeholder="seu@email.com"
                    variant="outlined"
                    helper="Usado para login"
                  />
                </div>
              }
              code={`<Input label="Nome" variant="outlined" />`}
            />

            <ComponentExample
              title="Avatar"
              description="Avatares com indicadores de status"
              component={
                <div className="flex items-center gap-4">
                  <Avatar size="sm">
                    <img src="/placeholder-user.jpg" alt="User" />
                  </Avatar>
                  <UserAvatar 
                    name="João Silva" 
                    level={5}
                    showLevel={true}
                    size="md"
                  />
                  <UserAvatar 
                    name="Maria Santos" 
                    status="online"
                    showStatus={true}
                    size="lg"
                  />
                </div>
              }
              code={`<UserAvatar name="João" level={5} showLevel />`}
            />

            <ComponentExample
              title="Skeleton"
              description="Estados de carregamento"
              component={
                <div className="space-y-4">
                  <SkeletonCard />
                  <div className="flex gap-4">
                    <Skeleton variant="circular" className="h-12 w-12" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                </div>
              }
              code={`<SkeletonCard />`}
            />
          </div>
        </TabsContent>

        {/* 3. COMPONENTES FUNCIONAIS */}
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

        {/* 4. SEÇÕES */}
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

        {/* 5. LAYOUTS */}
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

        {/* 6. NAVEGAÇÃO */}
        <TabsContent value="navegacao" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComponentExample
              title="TopNavigation"
              description="Navegação superior com usuário e ações"
              component={
                <div className="border rounded-lg overflow-hidden">
                  <TopNavigation
                    title="Meu App"
                    user={{ name: "João", level: 5 }}
                    showNotifications={true}
                  />
                </div>
              }
              code={`<TopNavigation title="App" user={{ name: "João", level: 5 }} />`}
            />

            <ComponentExample
              title="DevotionalTopNav"
              description="Navegação especializada para devocionais"
              component={
                <div className="border rounded-lg overflow-hidden">
                  <DevotionalTopNav
                    title="Devocional"
                    streak={7}
                    level={3}
                    user={{ name: "Maria" }}
                  />
                </div>
              }
              code={`<DevotionalTopNav title="Devocional" streak={7} level={3} />`}
            />

            <ComponentExample
              title="Breadcrumb"
              description="Navegação hierárquica"
              component={
                <DevotionalBreadcrumb
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Devocionais", href: "/devocionais" },
                    { label: "Salmo 23", active: true }
                  ]}
                />
              }
              code={`<DevotionalBreadcrumb items={breadcrumbItems} />`}
            />
          </div>
        </TabsContent>

        {/* 7. TELAS COMPLETAS */}
        <TabsContent value="telas" className="space-y-6">
          <ComponentExample
            title="DashboardScreen"
            description="Tela completa de dashboard"
            component={
              <div className="border rounded-lg h-96 overflow-auto">
                <SimpleDashboard 
                  userName="João Silva"
                  streak={7}
                  level={3}
                  todayCompleted={false}
                />
              </div>
            }
            code={`<SimpleDashboard userName="João" streak={7} level={3} />`}
          />
        </TabsContent>

        {/* 8. APLICAÇÃO COMPLETA */}
        <TabsContent value="aplicacao" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComponentExample
              title="ThemeProvider"
              description="Provedor de temas com múltiplos esquemas"
              component={
                <ThemeSelector 
                  showModeToggle={true}
                  showColorSchemes={true}
                  compact={false}
                />
              }
              code={`<ThemeProvider defaultColorScheme="aurora">
  <App />
</ThemeProvider>`}
            />

            <ComponentExample
              title="ReaderApp"
              description="App completo para leitores"
              component={
                <div className="p-4 border rounded-lg bg-muted/20">
                  <h3 className="font-semibold mb-2">ReaderApp</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Aplicação completa com navegação, temas e estado global
                  </p>
                  <div className="text-xs bg-background p-2 rounded border">
                    <div>✅ Navegação bottom/top</div>
                    <div>✅ Gerenciamento de estado</div>
                    <div>✅ Temas automáticos</div>
                    <div>✅ Telas pré-configuradas</div>
                  </div>
                </div>
              }
              code={`<ReaderApp 
  initialUser={{ name: "João", level: 5 }}
  showTopNavigation={true}
  showBottomNavigation={true}
/>`}
            />
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Estrutura Hierárquica Completa</CardTitle>
              <CardDescription>
                8 níveis organizados do mais básico ao mais complexo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { level: '1', name: 'Fundamentos', desc: 'Design Tokens', icon: '🔬' },
                  { level: '2', name: 'Elementos', desc: 'Átomos básicos', icon: '⚛️' },
                  { level: '3', name: 'Funcionais', desc: 'Moléculas', icon: '🧬' },
                  { level: '4', name: 'Seções', desc: 'Organelas', icon: '🔬' },
                  { level: '5', name: 'Layouts', desc: 'Células', icon: '🏗️' },
                  { level: '6', name: 'Navegação', desc: 'Tecidos', icon: '🧭' },
                  { level: '7', name: 'Telas', desc: 'Órgãos', icon: '🖥️' },
                  { level: '8', name: 'Aplicação', desc: 'Organismo', icon: '🌍' },
                ].map((item) => (
                  <div key={item.level} className="p-3 border rounded-lg text-center">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}