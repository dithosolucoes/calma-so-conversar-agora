
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { TemplatePreview } from '@/components/template/TemplatePreview';
import { mockTemplates } from '@/data/mockTemplates';
import { TemplateConfig } from '@/types/template';
import { Plus, Edit } from 'lucide-react';

export default function WriterTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateConfig | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    const template = mockTemplates.find(t => t.id === templateId);
    setSelectedTemplate(template || null);
  };

  return (
    <WriterLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Templates</h1>
            <p className="text-muted-foreground">Personalize a experiência visual dos seus leitores</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Criar Template
          </Button>
        </div>

        <div className="w-80">
          <Select onValueChange={handleTemplateSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um template para visualizar" />
            </SelectTrigger>
            <SelectContent>
              {mockTemplates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.nome} - {template.categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedTemplate && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Preview: {selectedTemplate.nome}</h2>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Editar Template
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Preview da Tela Hoje */}
              <Card className="p-4">
                <h3 className="font-medium mb-4">Como ficará para o leitor:</h3>
                <div className="border rounded-lg overflow-hidden bg-background">
                  <TemplatePreview template={selectedTemplate} />
                </div>
              </Card>

              {/* Configurações do Template */}
              <Card className="p-6">
                <h3 className="font-medium mb-4">Configurações do Template</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Layout</h4>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Cabeçalho: {selectedTemplate.layout.cabecalho}</p>
                      <p>Mostrar Data: {selectedTemplate.layout.mostrarData ? 'Sim' : 'Não'}</p>
                      <p>Mostrar Progresso: {selectedTemplate.layout.mostrarProgresso ? 'Sim' : 'Não'}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Tipografia</h4>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Fonte: {selectedTemplate.tipografia.fontePrimaria}</p>
                      <p>Tamanho Título: {selectedTemplate.tipografia.tamanhoTitulo}</p>
                      <p>Peso Título: {selectedTemplate.tipografia.pesoTitulo}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Cards de Atividade</h4>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Estilo: {selectedTemplate.cardsAtividade.estilo}</p>
                      <p>Bordas: {selectedTemplate.cardsAtividade.bordas}</p>
                      <p>Sombra: {selectedTemplate.cardsAtividade.sombra}</p>
                      <p>Animação: {selectedTemplate.cardsAtividade.animacao ? 'Sim' : 'Não'}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Elementos Visuais</h4>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Gradientes: {selectedTemplate.elementos.gradientes ? 'Sim' : 'Não'}</p>
                      <p>Ícones 3D: {selectedTemplate.elementos.icones3d ? 'Sim' : 'Não'}</p>
                      <p>Partículas: {selectedTemplate.elementos.particulas ? 'Sim' : 'Não'}</p>
                      <p>Fundo Animado: {selectedTemplate.elementos.fundoAnimado ? 'Sim' : 'Não'}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </WriterLayout>
  );
}
