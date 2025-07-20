
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, Edit, Search, Filter, Calendar, BookOpen } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ConteudoItem {
  id: string;
  jornada_titulo: string;
  dia: number;
  tema: string;
  tipo: 'devocional' | 'quiz' | 'oracao' | 'passagem';
  status: 'completo' | 'rascunho' | 'vazio';
  ultima_edicao: string;
}

export const WriterConteudo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterJornada, setFilterJornada] = useState('todas');
  const [filterTipo, setFilterTipo] = useState('todos');

  const [conteudos] = useState<ConteudoItem[]>([
    {
      id: '1',
      jornada_titulo: '21 Dias de Fé',
      dia: 1,
      tema: 'O Fundamento da Fé',
      tipo: 'devocional',
      status: 'completo',
      ultima_edicao: '2024-03-15'
    },
    {
      id: '2',
      jornada_titulo: '21 Dias de Fé',
      dia: 1,
      tema: 'Quiz sobre Fé',
      tipo: 'quiz',
      status: 'completo',
      ultima_edicao: '2024-03-15'
    },
    {
      id: '3',
      jornada_titulo: 'Crescimento Espiritual',
      dia: 5,
      tema: 'Desenvolvendo Disciplinas',
      tipo: 'devocional',
      status: 'rascunho',
      ultima_edicao: '2024-03-10'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completo':
        return 'bg-green-100 text-green-800';
      case 'rascunho':
        return 'bg-yellow-100 text-yellow-800';
      case 'vazio':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'devocional':
        return FileText;
      case 'quiz':
        return BookOpen;
      case 'oracao':
        return Calendar;
      default:
        return FileText;
    }
  };

  const filteredConteudos = conteudos.filter(item => {
    const matchSearch = item.tema.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.jornada_titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchJornada = filterJornada === 'todas' || item.jornada_titulo === filterJornada;
    const matchTipo = filterTipo === 'todos' || item.tipo === filterTipo;
    
    return matchSearch && matchJornada && matchTipo;
  });

  return (
    <WriterLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Conteúdo</h1>
            <p className="text-muted-foreground">Gerencie todo o conteúdo das suas jornadas</p>
          </div>
          <Button variant="premium">
            <FileText size={20} />
            Novo Conteúdo
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter size={20} />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Buscar conteúdo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterJornada} onValueChange={setFilterJornada}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por jornada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Jornadas</SelectItem>
                  <SelectItem value="21 Dias de Fé">21 Dias de Fé</SelectItem>
                  <SelectItem value="Crescimento Espiritual">Crescimento Espiritual</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterTipo} onValueChange={setFilterTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="devocional">Devocional</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="oracao">Oração</SelectItem>
                  <SelectItem value="passagem">Passagem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Content List */}
        <div className="space-y-4">
          {filteredConteudos.map((item) => {
            const TipoIcon = getTipoIcon(item.tipo);
            return (
              <Card key={item.id} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        <TipoIcon size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.tema}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.jornada_titulo} - Dia {item.dia}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Editado em {item.ultima_edicao}
                      </p>
                      <Button variant="outline" size="sm">
                        <Edit size={16} />
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </WriterLayout>
  );
};
