
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ShoppingBag, DollarSign, Eye, Share, BarChart3, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Produto {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  publicado: boolean;
  vendas: number;
  receita: number;
  link_venda: string;
  created_at: string;
}

export const WriterProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: '1',
      titulo: '21 Dias de Fé',
      descricao: 'Uma jornada transformadora de crescimento na fé cristã',
      preco: 29.90,
      publicado: true,
      vendas: 45,
      receita: 1345.50,
      link_venda: 'https://link.produto.com/21-dias-fe',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      titulo: 'Crescimento Espiritual',
      descricao: 'Desenvolvendo uma vida espiritual mais profunda',
      preco: 39.90,
      publicado: true,
      vendas: 32,
      receita: 1276.80,
      link_venda: 'https://link.produto.com/crescimento-espiritual',
      created_at: '2024-02-01'
    },
    {
      id: '3',
      titulo: 'Esperança em Tempos Difíceis',
      descricao: 'Encontrando esperança e paz em meio às adversidades',
      preco: 24.90,
      publicado: false,
      vendas: 0,
      receita: 0,
      link_venda: '',
      created_at: '2024-03-10'
    }
  ]);

  const togglePublicacao = (id: string) => {
    setProdutos(produtos.map(produto => 
      produto.id === id 
        ? { ...produto, publicado: !produto.publicado }
        : produto
    ));
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    // Aqui poderia adicionar um toast de sucesso
  };

  return (
    <WriterLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Produtos</h1>
            <p className="text-muted-foreground">Gerencie seus produtos e vendas</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="premium">
                <Plus size={20} />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Novo Produto</DialogTitle>
                <DialogDescription>
                  Transforme uma jornada em produto para venda
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="titulo">Título do Produto</Label>
                  <Input id="titulo" placeholder="Digite o título..." />
                </div>
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea id="descricao" placeholder="Descreva seu produto..." />
                </div>
                <div>
                  <Label htmlFor="preco">Preço (R$)</Label>
                  <Input id="preco" type="number" placeholder="29,90" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Criar Produto</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
              <ShoppingBag className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">77</div>
              <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 2.622</div>
              <p className="text-xs text-muted-foreground">+23% este mês</p>
            </CardContent>
          </Card>
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">de 3 produtos criados</p>
            </CardContent>
          </Card>
        </div>

        {/* Products List */}
        <div className="space-y-6">
          {produtos.map((produto) => (
            <Card key={produto.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      {produto.titulo}
                      <Badge variant={produto.publicado ? 'default' : 'secondary'}>
                        {produto.publicado ? 'Publicado' : 'Rascunho'}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {produto.descricao}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`switch-${produto.id}`} className="text-sm">
                      {produto.publicado ? 'Publicado' : 'Rascunho'}
                    </Label>
                    <Switch
                      id={`switch-${produto.id}`}
                      checked={produto.publicado}
                      onCheckedChange={() => togglePublicacao(produto.id)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Preço</p>
                    <p className="text-2xl font-bold text-green-600">
                      R$ {produto.preco.toFixed(2)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Vendas</p>
                    <p className="text-2xl font-bold">{produto.vendas}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Receita</p>
                    <p className="text-2xl font-bold text-green-600">
                      R$ {produto.receita.toFixed(2)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Ações</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye size={16} />
                        Preview
                      </Button>
                      {produto.publicado && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyLink(produto.link_venda)}
                        >
                          <Share size={16} />
                          Copiar Link
                        </Button>
                      )}
                    </div>
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
