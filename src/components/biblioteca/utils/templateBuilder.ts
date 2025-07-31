// Template Builder temporário para manter compatibilidade
// Este será removido em versões futuras
export const templateBuilder = {
  presets: {
    aurora: {
      nome: 'Aurora',
      categoria: 'Moderno',
      colorScheme: 'aurora' as const,
      typography: 'Clean',
      spacing: 'Comfortable',
    },
    minimalista: {
      nome: 'Minimalista', 
      categoria: 'Limpo',
      colorScheme: 'minimalista' as const,
      typography: 'Simple',
      spacing: 'Tight',
    },
    vibrante: {
      nome: 'Vibrante',
      categoria: 'Energético', 
      colorScheme: 'vibrante' as const,
      typography: 'Bold',
      spacing: 'Generous',
    },
    moderno: {
      nome: 'Moderno',
      categoria: 'Tech',
      colorScheme: 'moderno' as const,
      typography: 'Technical',
      spacing: 'Balanced',
    },
  },
  createTemplate: (preset: any) => {
    console.warn('templateBuilder será removido. Use ThemeProvider com designTokens');
    return preset;
  },
};