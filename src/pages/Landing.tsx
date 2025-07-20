import { ArrowRight, Clock, Users, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockJornada } from '@/data/mockData';

export const Landing = () => {
  const navigate = useNavigate();

  const handleIniciarJornada = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative px-4 pt-12 pb-8">
        <div className="max-w-lg mx-auto text-center space-y-6">
          {/* Hero Image */}
          <div className="relative mx-auto w-64 h-48 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop"
              alt="Jornada Espiritual"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Title & Description */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground leading-tight">
              {mockJornada.titulo}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {mockJornada.descricao}
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 py-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary">
                <Clock size={18} />
                <span className="font-semibold">{mockJornada.duracao}</span>
              </div>
              <p className="text-sm text-muted-foreground">dias</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary">
                <Users size={18} />
                <span className="font-semibold">1.2k</span>
              </div>
              <p className="text-sm text-muted-foreground">pessoas</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary">
                <Star size={18} />
                <span className="font-semibold">4.9</span>
              </div>
              <p className="text-sm text-muted-foreground">avaliação</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-8">
        <div className="max-w-lg mx-auto space-y-6">
          <h2 className="text-xl font-semibold text-center text-foreground">
            O que você vai receber
          </h2>
          
          <div className="space-y-4">
            {[
              {
                icon: <CheckCircle className="text-green-500" size={20} />,
                title: "Devocionais Diários",
                description: "Reflexões profundas para cada dia da sua jornada"
              },
              {
                icon: <CheckCircle className="text-green-500" size={20} />,
                title: "Passagens Bíblicas",
                description: "Textos sagrados cuidadosamente selecionados"
              },
              {
                icon: <CheckCircle className="text-green-500" size={20} />,
                title: "Quiz Interativo",
                description: "Teste seus conhecimentos e fixe o aprendizado"
              },
              {
                icon: <CheckCircle className="text-green-500" size={20} />,
                title: "Orações Guiadas",
                description: "Momentos de conexão espiritual orientados"
              }
            ].map((feature, index) => (
              <div key={index} className="flex gap-3 p-4 bg-card rounded-lg border">
                {feature.icon}
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="px-4 py-8 bg-muted/30">
        <div className="max-w-lg mx-auto space-y-6">
          <h2 className="text-xl font-semibold text-center text-foreground">
            Prévia do Primeiro Dia
          </h2>
          
          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="space-y-4">
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  Dia 1
                </span>
                <h3 className="text-lg font-semibold mt-2 text-foreground">
                  {mockJornada.dias[0].tema}
                </h3>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {mockJornada.dias[0].devocional.substring(0, 150)}...
              </p>
              
              <div className="text-center pt-2">
                <span className="text-sm text-muted-foreground">
                  E muito mais conteúdo te aguarda!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 py-12">
        <div className="max-w-lg mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-2xl font-bold text-foreground">Gratuito</p>
            <p className="text-sm text-muted-foreground">
              Comece sua jornada espiritual hoje
            </p>
          </div>
          
          <button 
            onClick={handleIniciarJornada}
            className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg"
          >
            Iniciar Jornada
            <ArrowRight size={20} />
          </button>
          
          <p className="text-xs text-center text-muted-foreground">
            Sem compromisso • Cancele quando quiser
          </p>
        </div>
      </div>
    </div>
  );
};
