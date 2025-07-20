
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { TemplateConfig } from '@/types/template';
import { InteractiveTemplatePreview } from './InteractiveTemplatePreview';

interface TemplateEditorProps {
  template: TemplateConfig;
  onTemplateChange: (template: TemplateConfig) => void;
}

export const TemplateEditor = ({ template, onTemplateChange }: TemplateEditorProps) => {
  const updateTemplate = (updates: Partial<TemplateConfig>) => {
    onTemplateChange({ ...template, ...updates });
  };

  const hexToHsl = (hex: string): string => {
    // Converte hex para HSL (simplificado)
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Editor */}
      <div className="space-y-6 overflow-y-auto max-h-[80vh]">
        {/* Cores */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Cores</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary">Cor Primária</Label>
              <Input
                id="primary"
                type="color"
                value={`#${template.cores.primary.replace(/\D/g, '').padStart(6, '0')}`}
                onChange={(e) => updateTemplate({
                  cores: { ...template.cores, primary: hexToHsl(e.target.value) }
                })}
                className="h-10"
              />
            </div>
            <div>
              <Label htmlFor="secondary">Cor Secundária</Label>
              <Input
                id="secondary"
                type="color"
                value={`#${template.cores.secondary.replace(/\D/g, '').padStart(6, '0')}`}
                onChange={(e) => updateTemplate({
                  cores: { ...template.cores, secondary: hexToHsl(e.target.value) }
                })}
                className="h-10"
              />
            </div>
          </div>
        </Card>

        {/* Layout */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Layout</h3>
          <div className="space-y-4">
            <div>
              <Label>Estilo do Cabeçalho</Label>
              <Select
                value={template.layout.cabecalho}
                onValueChange={(value: any) => updateTemplate({
                  layout: { ...template.layout, cabecalho: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="compacto">Compacto</SelectItem>
                  <SelectItem value="completo">Completo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label>Mostrar Data</Label>
              <Switch
                checked={template.layout.mostrarData}
                onCheckedChange={(checked) => updateTemplate({
                  layout: { ...template.layout, mostrarData: checked }
                })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Mostrar Progresso</Label>
              <Switch
                checked={template.layout.mostrarProgresso}
                onCheckedChange={(checked) => updateTemplate({
                  layout: { ...template.layout, mostrarProgresso: checked }
                })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Botão Favorito</Label>
              <Switch
                checked={template.layout.estiloBotaoFavorito}
                onCheckedChange={(checked) => updateTemplate({
                  layout: { ...template.layout, estiloBotaoFavorito: checked }
                })}
              />
            </div>
          </div>
        </Card>

        {/* Tipografia */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Tipografia</h3>
          <div className="space-y-4">
            <div>
              <Label>Fonte Primária</Label>
              <Select
                value={template.tipografia.fontePrimaria}
                onValueChange={(value) => updateTemplate({
                  tipografia: { ...template.tipografia, fontePrimaria: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tamanho do Título</Label>
              <Select
                value={template.tipografia.tamanhoTitulo}
                onValueChange={(value: any) => updateTemplate({
                  tipografia: { ...template.tipografia, tamanhoTitulo: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pequeno">Pequeno</SelectItem>
                  <SelectItem value="medio">Médio</SelectItem>
                  <SelectItem value="grande">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Peso do Título</Label>
              <Select
                value={template.tipografia.pesoTitulo}
                onValueChange={(value: any) => updateTemplate({
                  tipografia: { ...template.tipografia, pesoTitulo: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="semibold">Semibold</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Cards de Atividade */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Cards de Atividade</h3>
          <div className="space-y-4">
            <div>
              <Label>Estilo dos Cards</Label>
              <Select
                value={template.cardsAtividade.estilo}
                onValueChange={(value: any) => updateTemplate({
                  cardsAtividade: { ...template.cardsAtividade, estilo: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="padrao">Padrão</SelectItem>
                  <SelectItem value="compacto">Compacto</SelectItem>
                  <SelectItem value="detalhado">Detalhado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Bordas</Label>
              <Select
                value={template.cardsAtividade.bordas}
                onValueChange={(value: any) => updateTemplate({
                  cardsAtividade: { ...template.cardsAtividade, bordas: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retas">Retas</SelectItem>
                  <SelectItem value="arredondadas">Arredondadas</SelectItem>
                  <SelectItem value="muito-arredondadas">Muito Arredondadas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Sombra</Label>
              <Select
                value={template.cardsAtividade.sombra}
                onValueChange={(value: any) => updateTemplate({
                  cardsAtividade: { ...template.cardsAtividade, sombra: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nenhuma">Nenhuma</SelectItem>
                  <SelectItem value="suave">Suave</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="forte">Forte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label>Animações</Label>
              <Switch
                checked={template.cardsAtividade.animacao}
                onCheckedChange={(checked) => updateTemplate({
                  cardsAtividade: { ...template.cardsAtividade, animacao: checked }
                })}
              />
            </div>
          </div>
        </Card>

        {/* Elementos Visuais */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Elementos Visuais</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Gradientes</Label>
              <Switch
                checked={template.elementos.gradientes}
                onCheckedChange={(checked) => updateTemplate({
                  elementos: { ...template.elementos, gradientes: checked }
                })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Ícones 3D</Label>
              <Switch
                checked={template.elementos.icones3d}
                onCheckedChange={(checked) => updateTemplate({
                  elementos: { ...template.elementos, icones3d: checked }
                })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Partículas</Label>
              <Switch
                checked={template.elementos.particulas}
                onCheckedChange={(checked) => updateTemplate({
                  elementos: { ...template.elementos, particulas: checked }
                })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Fundo Animado</Label>
              <Switch
                checked={template.elementos.fundoAnimado}
                onCheckedChange={(checked) => updateTemplate({
                  elementos: { ...template.elementos, fundoAnimado: checked }
                })}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Preview */}
      <div className="bg-card rounded-lg p-4">
        <h3 className="font-medium mb-4">Preview Interativo</h3>
        <InteractiveTemplatePreview template={template} />
      </div>
    </div>
  );
};
