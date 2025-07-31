import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function WriterBiblioteca() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Biblioteca de Componentes</CardTitle>
          <CardDescription>
            Esta página foi reiniciada e será reconstruída do zero.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Em breve será implementada uma biblioteca de componentes completa baseada na aplicação devocional existente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}