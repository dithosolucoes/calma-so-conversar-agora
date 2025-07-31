import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WriterLayout } from '@/components/layout/WriterLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Upload, Sparkles, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const CriarProduto = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  const { toast } = useToast();
  
  const [jsonContent, setJsonContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const gptPrompt = `Crie um produto devocional completo em formato JSON com a seguinte estrutura:

{
  "titulo": "Nome da Jornada",
  "descricao": "Descrição da jornada devocional",
  "duracao": 21,
  "categoria": "fé, crescimento, oração, etc",
  "preco": 29.90,
  "dias": [
    {
      "dia": 1,
      "tema": "Título do Dia",
      "devocional": "Texto completo do devocional (300-500 palavras)",
      "passagem": "Referência bíblica (ex: João 3:16)",
      "quiz": {
        "pergunta": "Pergunta sobre o conteúdo",
        "opcoes": ["Opção A", "Opção B", "Opção C", "Opção D"],
        "resposta_correta": "Opção A"
      },
      "oracao": "Oração dirigida relacionada ao tema"
    }
  ]
}

IMPORTANTE: 
- Crie TODOS os dias (de 1 até o número especificado em duracao)
- Cada devocional deve ter entre 300-500 palavras
- Quiz com 4 opções sempre
- Orações personalizadas para cada dia
- Tema coerente e progressivo`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(gptPrompt);
    toast({
      title: "Prompt copiado!",
      description: "Cole no ChatGPT e gere seu conteúdo",
    });
  };

  const processJSON = () => {
    if (!jsonContent.trim()) {
      toast({
        title: "Erro",
        description: "Cole o JSON gerado pelo ChatGPT",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const data = JSON.parse(jsonContent);
      
      // Validação básica
      if (!data.titulo || !data.dias || !Array.isArray(data.dias)) {
        throw new Error('Estrutura JSON inválida');
      }

      setPreviewData(data);
      
      toast({
        title: "JSON processado!",
        description: `${data.dias.length} dias de conteúdo carregados`,
      });
    } catch (error) {
      toast({
        title: "Erro no JSON",
        description: "Verifique a estrutura do JSON",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const createProduct = () => {
    if (!previewData) return;

    // Aqui seria a integração com o banco de dados
    toast({
      title: "Produto criado!",
      description: `"${previewData.titulo}" foi criado com sucesso`,
    });

    // Redirecionar para produtos
    navigate('/escritor/produtos');
  };

  return (
    <WriterLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/escritor/templates')}
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Criar Produto</h1>
              <p className="text-muted-foreground">Use o ChatGPT para gerar todo o conteúdo</p>
            </div>
          </div>
          {templateId && (
            <div className="text-sm text-muted-foreground">
              Template: {templateId}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lado Esquerdo - Processo */}
          <div className="space-y-6">
            {/* Passo 1 - Copiar Prompt */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  Copiar Prompt para ChatGPT
                </CardTitle>
                <CardDescription>
                  Clique para copiar o prompt e cole no ChatGPT
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={copyPrompt} className="w-full">
                  <Copy size={16} />
                  Copiar Prompt GPT
                </Button>
              </CardContent>
            </Card>

            {/* Passo 2 - Colar JSON */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  Colar JSON Gerado
                </CardTitle>
                <CardDescription>
                  Cole aqui o JSON completo que o ChatGPT gerou
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Cole aqui o JSON do ChatGPT..."
                  value={jsonContent}
                  onChange={(e) => setJsonContent(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
                <Button 
                  onClick={processJSON}
                  disabled={isProcessing || !jsonContent.trim()}
                  className="w-full"
                >
                  {isProcessing ? (
                    <Sparkles size={16} className="animate-spin" />
                  ) : (
                    <Upload size={16} />
                  )}
                  Processar JSON
                </Button>
              </CardContent>
            </Card>

            {/* Passo 3 - Criar Produto */}
            {previewData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    Finalizar Criação
                  </CardTitle>
                  <CardDescription>
                    Tudo pronto! Clique para criar o produto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={createProduct} variant="premium" className="w-full">
                    <CheckCircle size={16} />
                    Criar Produto Final
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Lado Direito - Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview do Conteúdo</CardTitle>
                <CardDescription>
                  Visualização do produto que será criado
                </CardDescription>
              </CardHeader>
              <CardContent>
                {previewData ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{previewData.titulo}</h3>
                      <p className="text-muted-foreground">{previewData.descricao}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Duração:</span> {previewData.duracao} dias
                      </div>
                      <div>
                        <span className="font-medium">Preço:</span> R$ {previewData.preco}
                      </div>
                      <div>
                        <span className="font-medium">Categoria:</span> {previewData.categoria}
                      </div>
                      <div>
                        <span className="font-medium">Dias criados:</span> {previewData.dias?.length || 0}
                      </div>
                    </div>

                    {previewData.dias && previewData.dias.length > 0 && (
                      <div className="border rounded-lg p-4 bg-muted/50">
                        <h4 className="font-medium mb-2">Exemplo - Dia 1:</h4>
                        <div className="space-y-2 text-sm">
                          <div><strong>Tema:</strong> {previewData.dias[0].tema}</div>
                          <div><strong>Passagem:</strong> {previewData.dias[0].passagem}</div>
                          <div><strong>Devocional:</strong> {previewData.dias[0].devocional?.substring(0, 100)}...</div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Aguardando conteúdo do ChatGPT...</p>
                    <p className="text-sm">Cole o JSON gerado para ver o preview</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </WriterLayout>
  );
};