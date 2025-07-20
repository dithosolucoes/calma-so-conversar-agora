
export interface TemplateStyle {
  id: string;
  nome: string;
  descricao: string;
  cores: {
    primary: string;
    primaryGlow: string;
    background: string;
    card: string;
    accent: string;
  };
  tipografia: {
    fontFamily: string;
    fontSize: {
      titulo: string;
      texto: string;
      subtitulo: string;
    };
  };
  layout: {
    cardRadius: string;
    spacing: string;
    shadow: string;
  };
  componentes: {
    atividadeCard: {
      style: 'minimalista' | 'moderno' | 'classico' | 'colorido';
      showProgress: boolean;
      showTime: boolean;
    };
    devocionalModal: {
      backgroundStyle: 'simples' | 'gradiente' | 'imagem';
      textAlign: 'left' | 'center' | 'justify';
    };
  };
  preview_mobile: string;
  ativo: boolean;
  criado_em: string;
}
