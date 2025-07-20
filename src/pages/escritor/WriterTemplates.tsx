
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Eye, Download, Star, Plus, Smartphone, Monitor } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Template {
  id: string;
  nome: string;
  descricao: string;
  categoria: 'moderno' | 'classico' | 'minimalista' | 'colorido';
  rating: number;
  downloads: number;
  preview_image: string;
  cores_primarias: string[];
  gratuito: boolean;
}

export const WriterTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  
  const [templates] = useState<Template[]>([
    {
      id: '1',
      nome: 'Fé Moderna',
      descricao: 'Template moderno com design limpo e cores suaves',
      categoria: 'moderno',
      rating: 4.8,
      downloads: 1250,
      preview_image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=400&fit=crop',
      cores_primarias: ['#3B82F6', '#8B5CF6', '#06B6D4'],
      gratuito: true
    },
    {
      id: '2',
      nome: 'Clássico Elegante',
      descricao: 'Design tradicional com elementos clássicos',
      categoria: 'classico',
      rating: 4.6,
      downloads: 890,
      preview_image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=400&fit=crop',
      cores_primarias: ['#92400E', '#B45309', '#D97706'],
      gratuito: false
    },
    {
      id: '3',
      nome: 'Minimalista Zen',
      descricao: 'Simplicidade e foco no conteúdo',
      categoria: 'minimalista',
      rating: 4.9,
      downloads: 2100,
      preview_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=400&fit=crop',
      cores_primarias: ['#6B7280', '#374151', '#111827'],
      gratuito: true
    },
    {
      id: '4',
      nome: 'Alegria Colorida',
      descricao: 'Template vibrante com cores alegres',
      categoria: 'colorido',
      rating: 4.7,
      downloads: 750,
      preview_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop',
      cores_primarias: ['#EF4444', '#F59E0B', '#10B981'],
      gratuito: false
    }
  ]);

  const filteredTemplates = selectedCategory === 'todos' 
    ? templates 
    : templates.filter(t => t.categoria === selectedCategory);

  return (
    <WriterLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Templates</h1>
            <p className="text-muted-foreground">Escolha o design perfeito para suas jornadas</p>
          </div>
          <Button variant="premium">
            <Plus size={20} />
            Criar Template
          </Button>
        </div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover-lift overflow-hidden">
                  <div className="relative">
                    <img 
                      src={template.preview_image} 
                      alt={template.nome}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      {template.gratuito ? (
                        <Badge className="bg-green-500">Grátis</Badge>
                      ) : (
                        <Badge className="bg-blue-500">Premium</Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{template.nome}</CardTitle>
                        <CardDescription>{template.descricao}</CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        {template.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download size={16} />
                        {template.downloads}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Color Palette */}
                      <div>
                        <p className="text-sm font-medium mb-2">Paleta de Cores</p>
                        <div className="flex gap-2">
                          {template.cores_primarias.map((cor, index) => (
                            <div 
                              key={index}
                              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: cor }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye size={16} />
                          Preview
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Palette size={16} />
                          Usar Template
                        </Button>
                      </div>
                      
                      {/* Device Preview Icons */}
                      <div className="flex items-center justify-center gap-4 pt-2 border-t">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Smartphone size={14} />
                          Mobile
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Monitor size={14} />
                          Desktop
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Custom Template Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Palette size={24} />
              Crie Seu Próprio Template
            </CardTitle>
            <CardDescription>
              Use nosso editor visual para criar um template personalizado
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="premium" size="lg">
              Abrir Editor Visual
            </Button>
          </CardContent>
        </Card>
      </div>
    </WriterLayout>
  );
};
