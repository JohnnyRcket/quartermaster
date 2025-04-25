import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public currentTheme: string = 'dark';

  constructor() {}

  setTheme(theme: string): void {
    this.currentTheme = theme;

    const resolved =
      theme === 'auto'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme;

    document.documentElement.setAttribute('data-bs-theme', resolved);
    document.body.setAttribute('data-bs-theme', resolved);

    localStorage.setItem('theme', theme);
  }


  getCurrentTheme(): string {
    return this.currentTheme;
  }

  reassertTheme(): void {
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
    document.body.setAttribute('data-bs-theme', this.currentTheme);
  }
}
