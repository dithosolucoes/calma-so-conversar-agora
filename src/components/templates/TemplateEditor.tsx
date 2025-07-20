
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TemplateStyle } from '@/types/template';
import { TemplatePreview } from './TemplatePreview';
import { Palette, Type, Layout, Smartphone } from 'lucide-react';

interface TemplateEditorProps {
  template?: TemplateStyle;
  onSave: (template: TemplateStyle) => void;
  onCancel: () => void;
}

export const TemplateEditor = ({ template, onSave, onCancel }: TemplateEditorProps) => {
  const [editingTemplate, setEditingTemplate] = useState<TemplateStyle>(
    template || {
      id: '',
      nome: 'Novo Template',
      descricao: 'Descrição do template',
      cores: {
        primary: '#8B5CF6',
        primaryGlow: '#A78BFA',
        background: '#FFFFFF',
        card: '#FFFFFF',
        accent: '#8B5CF6'
      },
      tipografia: {
        fontFamily: 'Inter, sans-serif',
        fontSize: {
          titulo: '1.25rem',
          texto: '0.875rem',
          subtitulo: '1rem'
        }
      },
      layout: {
        cardRadius: '0.75rem',
        spacing: '1rem',
        shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
      },
      componentes: {
        atividadeCard: {
          style: 'moderno',
          showProgress: true,
          showTime: true
        },
        devocionalModal: {
          backgroundStyle: 'simples',
          textAlign: 'left'
        }
      },
      preview_mobile: '',
      ativo: false,
      criado_em: new Date().toISOString()
    }
  );

  const updateTemplate = (path: string, value: any) => {
    const keys = path.split('.');
    const newTemplate = { ...editingTemplate };
    let current = newTemplate as any;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setEditingTemplate(newTemplate);
  };

  const handleSave = () => {
    const templateToSave = {
      ...editingTemplate,
      id: editingTemplate.id || `template_${Date.now()}`
    };
    onSave(templateToSave);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Editor Panel */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Editor de Template</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar Template
            </Button>
          </div>
        </div>

        <Tabs defaultValue="geral">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="cores">
              <Palette size={16} />
              Cores
            </TabsTrigger>
            <TabsTrigger value="tipografia">
              <Type size={16} />
              Texto
            </TabsTrigger>
            <TabsTrigger value="layout">
              <Layout size={16} />
              Layout
            </TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome do Template</Label>
                  <Input
                    id="nome"
                    value={editingTemplate.nome}
                    onChange={(e) => updateTemplate('nome', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={editingTemplate.descricao}
                    onChange={(e) => updateTemplate('descricao', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cores" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paleta de Cores</CardTitle>
                <CardDescription>
                  Defina as cores principais do seu template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primary">Cor Primária</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary"
                        type="color"
                        value={editingTemplate.cores.primary}
                        onChange={(e) => updateTemplate('cores.primary', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={editingTemplate.cores.primary}
                        onChange={(e) => updateTemplate('cores.primary', e.target.value)}
                        placeholder="#8B5CF6"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="primaryGlow">Cor Secundária</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryGlow"
                        type="color"
                        value={editingTemplate.cores.primaryGlow}
                        onChange={(e) => updateTemplate('cores.primaryGlow', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={editingTemplate.cores.primaryGlow}
                        onChange={(e) => updateTemplate('cores.primaryGlow', e.target.value)}
                        placeholder="#A78BFA"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="background">Fundo</Label>
                    <div className="flex gap-2">
                      <Input
                        id="background"
                        type="color"
                        value={editingTemplate.cores.background}
                        onChange={(e) => updateTemplate('cores.background', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={editingTemplate.cores.background}
                        onChange={(e) => updateTemplate('cores.background', e.target.value)}
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="card">Cards</Label>
                    <div className="flex gap-2">
                      <Input
                        id="card"
                        type="color"
                        value={editingTemplate.cores.card}
                        onChange={(e) => updateTemplate('cores.card', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={editingTemplate.cores.card}
                        onChange={(e) => updateTemplate('cores.card', e.target.value)}
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tipografia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tipografia</CardTitle>
                <CardDescription>
                  Configure fontes e tamanhos de texto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fontFamily">Família da Fonte</Label>
                  <Select 
                    value={editingTemplate.tipografia.fontFamily}
                    onValueChange={(value) => updateTemplate('tipografia.fontFamily', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                      <SelectItem value="Roboto, sans-serif">Roboto</SelectItem>
                      <SelectItem value="Open Sans, sans-serif">Open Sans</SelectItem>
                      <SelectItem value="Playfair Display, serif">Playfair Display</SelectItem>
                      <SelectItem value="Merriweather, serif">Merriweather</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="tituloSize">Título</Label>
                    <Select 
                      value={editingTemplate.tipografia.fontSize.titulo}
                      onValueChange={(value) => updateTemplate('tipografia.fontSize.titulo', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1rem">Pequeno</SelectItem>
                        <SelectItem value="1.25rem">Médio</SelectItem>
                        <SelectItem value="1.5rem">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subtituloSize">Subtítulo</Label>
                    <Select 
                      value={editingTemplate.tipografia.fontSize.subtitulo}
                      onValueChange={(value) => updateTemplate('tipografia.fontSize.subtitulo', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.875rem">Pequeno</SelectItem>
                        <SelectItem value="1rem">Médio</SelectItem>
                        <SelectItem value="1.125rem">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="textoSize">Texto</Label>
                    <Select 
                      value={editingTemplate.tipografia.fontSize.texto}
                      onValueChange={(value) => updateTemplate('tipografia.fontSize.texto', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.75rem">Pequeno</SelectItem>
                        <SelectItem value="0.875rem">Médio</SelectItem>
                        <SelectItem value="1rem">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Layout e Componentes</CardTitle>
                <CardDescription>
                  Configure aparência dos componentes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardRadius">Arredondamento dos Cards</Label>
                  <Select 
                    value={editingTemplate.layout.cardRadius}
                    onValueChange={(value) => updateTemplate('layout.cardRadius', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.25rem">Pequeno</SelectItem>
                      <SelectItem value="0.5rem">Médio</SelectItem>
                      <SelectItem value="0.75rem">Grande</SelectItem>
                      <SelectItem value="1rem">Extra Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="atividadeStyle">Estilo dos Cards de Atividade</Label>
                  <Select 
                    value={editingTemplate.componentes.atividadeCard.style}
                    onValueChange={(value) => updateTemplate('componentes.atividadeCard.style', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimalista">Minimalista</SelectItem>
                      <SelectItem value="moderno">Moderno</SelectItem>
                      <SelectItem value="classico">Clássico</SelectItem>
                      <SelectItem value="colorido">Colorido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showProgress">Mostrar progresso</Label>
                  <Switch
                    id="showProgress"
                    checked={editingTemplate.componentes.atividadeCard.showProgress}
                    onCheckedChange={(checked) => updateTemplate('componentes.atividadeCard.showProgress', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showTime">Mostrar tempo estimado</Label>
                  <Switch
                    id="showTime"
                    checked={editingTemplate.componentes.atividadeCard.showTime}
                    onCheckedChange={(checked) => updateTemplate('componentes.atividadeCard.showTime', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Preview Panel */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Smartphone size={20} />
          <h3 className="text-lg font-semibold">Preview Mobile</h3>
        </div>
        <div className="flex justify-center">
          <TemplatePreview template={editingTemplate} />
        </div>
      </div>
    </div>
  );
};
