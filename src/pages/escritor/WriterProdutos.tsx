import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Users, DollarSign, Eye, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Produto {
  id: string;
  titulo: string;
  descricao: string;
  duracao: number;
  categoria: string;
  preco: number;
  status: 'ativo' | 'rascunho' | 'pausado';
  vendas: number;
  receita: number;
  created_at: string;
}

export const WriterProdutos = () => {
  const navigate = useNavigate();
  const [produtos] = useState<Produto[]>([
    {
      id: '1',
      titulo: '21 Dias de Fé Transformadora',
      descricao: 'Uma jornada completa de crescimento espiritual com devocionais diários',
      duracao: 21,
      categoria: 'fé',
      preco: 29.90,
      status: 'ativo',
      vendas: 45,
      receita: 1345.50,
      created_at: '2024-01-15'
    },
    {
      id: '2',
      titulo: 'Oração que Transforma',
      descricao: 'Aprofunde sua vida de oração com 14 dias de conteúdo inspirador',
      duracao: 14,
      categoria: 'oração',
      preco: 19.90,
      status: 'ativo',
      vendas: 32,
      receita: 636.80,
      created_at: '2024-02-01'
    },
    {
      id: '3',
      titulo: 'Gratidão Diária',
      descricao: 'Cultive um coração grato com reflexões e exercícios práticos',
      duracao: 30,
      categoria: 'gratidão',
      preco: 39.90,
      status: 'rascunho',
      vendas: 0,
      receita: 0,
      created_at: '2024-03-10'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'rascunho':
        return 'bg-yellow-100 text-yellow-800';
      case 'pausado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalVendas = produtos.reduce((acc, produto) => acc + produto.vendas, 0);
  const totalReceita = produtos.reduce((acc, produto) => acc + produto.receita, 0);
  const produtosAtivos = produtos.filter(p => p.status === 'ativo').length;

  return (
    <WriterLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Produtos</h1>
            <p className="text-muted-foreground">Gerencie seus produtos devocionais</p>
          </div>
          <Button onClick={() => navigate('/escritor/templates')} variant="premium">
            <Plus size={20} />
            Criar Produto
          </Button>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVendas}</div>
              <p className="text-xs text-muted-foreground">
                produtos vendidos
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalReceita.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                faturamento total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{produtosAtivos}</div>
              <p className="text-xs text-muted-foreground">
                disponíveis para venda
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <Card key={produto.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{produto.titulo}</CardTitle>
                    <Badge className={getStatusColor(produto.status)}>
                      {produto.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription>{produto.descricao}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Informações do Produto */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Duração:</span>
                      <div className="text-muted-foreground">{produto.duracao} dias</div>
                    </div>
                    <div>
                      <span className="font-medium">Preço:</span>
                      <div className="text-muted-foreground">R$ {produto.preco}</div>
                    </div>
                    <div>
                      <span className="font-medium">Vendas:</span>
                      <div className="text-muted-foreground">{produto.vendas}</div>
                    </div>
                    <div>
                      <span className="font-medium">Receita:</span>
                      <div className="text-muted-foreground">R$ {produto.receita.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Categoria */}
                  <div className="flex">
                    <Badge variant="outline" className="text-xs">
                      {produto.categoria}
                    </Badge>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye size={16} />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings size={16} />
                      Config
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