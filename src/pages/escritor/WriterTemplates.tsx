
import { useState } from 'react';
import { Plus, Edit, Eye } from 'lucide-react';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTemplates, categoriaTemplates } from '@/data/mockTemplates';
import { TemplateConfig, TemplateCategorias } from '@/types/template';

export const WriterTemplates = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState<TemplateCategorias>('todos');
  const [templateSelecionado, setTemplateSelecionado] = useState<TemplateConfig | null>(null);
  const [modoEditor, setModoEditor] = useState<'criar' | 'editar' | null>(null);

  const templatesFiltrados = categoriaAtiva === 'todos' 
    ? mockTemplates 
    : mockTemplates.filter(t => t.categoria === categoriaAtiva);

  const abrirEditor = (template?: TemplateConfig) => {
    if (template) {
      setModoEditor('editar');
      setTemplateSelecionado(template);
    } else {
      setModoEditor('criar');
      setTemplateSelecionado(null);
    }
  };

  const fecharEditor = () => {
    setModoEditor(null);
    setTemplateSelecionado(null);
  };

  if (modoEditor) {
    return (
      <WriterLayout>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
              {modoEditor === 'criar' ? 'Criar Template' : 'Editar Template'}
            </h1>
            <Button variant="outline" onClick={fecharEditor}>
              Voltar
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
            {/* Painel de Controles */}
            <div className="space-y-6 overflow-y-auto">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informações Básicas</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome do Template</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-lg"
                      defaultValue={templateSelecionado?.nome || ''}
                      placeholder="Nome do seu template"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Categoria</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option value="minimalista">Minimalista</option>
                      <option value="colorido">Colorido</option>
                      <option value="elegante">Elegante</option>
                      <option value="moderno">Moderno</option>
                    </select>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Layout do Cabeçalho</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Estilo do Cabeçalho</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option value="completo">Completo (com data e frase)</option>
                      <option value="compacto">Compacto (sem data)</option>
                      <option value="minimal">Minimal (só nome)</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="mostrar-progresso" />
                    <label htmlFor="mostrar-progresso" className="text-sm">Mostrar barra de progresso</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="botao-favorito" />
                    <label htmlFor="botao-favorito" className="text-sm">Mostrar botão de favorito</label>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Cores</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Cor Primária</label>
                    <input type="color" className="w-full h-10 rounded border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Cor Secundária</label>
                    <input type="color" className="w-full h-10 rounded border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Cor de Destaque</label>
                    <input type="color" className="w-full h-10 rounded border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Fundo</label>
                    <input type="color" className="w-full h-10 rounded border" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Cards de Atividade</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Estilo dos Cards</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option value="padrao">Padrão</option>
                      <option value="compacto">Compacto</option>
                      <option value="detalhado">Detalhado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bordas</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option value="retas">Retas</option>
                      <option value="arredondadas">Arredondadas</option>
                      <option value="muito-arredondadas">Muito Arredondadas</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="animacoes" />
                    <label htmlFor="animacoes" className="text-sm">Ativar animações</label>
                  </div>
                </div>
              </Card>
            </div>

            {/* Preview */}
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="bg-white rounded-lg h-full p-4 shadow-sm">
                <div className="text-center text-muted-foreground">
                  <Eye size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Preview da Tela "Hoje"</p>
                  <p className="text-sm">As mudanças aparecerão aqui em tempo real</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={fecharEditor}>
              Cancelar
            </Button>
            <Button>
              {modoEditor === 'criar' ? 'Criar Template' : 'Salvar Alterações'}
            </Button>
          </div>
        </div>
      </WriterLayout>
    );
  }

  return (
    <WriterLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Templates</h1>
            <p className="text-muted-foreground">Personalize a experiência visual dos seus leitores</p>
          </div>
          <Button onClick={() => abrirEditor()} className="gap-2">
            <Plus size={20} />
            Criar Template
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-6">
          {categoriaTemplates.map((categoria) => (
            <Button
              key={categoria.id}
              variant={categoriaAtiva === categoria.id ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoriaAtiva(categoria.id as TemplateCategorias)}
              className="rounded-full"
            >
              {categoria.nome}
            </Button>
          ))}
        </div>

        {/* Grid de Templates */}
        {templatesFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lista de Templates */}
            <div className="space-y-4">
              <h3 className="font-medium text-muted-foreground">
                {templatesFiltrados.length} template{templatesFiltrados.length !== 1 ? 's' : ''} encontrado{templatesFiltrados.length !== 1 ? 's' : ''}
              </h3>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {templatesFiltrados.map((template) => (
                  <Card 
                    key={template.id} 
                    className={`p-4 cursor-pointer transition-all hover-lift ${
                      templateSelecionado?.id === template.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setTemplateSelecionado(template)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{template.nome}</h4>
                          <Badge variant="secondary">{template.categoria}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Atualizado em {new Date(template.atualizadoEm).toLocaleDateString('pt-BR')}
                        </p>
                        
                        {/* Preview das cores */}
                        <div className="flex gap-1">
                          {Object.entries(template.cores).slice(0, 4).map(([key, cor]) => (
                            <div
                              key={key}
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: `hsl(${cor})` }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirEditor(template);
                        }}
                        className="gap-1"
                      >
                        <Edit size={14} />
                        Editar
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-6">
              {templateSelecionado ? (
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Preview: {templateSelecionado.nome}</h3>
                    <Badge>{templateSelecionado.categoria}</Badge>
                  </div>
                  
                  <div className="bg-gradient-to-b from-background to-muted/20 rounded-lg p-4 h-96 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Eye size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="font-medium">Preview da Tela "Hoje"</p>
                      <p className="text-sm">com este template aplicado</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Cabeçalho:</span>
                        <span className="ml-2 capitalize">{templateSelecionado.layout.cabecalho}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cards:</span>
                        <span className="ml-2 capitalize">{templateSelecionado.cardsAtividade.estilo}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Animações:</span>
                        <span className="ml-2">{templateSelecionado.cardsAtividade.animacao ? 'Sim' : 'Não'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gradientes:</span>
                        <span className="ml-2">{templateSelecionado.elementos.gradientes ? 'Sim' : 'Não'}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-8 text-center text-muted-foreground">
                  <Eye size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="font-medium">Selecione um template</p>
                  <p className="text-sm">para ver o preview</p>
                </Card>
              )}
            </div>
          </div>
        ) : (
          <Card className="p-8 text-center text-muted-foreground">
            <p className="font-medium">Nenhum template encontrado</p>
            <p className="text-sm">para a categoria selecionada</p>
          </Card>
        )}
      </div>
    </WriterLayout>
  );
};
