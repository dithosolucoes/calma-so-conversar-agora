
import { TemplateConfig } from '@/types/template';

export const mockTemplates: TemplateConfig[] = [
  {
    id: 'minimal-clean',
    nome: 'Minimalista Limpo',
    categoria: 'minimalista',
    thumbnail: '/templates/minimal-clean.jpg',
    cores: {
      primary: '220 13% 91%',
      secondary: '220 14.3% 95.9%',
      accent: '220 13% 91%',
      background: '0 0% 100%',
      card: '0 0% 100%',
      text: '220 8.9% 46.1%'
    },
    layout: {
      cabecalho: 'minimal',
      mostrarData: false,
      mostrarProgresso: true,
      estiloBotaoFavorito: false,
      espacamentoCabecalho: 'pequeno'
    },
    tipografia: {
      fontePrimaria: 'Inter',
      tamanhoTitulo: 'medio',
      pesoTitulo: 'normal'
    },
    cardsAtividade: {
      estilo: 'compacto',
      bordas: 'retas',
      sombra: 'nenhuma',
      animacao: false
    },
    elementos: {
      gradientes: false,
      icones3d: false,
      particulas: false,
      fundoAnimado: false
    },
    criadoEm: '2024-01-15',
    atualizadoEm: '2024-01-15'
  },
  {
    id: 'vibrant-modern',
    nome: 'Moderno Vibrante',
    categoria: 'colorido',
    thumbnail: '/templates/vibrant-modern.jpg',
    cores: {
      primary: '263 70% 50%',
      secondary: '263 70% 60%',
      accent: '280 100% 70%',
      background: '260 100% 99%',
      card: '0 0% 100%',
      text: '263 30% 20%'
    },
    layout: {
      cabecalho: 'completo',
      mostrarData: true,
      mostrarProgresso: true,
      estiloBotaoFavorito: true,
      espacamentoCabecalho: 'grande'
    },
    tipografia: {
      fontePrimaria: 'Inter',
      tamanhoTitulo: 'grande',
      pesoTitulo: 'bold'
    },
    cardsAtividade: {
      estilo: 'detalhado',
      bordas: 'muito-arredondadas',
      sombra: 'forte',
      animacao: true
    },
    elementos: {
      gradientes: true,
      icones3d: true,
      particulas: true,
      fundoAnimado: true
    },
    criadoEm: '2024-01-10',
    atualizadoEm: '2024-01-20'
  },
  {
    id: 'elegant-classic',
    nome: 'Clássico Elegante',
    categoria: 'elegante',
    thumbnail: '/templates/elegant-classic.jpg',
    cores: {
      primary: '215 28% 17%',
      secondary: '215 20% 65%',
      accent: '43 74% 66%',
      background: '210 40% 98%',
      card: '0 0% 100%',
      text: '215 25% 27%'
    },
    layout: {
      cabecalho: 'compacto',
      mostrarData: true,
      mostrarProgresso: true,
      estiloBotaoFavorito: true,
      espacamentoCabecalho: 'medio'
    },
    tipografia: {
      fontePrimaria: 'Playfair Display',
      tamanhoTitulo: 'grande',
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
    },
    criadoEm: '2024-01-05',
    atualizadoEm: '2024-01-18'
  }
];

export const categoriaTemplates = [
  { id: 'todos', nome: 'Todos os Templates' },
  { id: 'minimalista', nome: 'Minimalista' },
  { id: 'colorido', nome: 'Colorido' },
  { id: 'elegante', nome: 'Elegante' },
  { id: 'moderno', nome: 'Moderno' }
] as const;
