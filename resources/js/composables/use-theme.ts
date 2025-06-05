import { onMounted, ref } from 'vue';

export const themes = [
  'default',
  'tangerine',
  'cosmic-night',
  'neo-brutalism',
  'ocean-breeze',
] as const;

export type Theme = (typeof themes)[number];

function setTheme(value?: Theme | null) {
  if (typeof window === 'undefined') {
    return;
  }

  document.documentElement.dataset.theme = value || 'default';
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') {
    return;
  }

  const maxAge = days * 24 * 60 * 60;

  document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
}

function getStoredTheme() {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem('theme') as Theme | null;
}

export function initializeTheme() {
  if (typeof window === 'undefined') {
    return;
  }

  // Initialize theme from saved preference...
  const savedAppearance = getStoredTheme();
  setTheme(savedAppearance);
}

export function useTheme() {
  const theme = ref<Theme>('default');

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;

    if (savedTheme) {
      theme.value = savedTheme;
    }
  });

  function updateTheme(value: Theme) {
    theme.value = value;

    // Store in localStorage for client-side persistence...
    localStorage.setItem('theme', value);

    // Store in cookie for SSR...
    setCookie('theme', value);

    setTheme(value);
  }

  return {
    theme,
    updateTheme,
  };
}
