import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'dark';

  constructor() {}

  setTheme(theme: string): void {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.body.setAttribute('data-bs-theme', theme);
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
}
