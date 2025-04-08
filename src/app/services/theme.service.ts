import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'dark';

  constructor() {}

  setTheme(theme: string): void {
    this.currentTheme = theme;
    const body = document.body;
    body.removeAttribute('data-bs-theme');
    body.setAttribute('data-bs-theme', theme);
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
}
