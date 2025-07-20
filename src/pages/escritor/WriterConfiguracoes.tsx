
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useWriterAuth } from '@/contexts/WriterAuthContext';
import { 
  User, 
  Bell, 
  CreditCard, 
  Shield, 
  Mail, 
  Phone, 
  Globe,
  Save,
  Upload
} from 'lucide-react';

export const WriterConfiguracoes = () => {
  const { writer } = useWriterAuth();

  return (
    <WriterLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold gradient-text">Configurações</h1>
          <p className="text-muted-foreground">Gerencie sua conta e preferências</p>
        </div>

        <Tabs defaultValue="perfil" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          </TabsList>

          {/* Perfil Tab */}
          <TabsContent value="perfil">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User size={20} />
                    Informações Pessoais
                  </CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais e foto de perfil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-lg">
                        {writer?.nome.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        <Upload size={16} />
                        Alterar Foto
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG até 2MB
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input id="nome" defaultValue={writer?.nome} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={writer?.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" placeholder="+55 (11) 99999-9999" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="https://seusite.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Conte um pouco sobre você e seu ministério..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button>
                    <Save size={16} />
                    Salvar Alterações
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notificações Tab */}
          <TabsContent value="notificacoes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={20} />
                  Preferências de Notificação
                </CardTitle>
                <CardDescription>
                  Configure como deseja receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Novas Vendas</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificação quando alguém comprar sua jornada
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Feedback dos Usuários</Label>
                      <p className="text-sm text-muted-foreground">
                        Avisos sobre comentários e avaliações
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Relatórios Semanais</Label>
                      <p className="text-sm text-muted-foreground">
                        Resumo semanal de performance
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Marketing e Promoções</Label>
                      <p className="text-sm text-muted-foreground">
                        Dicas e novidades da plataforma
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Button>
                  <Save size={16} />
                  Salvar Preferências
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pagamento Tab */}
          <TabsContent value="pagamento">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard size={20} />
                    Informações de Pagamento
                  </CardTitle>
                  <CardDescription>
                    Configure como deseja receber seus pagamentos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="banco">Banco</Label>
                      <Input id="banco" placeholder="Nome do banco" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agencia">Agência</Label>
                      <Input id="agencia" placeholder="0000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="conta">Conta</Label>
                      <Input id="conta" placeholder="00000-0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" placeholder="000.000.000-00" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pix">Chave PIX (Opcional)</Label>
                    <Input id="pix" placeholder="email@exemplo.com ou telefone" />
                  </div>

                  <Button>
                    <Save size={16} />
                    Salvar Dados
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Pagamentos</CardTitle>
                  <CardDescription>
                    Seus últimos recebimentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">Pagamento de Março</p>
                        <p className="text-sm text-muted-foreground">15/03/2024</p>
                      </div>
                      <p className="font-bold text-green-600">R$ 1.247,30</p>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">Pagamento de Fevereiro</p>
                        <p className="text-sm text-muted-foreground">15/02/2024</p>
                      </div>
                      <p className="font-bold text-green-600">R$ 892,50</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Segurança Tab */}
          <TabsContent value="seguranca">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield size={20} />
                    Segurança da Conta
                  </CardTitle>
                  <CardDescription>
                    Mantenha sua conta segura
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="senha-atual">Senha Atual</Label>
                    <Input id="senha-atual" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nova-senha">Nova Senha</Label>
                    <Input id="nova-senha" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                    <Input id="confirmar-senha" type="password" />
                  </div>

                  <Button>
                    <Save size={16} />
                    Alterar Senha
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Autenticação em Duas Etapas</CardTitle>
                  <CardDescription>
                    Adicione uma camada extra de segurança
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ativar 2FA</p>
                      <p className="text-sm text-muted-foreground">
                        Use seu celular para verificação adicional
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </WriterLayout>
  );
};
