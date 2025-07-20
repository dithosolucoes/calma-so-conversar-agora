import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockTemplates } from '@/data/mockTemplates';
import { TemplateConfig } from '@/types/template';
import { Plus } from 'lucide-react';

export default function WriterTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateConfig | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    const template = mockTemplates.find(t => t.id === templateId);
    setSelectedTemplate(template || null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Templates</h1>
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
                {template.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedTemplate && (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <Card className="p-6 h-96 border">
              <div className="space-y-4">
                <h3 className="font-bold text-xl">{selectedTemplate.nome}</h3>
                <p className="text-sm text-muted-foreground">Categoria: {selectedTemplate.categoria}</p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Cabeçalho:</strong> {selectedTemplate.layout.cabecalho}</p>
                  <p className="text-sm"><strong>Estilo Cards:</strong> {selectedTemplate.cardsAtividade.estilo}</p>
                  <p className="text-sm"><strong>Bordas:</strong> {selectedTemplate.cardsAtividade.bordas}</p>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Configurações</h2>
              <Button variant="outline">Editar Template</Button>
            </div>
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Layout</h4>
                  <p className="text-sm">Cabeçalho: {selectedTemplate.layout.cabecalho}</p>
                  <p className="text-sm">Mostrar Data: {selectedTemplate.layout.mostrarData ? 'Sim' : 'Não'}</p>
                  <p className="text-sm">Mostrar Progresso: {selectedTemplate.layout.mostrarProgresso ? 'Sim' : 'Não'}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Tipografia</h4>
                  <p className="text-sm">Fonte: {selectedTemplate.tipografia.fontePrimaria}</p>
                  <p className="text-sm">Tamanho Título: {selectedTemplate.tipografia.tamanhoTitulo}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Cards</h4>
                  <p className="text-sm">Estilo: {selectedTemplate.cardsAtividade.estilo}</p>
                  <p className="text-sm">Sombra: {selectedTemplate.cardsAtividade.sombra}</p>
                  <p className="text-sm">Animação: {selectedTemplate.cardsAtividade.animacao ? 'Sim' : 'Não'}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}