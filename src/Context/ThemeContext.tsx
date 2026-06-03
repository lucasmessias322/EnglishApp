import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ThemeId =
  | "classic"
  | "ocean"
  | "forest"
  | "violet"
  | "paper"
  | "sepia"
  | "midnight"
  | "contrast"
  | "mint";

export interface AppTheme {
  id: ThemeId;
  name: string;
  description: string;
  preview: {
    primary: string;
    accent: string;
    surface: string;
  };
  themeColor: string;
}

interface ThemeContextValue {
  currentTheme: AppTheme;
  setTheme: (themeId: ThemeId) => void;
  themes: AppTheme[];
}

const THEME_STORAGE_KEY = "englishplus_theme";

export const themes: AppTheme[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Azul e verde, o visual padrao do EnglishPlus.",
    preview: {
      primary: "#4968ec",
      accent: "#29aa8b",
      surface: "#212433",
    },
    themeColor: "#212433",
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Mais azul, calmo e focado para leitura.",
    preview: {
      primary: "#0ea5e9",
      accent: "#22d3ee",
      surface: "#132235",
    },
    themeColor: "#132235",
  },
  {
    id: "forest",
    name: "Forest",
    description: "Verde profundo com contraste suave.",
    preview: {
      primary: "#16a34a",
      accent: "#84cc16",
      surface: "#17251d",
    },
    themeColor: "#17251d",
  },
  {
    id: "violet",
    name: "Violet",
    description: "Roxo discreto para uma interface mais expressiva.",
    preview: {
      primary: "#7c3aed",
      accent: "#d946ef",
      surface: "#221a35",
    },
    themeColor: "#221a35",
  },
  {
    id: "paper",
    name: "Paper",
    description: "Tema claro e limpo para leitura durante o dia.",
    preview: {
      primary: "#2563eb",
      accent: "#0f766e",
      surface: "#f8fafc",
    },
    themeColor: "#f8fafc",
  },
  {
    id: "sepia",
    name: "Sepia",
    description: "Fundo quente para ler por mais tempo com menos brilho.",
    preview: {
      primary: "#a16207",
      accent: "#b45309",
      surface: "#f5ead7",
    },
    themeColor: "#f5ead7",
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Escuro suave, pensado para leitura noturna.",
    preview: {
      primary: "#60a5fa",
      accent: "#c084fc",
      surface: "#111827",
    },
    themeColor: "#111827",
  },
  {
    id: "contrast",
    name: "Contrast",
    description: "Contraste alto para melhorar legibilidade.",
    preview: {
      primary: "#facc15",
      accent: "#22c55e",
      surface: "#050505",
    },
    themeColor: "#050505",
  },
  {
    id: "mint",
    name: "Mint",
    description: "Claro esverdeado com sensacao leve e calma.",
    preview: {
      primary: "#0f766e",
      accent: "#65a30d",
      surface: "#eefbf3",
    },
    themeColor: "#eefbf3",
  },
];

const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: themes[0],
  setTheme: () => {},
  themes,
});

function getInitialTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
  return themes.some((theme) => theme.id === storedTheme)
    ? storedTheme
    : "classic";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(getInitialTheme);

  const currentTheme =
    themes.find((theme) => theme.id === themeId) || themes[0];

  useEffect(() => {
    document.documentElement.dataset.theme = currentTheme.id;
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme.id);

    const themeColorMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );

    if (themeColorMeta) {
      themeColorMeta.content = currentTheme.themeColor;
    }
  }, [currentTheme]);

  const value = useMemo(
    () => ({
      currentTheme,
      setTheme: setThemeId,
      themes,
    }),
    [currentTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
