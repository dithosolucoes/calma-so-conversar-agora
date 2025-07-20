
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { TemplateEditor } from '@/components/template/TemplateEditor';
import { CreateTemplateModal } from '@/components/template/CreateTemplateModal';
import { mockTemplates } from '@/data/mockTemplates';
import { TemplateConfig } from '@/types/template';
import { Plus, Edit, Save, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function WriterTemplates() {
  const [templates, setTemplates] = useState<TemplateConfig[]>(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateConfig | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<TemplateConfig | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { toast } = useToast();

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    setSelectedTemplate(template || null);
    setEditingTemplate(null);
  };

  const handleCreateTemplate = (templateData: Partial<TemplateConfig>) => {
    const newTemplate: TemplateConfig = {
      id: `template-${Date.now()}`,
      thumbnail: '/templates/custom.jpg',
      criadoEm: new Date().toISOString().split('T')[0],
      atualizadoEm: new Date().toISOString().split('T')[0],
      ...templateData
    } as TemplateConfig;

    setTemplates(prev => [...prev, newTemplate]);
    setSelectedTemplate(newTemplate);
    toast({
      title: "Template criado!",
      description: "Seu novo template foi criado com sucesso.",
    });
  };

  const handleEditTemplate = (template: TemplateConfig) => {
    setEditingTemplate({ ...template });
  };

  const handleSaveTemplate = () => {
    if (!editingTemplate) return;

    const updatedTemplate = {
      ...editingTemplate,
      atualizadoEm: new Date().toISOString().split('T')[0]
    };

    setTemplates(prev => 
      prev.map(t => t.id === updatedTemplate.id ? updatedTemplate : t)
    );
    
    setSelectedTemplate(updatedTemplate);
    setEditingTemplate(null);
    
    toast({
      title: "Template salvo!",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const handleCancelEdit = () => {
    setEditingTemplate(null);
  };

  if (editingTemplate) {
    return (
      <WriterLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleCancelEdit}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Editando: {editingTemplate.nome}</h1>
                <p className="text-muted-foreground">Personalize todos os aspectos do seu template</p>
              </div>
            </div>
            <Button onClick={handleSaveTemplate}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Template
            </Button>
          </div>

          <TemplateEditor
            template={editingTemplate}
            onTemplateChange={setEditingTemplate}
          />
        </div>
      </WriterLayout>
    );
  }

  return (
    <WriterLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Templates</h1>
            <p className="text-muted-foreground">Personalize a experiência visual dos seus leitores</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Criar Template
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Templates */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Seus Templates</h3>
            <div className="space-y-2">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{template.nome}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {template.categoria}
                      </p>
                    </div>
                    {selectedTemplate?.id === template.id && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTemplate(template);
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Preview e Configurações */}
          {selectedTemplate && (
            <>
              <Card className="p-4">
                <h3 className="font-medium mb-4">Preview Interativo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Este é exatamente como ficará para o leitor. Teste todas as funcionalidades!
                </p>
                <TemplateEditor
                  template={selectedTemplate}
                  onTemplateChange={(template) => {
                    setTemplates(prev => 
                      prev.map(t => t.id === template.id ? template : t)
                    );
                    setSelectedTemplate(template);
                  }}
                />
              </Card>
            </>
          )}
        </div>

        {!selectedTemplate && (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-medium mb-2">Selecione um template</h3>
            <p className="text-muted-foreground mb-4">
              Escolha um template da lista ao lado para visualizar e editar
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ou crie um novo template
            </Button>
          </Card>
        )}

        <CreateTemplateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateTemplate={handleCreateTemplate}
        />
      </div>
    </WriterLayout>
  );
}
