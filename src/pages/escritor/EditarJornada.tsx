
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2,
  Calendar,
  FileText,
  HelpCircle,
  Heart
} from 'lucide-react';
import { DiaDevocional } from '@/types/devocional';

export const EditarJornada = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - em produção viria de uma API
  const [jornada, setJornada] = useState({
    id: id || '1',
    titulo: '21 Dias de Fé',
    descricao: 'Uma jornada transformadora de crescimento na fé cristã',
    duracao: 21,
    imagem_capa: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop',
    status: 'publicada' as 'rascunho' | 'publicada' | 'arquivada'
  });

  const [dias, setDias] = useState<DiaDevocional[]>([
    {
      dia: 1,
      tema: 'O Fundamento da Fé',
      devocional: 'A fé é o fundamento de tudo que esperamos...',
      passagem: 'Hebreus 11:1-3',
      quiz: {
        pergunta: 'O que é fé segundo Hebreus 11:1?',
        opcoes: [
          'Uma esperança vaga',
          'A certeza daquilo que esperamos',
          'Um sentimento passageiro',
          'Uma crença sem fundamento'
        ],
        resposta_correta: 'A certeza daquilo que esperamos'
      },
      oracao: 'Senhor, fortalece minha fé a cada dia...'
    },
    {
      dia: 2,
      tema: 'Crescendo na Fé',
      devocional: 'A fé cresce através da palavra e da oração...',
      passagem: 'Romanos 10:17',
      quiz: {
        pergunta: 'Como a fé é desenvolvida?',
        opcoes: [
          'Apenas pela oração',
          'Ouvindo a palavra de Deus',
          'Fazendo boas obras',
          'Frequentando a igreja'
        ],
        resposta_correta: 'Ouvindo a palavra de Deus'
      },
      oracao: 'Pai, que eu possa crescer na fé através da Tua palavra...'
    }
  ]);

  const [diaEditando, setDiaEditando] = useState<number | null>(null);

  const salvarJornada = () => {
    console.log('Salvando jornada:', jornada);
    // Aqui salvaria na API
  };

  const adicionarDia = () => {
    const novoDia: DiaDevocional = {
      dia: dias.length + 1,
      tema: '',
      devocional: '',
      passagem: '',
      quiz: {
        pergunta: '',
        opcoes: ['', '', '', ''],
        resposta_correta: ''
      },
      oracao: ''
    };
    setDias([...dias, novoDia]);
    setDiaEditando(novoDia.dia);
  };

  const removerDia = (dia: number) => {
    setDias(dias.filter(d => d.dia !== dia));
  };

  const editarDia = (diaNum: number, dadosAtualizados: Partial<DiaDevocional>) => {
    setDias(dias.map(d => 
      d.dia === diaNum 
        ? { ...d, ...dadosAtualizados }
        : d
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'publicada':
        return 'bg-green-100 text-green-800';
      case 'rascunho':
        return 'bg-yellow-100 text-yellow-800';
      case 'arquivada':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <WriterLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/escritor/jornadas')}>
              <ArrowLeft size={20} />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold gradient-text">{jornada.titulo}</h1>
                <Badge className={getStatusColor(jornada.status)}>
                  {jornada.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">Editando jornada devocional</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye size={20} />
              Preview
            </Button>
            <Button onClick={salvarJornada}>
              <Save size={20} />
              Salvar
            </Button>
          </div>
        </div>

        <Tabs defaultValue="informacoes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="informacoes">Informações</TabsTrigger>
            <TabsTrigger value="dias">Dias ({dias.length})</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>

          {/* Informações Gerais */}
          <TabsContent value="informacoes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título da Jornada</Label>
                    <Input 
                      id="titulo"
                      value={jornada.titulo}
                      onChange={(e) => setJornada({...jornada, titulo: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea 
                      id="descricao"
                      value={jornada.descricao}
                      onChange={(e) => setJornada({...jornada, descricao: e.target.value})}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duracao">Duração (dias)</Label>
                    <Input 
                      id="duracao"
                      type="number"
                      value={jornada.duracao}
                      onChange={(e) => setJornada({...jornada, duracao: parseInt(e.target.value)})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Imagem de Capa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={jornada.imagem_capa} 
                      alt="Capa da jornada"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    Alterar Imagem
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gerenciamento de Dias */}
          <TabsContent value="dias">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Conteúdo dos Dias</h3>
                <Button onClick={adicionarDia}>
                  <Plus size={16} />
                  Adicionar Dia
                </Button>
              </div>

              <div className="grid gap-4">
                {dias.map((dia) => (
                  <Card key={dia.dia} className="hover-lift">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            {dia.dia}
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {dia.tema || `Dia ${dia.dia}`}
                            </CardTitle>
                            <CardDescription>
                              {dia.passagem || 'Passagem não definida'}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setDiaEditando(dia.dia)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => removerDia(dia.dia)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    {diaEditando === dia.dia && (
                      <CardContent className="space-y-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Tema do Dia</Label>
                            <Input 
                              value={dia.tema}
                              onChange={(e) => editarDia(dia.dia, { tema: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Passagem Bíblica</Label>
                            <Input 
                              value={dia.passagem}
                              onChange={(e) => editarDia(dia.dia, { passagem: e.target.value })}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Devocional</Label>
                          <Textarea 
                            value={dia.devocional}
                            onChange={(e) => editarDia(dia.dia, { devocional: e.target.value })}
                            className="min-h-[120px]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Pergunta do Quiz</Label>
                          <Input 
                            value={dia.quiz.pergunta}
                            onChange={(e) => editarDia(dia.dia, { 
                              quiz: { ...dia.quiz, pergunta: e.target.value }
                            })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Oração</Label>
                          <Textarea 
                            value={dia.oracao}
                            onChange={(e) => editarDia(dia.dia, { oracao: e.target.value })}
                            className="min-h-[80px]"
                          />
                        </div>

                        <Button 
                          variant="outline" 
                          onClick={() => setDiaEditando(null)}
                        >
                          Concluir Edição
                        </Button>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Configurações */}
          <TabsContent value="configuracoes">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Jornada</CardTitle>
                <CardDescription>
                  Configurações avançadas e opções de publicação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Status da Jornada</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={jornada.status}
                    onChange={(e) => setJornada({...jornada, status: e.target.value as any})}
                  >
                    <option value="rascunho">Rascunho</option>
                    <option value="publicada">Publicada</option>
                    <option value="arquivada">Arquivada</option>
                  </select>
                </div>
                
                <Button variant="destructive">
                  <Trash2 size={16} />
                  Excluir Jornada
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </WriterLayout>
  );
};
