import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { processJSONContent } from '@/lib/contentImporter';
import type { Jornada } from '@/types/devocional';

interface ImportJSONModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ImportJSONModal = ({ open, onOpenChange }: ImportJSONModalProps) => {
  const [jsonInput, setJsonInput] = useState('');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    data?: Jornada;
    error?: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const validateJSON = () => {
    if (!jsonInput.trim()) {
      setValidationResult(null);
      return;
    }

    try {
      const result = processJSONContent(jsonInput);
      setValidationResult(result);
    } catch (error) {
      setValidationResult({
        isValid: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  };

  const handleImport = async () => {
    if (!validationResult?.isValid || !validationResult.data) return;

    setIsProcessing(true);
    try {
      // Aqui você salvaria no Supabase
      // await saveJornada(validationResult.data);
      
      toast({
        title: "Jornada importada com sucesso!",
        description: `"${validationResult.data.titulo}" foi criada com ${validationResult.data.dias.length} dias`,
      });
      
      onOpenChange(false);
      setJsonInput('');
      setValidationResult(null);
    } catch (error) {
      toast({
        title: "Erro ao importar",
        description: "Não foi possível salvar a jornada",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Importar JSON do ChatGPT</DialogTitle>
          <DialogDescription>
            Cole aqui o JSON gerado pelo ChatGPT para criar automaticamente sua jornada
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              JSON da Jornada
            </label>
            <Textarea
              placeholder="Cole aqui o JSON gerado pelo ChatGPT..."
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              onBlur={validateJSON}
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex gap-2 mt-2">
              <Button 
                onClick={validateJSON}
                variant="outline"
                size="sm"
              >
                Validar JSON
              </Button>
            </div>
          </div>

          {validationResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {validationResult.isValid ? (
                    <>
                      <CheckCircle2 size={20} className="text-green-600" />
                      JSON Válido
                    </>
                  ) : (
                    <>
                      <AlertCircle size={20} className="text-red-600" />
                      JSON Inválido
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {validationResult.isValid && validationResult.data ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{validationResult.data.titulo}</h3>
                      <p className="text-muted-foreground">{validationResult.data.descricao}</p>
                    </div>
                    
                    <div className="flex gap-4">
                      <Badge variant="secondary">
                        {validationResult.data.dias.length} dias
                      </Badge>
                      <Badge variant="secondary">
                        Duração: {validationResult.data.duracao} dias
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Primeiros 3 dias:</h4>
                      <div className="space-y-2">
                        {validationResult.data.dias.slice(0, 3).map((dia) => (
                          <div key={dia.dia} className="flex items-center gap-2 text-sm">
                            <Badge variant="outline">Dia {dia.dia}</Badge>
                            <span>{dia.tema}</span>
                          </div>
                        ))}
                        {validationResult.data.dias.length > 3 && (
                          <p className="text-sm text-muted-foreground">
                            ... e mais {validationResult.data.dias.length - 3} dias
                          </p>
                        )}
                      </div>
                    </div>

                    <Button 
                      onClick={handleImport}
                      disabled={isProcessing}
                      className="w-full"
                    >
                      <Upload size={16} />
                      {isProcessing ? 'Importando...' : 'Importar Jornada'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-red-600 font-medium">Erro na validação:</p>
                    <p className="text-sm text-muted-foreground">
                      {validationResult.error}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};