import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setTheme(theme: string) {
  const themes = ['theme-blue', 'theme-dark', 'theme-default'];

  themes.forEach(t => document.body.classList.remove(t));

  if (theme !== 'default') {
    document.body.classList.add(`theme-${theme}`);
  }
}

export function getTheme(): string {
  const bodyClass = document.body.className;
  const themeClass = bodyClass
    .split(' ')
    .find(cls => cls.startsWith('theme-'));

  return themeClass?.replace('theme-', '') || 'default';
}

