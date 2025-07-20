
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TemplateConfig } from '@/types/template';
import { Plus } from 'lucide-react';

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTemplate: (template: Partial<TemplateConfig>) => void;
}

export const CreateTemplateModal = ({ isOpen, onClose, onCreateTemplate }: CreateTemplateModalProps) => {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState<'minimalista' | 'colorido' | 'elegante' | 'moderno'>('minimalista');

  const handleCreate = () => {
    if (!nome.trim()) return;

    const newTemplate: Partial<TemplateConfig> = {
      nome,
      categoria,
      cores: {
        primary: '220 13% 91%',
        secondary: '220 14.3% 95.9%',
        accent: '220 13% 91%',
        background: '0 0% 100%',
        card: '0 0% 100%',
        text: '220 8.9% 46.1%'
      },
      layout: {
        cabecalho: 'completo',
        mostrarData: true,
        mostrarProgresso: true,
        estiloBotaoFavorito: true,
        espacamentoCabecalho: 'medio'
      },
      tipografia: {
        fontePrimaria: 'Inter',
        tamanhoTitulo: 'medio',
        pesoTitulo: 'semibold'
      },
      cardsAtividade: {
        estilo: 'padrao',
        bordas: 'arredondadas',
        sombra: 'suave',
        animacao: true
      },
      elementos: {
        gradientes: false,
        icones3d: false,
        particulas: false,
        fundoAnimado: false
      }
    };

    onCreateTemplate(newTemplate);
    setNome('');
    setCategoria('minimalista');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Novo Template</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome do Template</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Moderno Azul"
            />
          </div>

          <div>
            <Label htmlFor="categoria">Categoria</Label>
            <Select value={categoria} onValueChange={(value: any) => setCategoria(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimalista">Minimalista</SelectItem>
                <SelectItem value="colorido">Colorido</SelectItem>
                <SelectItem value="elegante">Elegante</SelectItem>
                <SelectItem value="moderno">Moderno</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleCreate} className="flex-1" disabled={!nome.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
