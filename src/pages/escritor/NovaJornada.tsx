
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const NovaJornada = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    duracao: 7,
    imagem_capa: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular salvamento
    toast({
      title: "Jornada criada com sucesso!",
      description: "Sua nova jornada foi salva como rascunho.",
    });
    
    navigate('/escritor/jornadas');
  };

  const handleSaveDraft = () => {
    toast({
      title: "Rascunho salvo",
      description: "Suas alterações foram salvas automaticamente.",
    });
  };

  return (
    <WriterLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/escritor/jornadas')}>
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Nova Jornada</h1>
              <p className="text-muted-foreground">Crie uma nova jornada devocional</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save size={20} />
              Salvar Rascunho
            </Button>
            <Button variant="outline">
              <Eye size={20} />
              Preview
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Jornada</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título da Jornada</Label>
                    <Input
                      id="titulo"
                      placeholder="Ex: 21 Dias de Fé"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      placeholder="Descreva o propósito e objetivo desta jornada..."
                      rows={4}
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duracao">Duração (dias)</Label>
                    <Input
                      id="duracao"
                      type="number"
                      min="1"
                      max="365"
                      value={formData.duracao}
                      onChange={(e) => setFormData({ ...formData, duracao: parseInt(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imagem_capa">URL da Imagem de Capa (opcional)</Label>
                    <Input
                      id="imagem_capa"
                      type="url"
                      placeholder="https://exemplo.com/imagem.jpg"
                      value={formData.imagem_capa}
                      onChange={(e) => setFormData({ ...formData, imagem_capa: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" variant="premium" className="flex-1">
                      Criar Jornada
                    </Button>
                    <Button type="button" variant="outline" onClick={() => navigate('/escritor/jornadas')}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.imagem_capa && (
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={formData.imagem_capa} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{formData.titulo || 'Título da Jornada'}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.descricao || 'Descrição da jornada aparecerá aqui...'}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                        {formData.duracao} dias
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </WriterLayout>
  );
};
