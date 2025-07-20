
export interface TemplateConfig {
  id: string;
  nome: string;
  categoria: 'minimalista' | 'colorido' | 'elegante' | 'moderno';
  thumbnail: string;
  cores: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    card: string;
    text: string;
  };
  layout: {
    cabecalho: 'completo' | 'compacto' | 'minimal';
    mostrarData: boolean;
    mostrarProgresso: boolean;
    estiloBotaoFavorito: boolean;
    espacamentoCabecalho: 'pequeno' | 'medio' | 'grande';
  };
  tipografia: {
    fontePrimaria: string;
    tamanhoTitulo: 'pequeno' | 'medio' | 'grande';
    pesoTitulo: 'normal' | 'semibold' | 'bold';
  };
  cardsAtividade: {
    estilo: 'padrao' | 'compacto' | 'detalhado';
    bordas: 'retas' | 'arredondadas' | 'muito-arredondadas';
    sombra: 'nenhuma' | 'suave' | 'media' | 'forte';
    animacao: boolean;
  };
  elementos: {
    gradientes: boolean;
    icones3d: boolean;
    particulas: boolean;
    fundoAnimado: boolean;
  };
  criadoEm: string;
  atualizadoEm: string;
}

export type TemplateCategorias = 'todos' | 'minimalista' | 'colorido' | 'elegante' | 'moderno';
