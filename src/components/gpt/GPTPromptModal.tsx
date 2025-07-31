import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GPTPromptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PROMPT_TEMPLATE = `Você é um especialista em criar jornadas devocionais cristãs. Crie uma jornada completa em formato JSON seguindo EXATAMENTE esta estrutura:

{
  "titulo": "Nome da Jornada (ex: 21 Dias de Fé)",
  "descricao": "Descrição detalhada da jornada e seus objetivos",
  "duracao": 21,
  "imagem_capa": "https://exemplo.com/imagem.jpg",
  "dias": [
    {
      "dia": 1,
      "tema": "Título do dia",
      "devocional": "Texto completo do devocional (300-500 palavras)",
      "passagem": "Referência bíblica (ex: João 3:16)",
      "quiz": {
        "pergunta": "Pergunta sobre o devocional",
        "opcoes": ["Opção A", "Opção B", "Opção C", "Opção D"],
        "resposta_correta": "Opção A"
      },
      "oracao": "Oração completa para o dia (100-200 palavras)"
    }
  ]
}

INSTRUÇÕES IMPORTANTES:
- Crie TODOS os dias da jornada (não apenas exemplo)
- Cada devocional deve ter 300-500 palavras
- Quiz com 4 opções sempre
- Oração personalizada para cada dia
- Tema específico e relevante para cada dia
- Use apenas JSON válido
- NÃO adicione comentários no JSON

Tema da jornada: [DESCREVA O TEMA AQUI]`;

export const GPTPromptModal = ({ open, onOpenChange }: GPTPromptModalProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT_TEMPLATE);
      setCopied(true);
      toast({
        title: "Prompt copiado!",
        description: "Cole no ChatGPT e descreva o tema da sua jornada",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Tente selecionar e copiar manualmente",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Prompt para ChatGPT</DialogTitle>
          <DialogDescription>
            Copie este prompt, cole no ChatGPT e descreva o tema da sua jornada
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Textarea
              value={PROMPT_TEMPLATE}
              readOnly
              className="min-h-[400px] font-mono text-sm"
            />
            <Button
              onClick={copyToClipboard}
              className="absolute top-2 right-2"
              size="sm"
              variant="outline"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copiar
                </>
              )}
            </Button>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Como usar:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Copie o prompt acima</li>
              <li>Cole no ChatGPT</li>
              <li>Substitua "[DESCREVA O TEMA AQUI]" pelo tema da sua jornada</li>
              <li>Execute no ChatGPT</li>
              <li>Copie o JSON gerado</li>
              <li>Use o botão "Importar JSON" para adicionar ao projeto</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};