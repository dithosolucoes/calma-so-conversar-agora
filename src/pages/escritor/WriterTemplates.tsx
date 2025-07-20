
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TemplatePreview } from '@/components/templates/TemplatePreview';
import { TemplateEditor } from '@/components/templates/TemplateEditor';
import { mockTemplates } from '@/data/mockTemplates';
import { TemplateStyle } from '@/types/template';
import { Palette, Eye, Edit, Plus, Smartphone, Check, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const WriterTemplates = () => {
  const [templates, setTemplates] = useState<TemplateStyle[]>(mockTemplates);
  const [showEditor, setShowEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<TemplateStyle | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const filteredTemplates = selectedCategory === 'todos' 
    ? templates 
    : templates.filter(t => t.componentes.atividadeCard.style === selectedCategory);

  const handleCreateNew = () => {
    setEditingTemplate(undefined);
    setShowEditor(true);
  };

  const handleEdit = (template: TemplateStyle) => {
    setEditingTemplate(template);
    setShowEditor(true);
  };

  const handleSaveTemplate = (template: TemplateStyle) => {
    if (editingTemplate) {
      // Editando template existente
      setTemplates(prev => prev.map(t => t.id === template.id ? template : t));
    } else {
      // Criando novo template
      setTemplates(prev => [...prev, template]);
    }
    setShowEditor(false);
    setEditingTemplate(undefined);
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setEditingTemplate(undefined);
  };

  const handleActivateTemplate = (templateId: string) => {
    setTemplates(prev => prev.map(t => ({
      ...t,
      ativo: t.id === templateId
    })));
  };

  if (showEditor) {
    return (
      <WriterLayout>
        <div className="p-8">
          <TemplateEditor
            template={editingTemplate}
            onSave={handleSaveTemplate}
            onCancel={handleCancelEdit}
          />
        </div>
      </WriterLayout>
    );
  }

  return (
    <WriterLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Templates</h1>
            <p className="text-muted-foreground">
              Personalize a experiência visual das suas jornadas
            </p>
          </div>
          <Button variant="premium" onClick={handleCreateNew}>
            <Plus size={20} />
            Criar Template
          </Button>
        </div>

        {/* Template Ativo */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Check size={20} className="text-green-500" />
                  Template Ativo
                </CardTitle>
                <CardDescription>
                  Este template está sendo usado nas suas jornadas
                </CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-800">
                Ativo
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {(() => {
              const activeTemplate = templates.find(t => t.ativo);
              return activeTemplate ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{activeTemplate.nome}</h3>
                    <p className="text-muted-foreground mb-4">{activeTemplate.descricao}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Paleta de Cores</p>
                        <div className="flex gap-2">
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: activeTemplate.cores.primary }}
                          />
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: activeTemplate.cores.primaryGlow }}
                          />
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: activeTemplate.cores.card }}
                          />
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => handleEdit(activeTemplate)}>
                        <Edit size={16} />
                        Editar Template
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <TemplatePreview template={activeTemplate} />
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Nenhum template ativo selecionado</p>
              );
            })()}
          </CardContent>
        </Card>

        {/* Categories */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="moderno">Moderno</TabsTrigger>
            <TabsTrigger value="classico">Clássico</TabsTrigger>
            <TabsTrigger value="minimalista">Minimalista</TabsTrigger>
            <TabsTrigger value="colorido">Colorido</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover-lift overflow-hidden">
                  <div className="p-4 border-b bg-muted/20">
                    <div className="flex justify-center">
                      <TemplatePreview template={template} className="scale-75 origin-top" />
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {template.nome}
                          {template.ativo && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Ativo
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{template.descricao}</CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Smartphone size={16} />
                        Mobile
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={16} />
                        {template.componentes.atividadeCard.style}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Color Palette */}
                      <div>
                        <p className="text-sm font-medium mb-2">Paleta de Cores</p>
                        <div className="flex gap-2">
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: template.cores.primary }}
                          />
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: template.cores.primaryGlow }}
                          />
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: template.cores.background }}
                          />
                        </div>
                      </div>
                      
                      {/* Typography */}
                      <div>
                        <p className="text-sm font-medium mb-2">Tipografia</p>
                        <p className="text-xs text-muted-foreground">
                          {template.tipografia.fontFamily.split(',')[0]}
                        </p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleEdit(template)}
                        >
                          <Edit size={16} />
                          Editar
                        </Button>
                        {!template.ativo && (
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleActivateTemplate(template.id)}
                          >
                            <Palette size={16} />
                            Ativar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </WriterLayout>
  );
};
