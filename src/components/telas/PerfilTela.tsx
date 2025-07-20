
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsuario, mockJornada } from '@/data/mockData';

export const PerfilTela = () => {
  const handleLogout = () => {
    // Simulação do logout
    console.log('Logout realizado');
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Informações do Usuário */}
      <Card>
        <CardHeader>
          <CardTitle>Meu Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Nome</label>
            <p className="text-base">{mockUsuario.nome}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-base">{mockUsuario.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="w-full">
            Sair
          </Button>
        </CardContent>
      </Card>

      {/* Minha Biblioteca */}
      <Card>
        <CardHeader>
          <CardTitle>Minha Biblioteca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-primary/5 border-primary">
              <img 
                src={mockJornada.imagem_capa} 
                alt={mockJornada.titulo}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{mockJornada.titulo}</h3>
                <p className="text-sm text-muted-foreground">
                  Dia {mockUsuario.dia_atual} de {mockJornada.duracao}
                </p>
              </div>
              <div className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                Ativa
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
