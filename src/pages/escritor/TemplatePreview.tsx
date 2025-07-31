import { useParams, useNavigate } from 'react-router-dom';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles, Book, HelpCircle, Heart } from 'lucide-react';

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

const templates: Template[] = [
  {
    id: '1',
    nome: 'Aurora Sagrada',
    categoria: 'elegante',
    thumbnail: '/placeholder.svg',
    descricao: 'Design elegante com gradientes suaves e tipografia refinada',
    cores: {
      primary: '#6366F1',
      secondary: '#EC4899',
      background: '#F8FAFC'
    }
  },
  {
    id: '2',
    nome: 'Paz Minimalista',
    categoria: 'minimalista',
    thumbnail: '/placeholder.svg',
    descricao: 'Layout limpo e focado na essência do conteúdo',
    cores: {
      primary: '#059669',
      secondary: '#10B981',
      background: '#FFFFFF'
    }
  },
  {
    id: '3',
    nome: 'Luz Vibrante',
    categoria: 'colorido',
    thumbnail: '/placeholder.svg',
    descricao: 'Cores vivas e energia positiva para inspirar',
    cores: {
      primary: '#F59E0B',
      secondary: '#EF4444',
      background: '#FEF3C7'
    }
  },
  {
    id: '4',
    nome: 'Moderno Clean',
    categoria: 'moderno',
    thumbnail: '/placeholder.svg',
    descricao: 'Interface moderna com elementos contemporâneos',
    cores: {
      primary: '#8B5CF6',
      secondary: '#06B6D4',
      background: '#F1F5F9'
    }
  }
];

const mockContent = {
  dia: 1,
  tema: "O Amor de Deus",
  devocional: "Deus é amor, e quem permanece no amor permanece em Deus, e Deus nele. Esta é uma das verdades mais fundamentais da nossa fé...",
  passagem: "1 João 4:16",
  quiz: {
    pergunta: "Segundo 1 João 4:16, o que acontece quando permanecemos no amor?",
    opcoes: [
      "Deus nos abençoa",
      "Permanecemos em Deus e Deus em nós",
      "Somos salvos",
      "Recebemos paz"
    ],
    resposta_correta: "Permanecemos em Deus e Deus em nós"
  },
  oracao: "Senhor, ajuda-me a compreender mais profundamente o Teu amor e a viver de acordo com ele..."
};

export const TemplatePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const template = templates.find(t => t.id === id);
  
  if (!template) {
    return (
      <WriterLayout>
        <div className="p-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/escritor/templates')}
            className="mb-4"
          >
            <ArrowLeft size={16} />
            Voltar
          </Button>
          <p>Template não encontrado</p>
        </div>
      </WriterLayout>
    );
  }

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
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/escritor/templates')}
            >
              <ArrowLeft size={16} />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Preview: {template.nome}</h1>
              <p className="text-muted-foreground">Veja como seu conteúdo ficará com este template</p>
            </div>
          </div>
          <Button 
            variant="premium" 
            size="lg"
            onClick={() => navigate(`/escritor/criar-produto?template=${template.id}`)}
          >
            <Sparkles size={16} />
            Usar Este Template
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Template Info */}
          <div className="xl:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles size={20} />
                  Informações do Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">{template.nome}</h3>
                  <Badge className={getCategoriaColor(template.categoria)}>
                    {template.categoria}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{template.descricao}</p>
                
                {/* Color Palette */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Paleta de Cores</h4>
                  <div className="flex gap-2">
                    <div className="text-center">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm mx-auto"
                        style={{ backgroundColor: template.cores.primary }}
                      />
                      <span className="text-xs text-muted-foreground">Primary</span>
                    </div>
                    <div className="text-center">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm mx-auto"
                        style={{ backgroundColor: template.cores.secondary }}
                      />
                      <span className="text-xs text-muted-foreground">Secondary</span>
                    </div>
                    <div className="text-center">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm mx-auto"
                        style={{ backgroundColor: template.cores.background }}
                      />
                      <span className="text-xs text-muted-foreground">Background</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Content */}
          <div className="xl:col-span-2">
            <div 
              className="rounded-lg border p-8 space-y-6"
              style={{ 
                backgroundColor: template.cores.background,
                borderColor: template.cores.primary + '20'
              }}
            >
              <div className="text-center space-y-2">
                <h2 
                  className="text-2xl font-bold"
                  style={{ color: template.cores.primary }}
                >
                  Dia {mockContent.dia}
                </h2>
                <h3 
                  className="text-xl font-semibold"
                  style={{ color: template.cores.secondary }}
                >
                  {mockContent.tema}
                </h3>
              </div>

              {/* Devocional */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle 
                    className="flex items-center gap-2 text-lg"
                    style={{ color: template.cores.primary }}
                  >
                    <Book size={18} />
                    Devocional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">
                    {mockContent.devocional}
                  </p>
                </CardContent>
              </Card>

              {/* Passagem */}
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p 
                      className="text-lg font-medium italic"
                      style={{ color: template.cores.secondary }}
                    >
                      "{mockContent.passagem}"
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Quiz */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle 
                    className="flex items-center gap-2 text-lg"
                    style={{ color: template.cores.primary }}
                  >
                    <HelpCircle size={18} />
                    Reflexão
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="font-medium">{mockContent.quiz.pergunta}</p>
                  <div className="space-y-2">
                    {mockContent.quiz.opcoes.map((opcao, index) => (
                      <div 
                        key={index}
                        className="p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                        style={{ 
                          borderColor: opcao === mockContent.quiz.resposta_correta 
                            ? template.cores.primary 
                            : '#e2e8f0'
                        }}
                      >
                        <span className="text-sm">{opcao}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Oração */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle 
                    className="flex items-center gap-2 text-lg"
                    style={{ color: template.cores.primary }}
                  >
                    <Heart size={18} />
                    Oração
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed italic">
                    {mockContent.oracao}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </WriterLayout>
  );
};