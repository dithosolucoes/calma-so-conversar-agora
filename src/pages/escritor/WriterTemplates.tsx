import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Template {
  id: string;
  nome: string;
  categoria: 'minimalista' | 'colorido' | 'elegante' | 'moderno';
  thumbnail: string;
  descricao: string;
  cores: {
    primary: string;
    secondary: string;
    background: string;
  };
}

export const WriterTemplates = () => {
  const navigate = useNavigate();
  const [templates] = useState<Template[]>([]);

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'minimalista':
        return 'bg-green-100 text-green-800';
      case 'colorido':
        return 'bg-orange-100 text-orange-800';
      case 'elegante':
        return 'bg-purple-100 text-purple-800';
      case 'moderno':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <WriterLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Templates</h1>
            <p className="text-muted-foreground">Escolha um template para criar seu produto devocional</p>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{template.nome}</CardTitle>
                    <Badge className={getCategoriaColor(template.categoria)}>
                      {template.categoria}
                    </Badge>
                  </div>
                  <Palette size={20} className="text-muted-foreground" />
                </div>
                <CardDescription>{template.descricao}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Thumbnail */}
                  <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                    <img 
                      src={template.thumbnail} 
                      alt={template.nome}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Color Palette */}
                  <div className="flex gap-2">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: template.cores.primary }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: template.cores.secondary }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: template.cores.background }}
                    />
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/escritor/criar-produto?template=${template.id}`)}
                    >
                      Usar Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </WriterLayout>
  );
};