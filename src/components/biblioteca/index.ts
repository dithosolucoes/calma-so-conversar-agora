// BIBLIOTECA DE COMPONENTES - SISTEMA HIERÁRQUICO COMPLETO

// ============ FUNDAMENTOS (Átomos) ============
export { designTokens, applyColorScheme } from './fundamentos/DesignTokens';

// ============ ELEMENTOS BÁSICOS (Moléculas) ============
export { Badge, badgeVariants } from './elementos/Badge';
export { Button, buttonVariants } from './elementos/Button';
export { Input, Textarea, inputVariants } from './elementos/Input';
export { Avatar, AvatarImage, AvatarFallback, UserAvatar, StatusIndicator, avatarVariants } from './elementos/Avatar';
export { Skeleton, SkeletonCard } from './elementos/Skeleton';
export { Icon, DevotionalIcons } from './elementos/Icon';
export { Typography, Title, Text, Caption, Quote, Verse, typographyVariants } from './elementos/Typography';
export { LoadingSpinner, LoadingPage, InlineLoading, spinnerVariants } from './elementos/LoadingSpinner';

// ============ COMPONENTES FUNCIONAIS (Organelas) ============
export { DevotionalCard } from './funcionais/DevotionalCard';
export { ProgressTracker } from './funcionais/ProgressTracker';
export { StatsCard } from './funcionais/StatsCard';
export { AchievementCard } from './funcionais/AchievementCard';

// ============ SEÇÕES DE CONTEÚDO (Células) ============
export { ActivitySection } from './secoes/ActivitySection';
export { StatsGrid } from './secoes/StatsGrid';
export { AchievementGrid } from './secoes/AchievementGrid';

// ============ NAVEGAÇÃO (Sistemas de Navegação) ============
export { TopNavigation, DevotionalTopNav } from './navegacao/TopNavigation';
export { Breadcrumb, DevotionalBreadcrumb } from './navegacao/Breadcrumb';

// ============ LAYOUTS (Tecidos) ============
export { ScreenHeader } from './layouts/ScreenHeader';
export { ScreenLayout } from './layouts/ScreenLayout';

// ============ TELAS (Órgãos) ============
export { DashboardScreen, SimpleDashboard } from './telas/DashboardScreen';

// ============ APLICAÇÃO (Organismo) ============
export { ReaderApp, useReaderApp, useNavigation, useUser, ReaderScreen } from './aplicacao/ReaderApp';
export { ThemeProvider, ThemeSelector } from './aplicacao/ThemeProvider';

// ============ TEMPLATE BUILDER (DNA) ============
// Sistema para criar novos templates combinando diferentes "genes"

export interface TemplateConfig {
  id: string;
  nome: string;
  categoria: string;
  colorScheme: 'aurora' | 'minimalista' | 'vibrante' | 'moderno';
  typography: 'default' | 'elegant' | 'modern' | 'playful';
  spacing: 'compact' | 'comfortable' | 'spacious';
  animations: 'subtle' | 'smooth' | 'energetic';
}

export const templateBuilder = {
  // Criar novo template aplicando configurações
  createTemplate: (config: TemplateConfig) => {
    const { applyColorScheme } = require('./fundamentos/DesignTokens');
    return {
      styles: applyColorScheme(config.colorScheme),
      className: `template-${config.id}`,
      config,
    };
  },
  
  // Templates pré-configurados
  presets: {
    aurora: {
      id: 'aurora',
      nome: 'Aurora Sagrada',
      categoria: 'elegante',
      colorScheme: 'aurora' as const,
      typography: 'elegant' as const,
      spacing: 'comfortable' as const,
      animations: 'smooth' as const,
    },
    minimalista: {
      id: 'minimalista',
      nome: 'Paz Minimalista',
      categoria: 'minimalista',
      colorScheme: 'minimalista' as const,
      typography: 'modern' as const,
      spacing: 'spacious' as const,
      animations: 'subtle' as const,
    },
    vibrante: {
      id: 'vibrante',
      nome: 'Luz Vibrante',
      categoria: 'colorido',
      colorScheme: 'vibrante' as const,
      typography: 'playful' as const,
      spacing: 'compact' as const,
      animations: 'energetic' as const,
    },
    moderno: {
      id: 'moderno',
      nome: 'Moderno Clean',
      categoria: 'moderno',
      colorScheme: 'moderno' as const,
      typography: 'modern' as const,
      spacing: 'comfortable' as const,
      animations: 'smooth' as const,
    },
  } satisfies Record<string, TemplateConfig>
};

// ============ TIPOS GLOBAIS ============
export interface DevotionalActivity {
  id: string;
  titulo: string;
  tipo: 'devocional' | 'passagem' | 'quiz' | 'oracao';
  tempo: string;
  completada: boolean;
  conteudo?: string;
  progresso?: number;
}

export interface JourneyData {
  id: string;
  titulo: string;
  diaAtual: number;
  diasTotais: number;
  progresso: number;
}

export interface UserStats {
  streak: number;
  pontos: number;
  nivel: number;
  conquistas: number;
}