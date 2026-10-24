import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('ef_theme_mode') as ThemeMode;
    return saved === 'light' || saved === 'dark' || saved === 'auto' ? saved : 'auto';
  });

  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('ef_theme_mode', themeMode);

    const calculateTheme = () => {
      if (themeMode === 'dark') {
        return true;
      } else if (themeMode === 'light') {
        return false;
      } else {
        // Auto mode based on time of day (6 AM to 6 PM = Light, 6 PM to 6 AM = Dark)
        const hour = new Date().getHours();
        return hour < 6 || hour >= 18;
      }
    };

    const darkActive = calculateTheme();
    setIsDark(darkActive);

    const root = document.documentElement;
    if (darkActive) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
