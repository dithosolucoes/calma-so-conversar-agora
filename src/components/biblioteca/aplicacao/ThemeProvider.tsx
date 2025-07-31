import React, { createContext, useContext, useEffect, useState } from 'react';
import { designTokens, applyColorScheme } from '../fundamentos/DesignTokens';

type ColorScheme = keyof typeof designTokens.colors.schemes;
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  setMode: (mode: ThemeMode) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleMode: () => void;
  isDark: boolean;
  resolvedMode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  defaultColorScheme?: ColorScheme;
  enableSystem?: boolean;
  storageKey?: string;
}

export const ThemeProvider = ({
  children,
  defaultMode = 'system',
  defaultColorScheme = 'aurora',
  enableSystem = true,
  storageKey = 'ui-theme',
}: ThemeProviderProps) => {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(defaultColorScheme);
  const [systemMode, setSystemMode] = useState<'light' | 'dark'>('light');

  // Detectar preferência do sistema
  useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemMode(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setSystemMode(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [enableSystem]);

  // Carregar do localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const { mode: storedMode, colorScheme: storedScheme } = JSON.parse(stored);
        if (storedMode) setModeState(storedMode);
        if (storedScheme) setColorSchemeState(storedScheme);
      }
    } catch (error) {
      console.warn('Erro ao carregar tema do localStorage:', error);
    }
  }, [storageKey]);

  // Salvar no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ mode, colorScheme }));
    } catch (error) {
      console.warn('Erro ao salvar tema no localStorage:', error);
    }
  }, [mode, colorScheme, storageKey]);

  const resolvedMode = mode === 'system' ? systemMode : mode;
  const isDark = resolvedMode === 'dark';

  // Aplicar tema no DOM
  useEffect(() => {
    const root = document.documentElement;
    
    // Remover classes de tema anteriores
    root.classList.remove('light', 'dark');
    
    // Adicionar classe do modo atual
    root.classList.add(resolvedMode);

    // Aplicar esquema de cores
    const colors = applyColorScheme(colorScheme);
    Object.entries(colors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Aplicar tokens de estado
    Object.entries(designTokens.colors.states).forEach(([state, color]) => {
      root.style.setProperty(`--${state}`, color);
    });

    // Meta tag para navegadores mobile
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        isDark ? '#000000' : '#ffffff'
      );
    }
  }, [resolvedMode, colorScheme, isDark]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const setColorScheme = (newScheme: ColorScheme) => {
    setColorSchemeState(newScheme);
  };

  const toggleMode = () => {
    if (mode === 'system') {
      setMode(systemMode === 'dark' ? 'light' : 'dark');
    } else {
      setMode(mode === 'dark' ? 'light' : 'dark');
    }
  };

  const value: ThemeContextType = {
    mode,
    colorScheme,
    setMode,
    setColorScheme,
    toggleMode,
    isDark,
    resolvedMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para acesso rápido aos esquemas de cores
export const useColorSchemes = () => {
  return {
    schemes: designTokens.colors.schemes,
    current: useTheme().colorScheme,
    setScheme: useTheme().setColorScheme,
  };
};

// Hook para transições de tema suaves
export const useThemeTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTheme = (callback: () => void, duration = 300) => {
    setIsTransitioning(true);
    
    // Adicionar transição CSS
    document.documentElement.style.transition = `
      background-color ${duration}ms ease,
      color ${duration}ms ease,
      border-color ${duration}ms ease
    `;

    callback();

    setTimeout(() => {
      document.documentElement.style.transition = '';
      setIsTransitioning(false);
    }, duration);
  };

  return { isTransitioning, transitionTheme };
};

// Componente para seletor visual de temas
interface ThemeSelectorProps {
  showModeToggle?: boolean;
  showColorSchemes?: boolean;
  compact?: boolean;
}

export const ThemeSelector = ({ 
  showModeToggle = true, 
  showColorSchemes = true,
  compact = false,
}: ThemeSelectorProps) => {
  const { mode, colorScheme, setMode, setColorScheme, toggleMode } = useTheme();
  const { schemes } = useColorSchemes();

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {showModeToggle && (
          <button
            onClick={toggleMode}
            className="p-2 rounded-md border hover:bg-accent"
            title="Alternar tema"
          >
            {mode === 'dark' ? '🌙' : '☀️'}
          </button>
        )}
        {showColorSchemes && (
          <select
            value={colorScheme}
            onChange={(e) => setColorScheme(e.target.value as ColorScheme)}
            className="p-1 rounded border bg-background"
          >
            {Object.keys(schemes).map((scheme) => (
              <option key={scheme} value={scheme}>
                {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      {showModeToggle && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Modo</label>
          <div className="flex gap-2">
            {(['light', 'dark', 'system'] as ThemeMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1 text-xs rounded border ${
                  mode === m ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                }`}
              >
                {m === 'light' ? 'Claro' : m === 'dark' ? 'Escuro' : 'Sistema'}
              </button>
            ))}
          </div>
        </div>
      )}

      {showColorSchemes && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Esquema de Cores</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(schemes).map(([scheme, colors]) => (
              <button
                key={scheme}
                onClick={() => setColorScheme(scheme as ColorScheme)}
                className={`p-2 text-xs rounded border text-left ${
                  colorScheme === scheme ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: colors.primary }}
                  />
                  {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                </div>
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 rounded"
                    style={{ backgroundColor: colors.secondary }}
                  />
                  <div
                    className="w-2 h-2 rounded"
                    style={{ backgroundColor: colors.accent }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};