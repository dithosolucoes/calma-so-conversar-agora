
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, MoreHorizontal, Calendar, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface Jornada {
  id: string;
  titulo: string;
  descricao: string;
  duracao: number;
  status: 'rascunho' | 'publicada' | 'arquivada';
  usuarios_ativos: number;
  created_at: string;
  imagem_capa?: string;
}

export const WriterJornadas = () => {
  const navigate = useNavigate();
  const [jornadas] = useState<Jornada[]>([
    {
      id: '1',
      titulo: '21 Dias de Fé',
      descricao: 'Uma jornada transformadora de crescimento na fé cristã',
      duracao: 21,
      status: 'publicada',
      usuarios_ativos: 45,
      created_at: '2024-01-15'
    },
    {
      id: '2',
      titulo: 'Crescimento Espiritual',
      descricao: 'Desenvolvendo uma vida espiritual mais profunda',
      duracao: 30,
      status: 'publicada',
      usuarios_ativos: 32,
      created_at: '2024-02-01'
    },
    {
      id: '3',
      titulo: 'Esperança em Tempos Difíceis',
      descricao: 'Encontrando esperança e paz em meio às adversidades',
      duracao: 14,
      status: 'rascunho',
      usuarios_ativos: 0,
      created_at: '2024-03-10'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'publicada':
        return 'bg-green-100 text-green-800';
      case 'rascunho':
        return 'bg-yellow-100 text-yellow-800';
      case 'arquivada':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'publicada':
        return 'Publicada';
      case 'rascunho':
        return 'Rascunho';
      case 'arquivada':
        return 'Arquivada';
      default:
        return status;
    }
  };

  return (
    <WriterLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Jornadas</h1>
            <p className="text-muted-foreground">Gerencie suas jornadas devocionais</p>
          </div>
          <Button onClick={() => navigate('/escritor/jornadas/nova')} variant="premium">
            <Plus size={20} />
            Nova Jornada
          </Button>
        </div>

        {/* Jornadas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jornadas.map((jornada) => (
            <Card key={jornada.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{jornada.titulo}</CardTitle>
                    <Badge className={getStatusColor(jornada.status)}>
                      {getStatusText(jornada.status)}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/escritor/jornadas/${jornada.id}/editar`)}>
                        <Edit size={16} className="mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye size={16} className="mr-2" />
                        Preview
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>{jornada.descricao}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {jornada.duracao} dias
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      {jornada.usuarios_ativos} usuários
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/escritor/jornadas/${jornada.id}/editar`)}
                    >
                      <Edit size={16} />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye size={16} />
                      Preview
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
