
import { TemplateStyle } from '@/types/template';

export const mockTemplates: TemplateStyle[] = [
  {
    id: '1',
    nome: 'Fé Moderna',
    descricao: 'Template moderno com design limpo e cores suaves',
    cores: {
      primary: '#8B5CF6',
      primaryGlow: '#A78BFA',
      background: '#FFFFFF',
      card: '#FFFFFF',
      accent: '#8B5CF6'
    },
    tipografia: {
      fontFamily: 'Inter, sans-serif',
      fontSize: {
        titulo: '1.25rem',
        texto: '0.875rem',
        subtitulo: '1rem'
      }
    },
    layout: {
      cardRadius: '0.75rem',
      spacing: '1rem',
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
    },
    componentes: {
      atividadeCard: {
        style: 'moderno',
        showProgress: true,
        showTime: true
      },
      devocionalModal: {
        backgroundStyle: 'simples',
        textAlign: 'left'
      }
    },
    preview_mobile: '',
    ativo: true,
    criado_em: '2024-03-15'
  },
  {
    id: '2',
    nome: 'Clássico Elegante',
    descricao: 'Design tradicional com elementos clássicos',
    cores: {
      primary: '#92400E',
      primaryGlow: '#D97706',
      background: '#FEF7ED',
      card: '#FFFFFF',
      accent: '#92400E'
    },
    tipografia: {
      fontFamily: 'Playfair Display, serif',
      fontSize: {
        titulo: '1.5rem',
        texto: '0.875rem',
        subtitulo: '1.125rem'
      }
    },
    layout: {
      cardRadius: '0.5rem',
      spacing: '1.25rem',
      shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    },
    componentes: {
      atividadeCard: {
        style: 'classico',
        showProgress: true,
        showTime: true
      },
      devocionalModal: {
        backgroundStyle: 'gradiente',
        textAlign: 'justify'
      }
    },
    preview_mobile: '',
    ativo: false,
    criado_em: '2024-03-10'
  },
  {
    id: '3',
    nome: 'Minimalista Zen',
    descricao: 'Simplicidade e foco no conteúdo',
    cores: {
      primary: '#6B7280',
      primaryGlow: '#9CA3AF',
      background: '#F9FAFB',
      card: '#FFFFFF',
      accent: '#374151'
    },
    tipografia: {
      fontFamily: 'Inter, sans-serif',
      fontSize: {
        titulo: '1rem',
        texto: '0.75rem',
        subtitulo: '0.875rem'
      }
    },
    layout: {
      cardRadius: '0.25rem',
      spacing: '0.75rem',
      shadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
    },
    componentes: {
      atividadeCard: {
        style: 'minimalista',
        showProgress: false,
        showTime: false
      },
      devocionalModal: {
        backgroundStyle: 'simples',
        textAlign: 'left'
      }
    },
    preview_mobile: '',
    ativo: false,
    criado_em: '2024-03-12'
  },
  {
    id: '4',
    nome: 'Alegria Colorida',
    descricao: 'Template vibrante com cores alegres',
    cores: {
      primary: '#EF4444',
      primaryGlow: '#F87171',
      background: '#FEF2F2',
      card: '#FFFFFF',
      accent: '#DC2626'
    },
    tipografia: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: {
        titulo: '1.25rem',
        texto: '0.875rem',
        subtitulo: '1rem'
      }
    },
    layout: {
      cardRadius: '1rem',
      spacing: '1rem',
      shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    },
    componentes: {
      atividadeCard: {
        style: 'colorido',
        showProgress: true,
        showTime: true
      },
      devocionalModal: {
        backgroundStyle: 'gradiente',
        textAlign: 'center'
      }
    },
    preview_mobile: '',
    ativo: false,
    criado_em: '2024-03-08'
  }
];
