// Design Tokens - Fundamentos do Sistema

export const designTokens = {
  // Cores Primárias
  colors: {
    // Esquemas de Cores Predefinidos
    schemes: {
      aurora: {
        primary: 'hsl(248, 85%, 66%)', // Índigo vibrante
        secondary: 'hsl(330, 81%, 60%)', // Rosa elegante
        accent: 'hsl(196, 94%, 67%)', // Azul suave
        background: 'hsl(210, 40%, 98%)', // Branco quente
        surface: 'hsl(210, 40%, 95%)', // Cinza muito claro
        muted: 'hsl(210, 22%, 89%)', // Cinza médio
      },
      minimalista: {
        primary: 'hsl(158, 64%, 52%)', // Verde natural
        secondary: 'hsl(160, 84%, 39%)', // Verde mais escuro
        accent: 'hsl(43, 96%, 56%)', // Amarelo suave
        background: 'hsl(0, 0%, 100%)', // Branco puro
        surface: 'hsl(210, 20%, 98%)', // Branco suave
        muted: 'hsl(210, 16%, 93%)', // Cinza claro
      },
      vibrante: {
        primary: 'hsl(45, 93%, 47%)', // Laranja energético
        secondary: 'hsl(0, 84%, 60%)', // Vermelho vibrante
        accent: 'hsl(271, 91%, 65%)', // Roxo brilhante
        background: 'hsl(48, 89%, 92%)', // Amarelo suave
        surface: 'hsl(48, 89%, 96%)', // Amarelo muito claro
        muted: 'hsl(45, 23%, 85%)', // Bege suave
      },
      moderno: {
        primary: 'hsl(263, 70%, 64%)', // Roxo moderno
        secondary: 'hsl(186, 94%, 44%)', // Ciano tecnológico
        accent: 'hsl(280, 100%, 70%)', // Magenta futurista
        background: 'hsl(215, 25%, 96%)', // Cinza técnico
        surface: 'hsl(215, 25%, 99%)', // Branco técnico
        muted: 'hsl(215, 13%, 88%)', // Cinza neutro
      }
    },

    // Estados Funcionais
    states: {
      success: 'hsl(142, 76%, 36%)',
      warning: 'hsl(38, 92%, 50%)',
      error: 'hsl(0, 84%, 60%)',
      info: 'hsl(221, 83%, 53%)',
    }
  },

  // Tipografia
  typography: {
    families: {
      primary: ['Inter', 'system-ui', 'sans-serif'],
      heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    sizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
    },
    weights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },

  // Espaçamentos
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
  },

  // Bordas e Raios
  borders: {
    radius: {
      none: '0',
      sm: '0.125rem',   // 2px
      md: '0.375rem',   // 6px
      lg: '0.5rem',     // 8px
      xl: '0.75rem',    // 12px
      '2xl': '1rem',    // 16px
      full: '9999px',
    },
    width: {
      thin: '1px',
      medium: '2px',
      thick: '3px',
    }
  },

  // Sombras e Elevações
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    glow: '0 0 40px rgb(var(--primary) / 0.3)',
  },

  // Transições
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }
};

// Utilitário para aplicar esquema de cores
export const applyColorScheme = (scheme: keyof typeof designTokens.colors.schemes) => {
  const colors = designTokens.colors.schemes[scheme];
  return {
    '--primary': colors.primary,
    '--secondary': colors.secondary,
    '--accent': colors.accent,
    '--background': colors.background,
    '--surface': colors.surface,
    '--muted': colors.muted,
  };
};