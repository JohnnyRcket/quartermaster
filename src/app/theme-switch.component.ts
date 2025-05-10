import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from './services/theme.service';
import {NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [
    NgClass,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault
  ],
  template: `
      <div class="theme-switcher dropup order-last order-sm-first">
          <button class="btn btn-link dropdown-toggle" (click)="testClick()" aria-expanded="false"
                  data-bs-toggle="dropdown" type="button" style="z-index: 2050; color: var(--bs-body-color);">
              <ng-container [ngSwitch]="currentTheme">
                  <svg *ngSwitchCase="'light'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                       fill="currentColor" class="bi bi-brightness-high me-1" viewBox="0 0 16 16">
                      <path d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/>
                      <path d="M8 0a.5.5 0 0 1 .5.5v1.1a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 8 0zm0 13.4a.5.5 0 0 1 .5.5v1.1a.5.5 0 0 1-1 0v-1.1a.5.5 0 0 1 .5-.5zM2.34 2.34a.5.5 0 0 1 .71 0l.78.78a.5.5 0 0 1-.71.71l-.78-.78a.5.5 0 0 1 0-.71zm10.56 10.56a.5.5 0 0 1 .71 0l.78.78a.5.5 0 0 1-.71.71l-.78-.78a.5.5 0 0 1 0-.71zM0 8a.5.5 0 0 1 .5-.5h1.1a.5.5 0 0 1 0 1H.5A.5.5 0 0 1 0 8zm13.4 0a.5.5 0 0 1 .5-.5h1.1a.5.5 0 0 1 0 1h-1.1a.5.5 0 0 1-.5-.5zM2.34 13.66a.5.5 0 0 1 0-.71l.78-.78a.5.5 0 0 1 .71.71l-.78.78a.5.5 0 0 1-.71 0zm10.56-10.56a.5.5 0 0 1 0-.71l.78-.78a.5.5 0 0 1 .71.71l-.78.78a.5.5 0 0 1-.71 0z"/>
                  </svg>
                  <svg *ngSwitchCase="'dark'" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                       fill="currentColor" class="bi bi-moon-stars me-1" viewBox="0 0 16 16">
                      <path d="M6 .278a.768.768 0 0 1 .08.858 6.718 6.718 0 0 0-.878 3.27 6.72 6.72 0 0 0 6.72 6.72 6.718 6.718 0 0 0 3.27-.878.768.768 0 0 1 .858.08.75.75 0 0 1 .07.979A8.001 8.001 0 1 1 5.02.207a.75.75 0 0 1 .98.07z"/>
                      <path d="M10.5 2a.5.5 0 0 1 .5.5V3h.5a.5.5 0 0 1 0 1H11v.5a.5.5 0 0 1-1 0V4h-.5a.5.5 0 0 1 0-1H10v-.5a.5.5 0 0 1 .5-.5zM13.5 4a.5.5 0 0 1 .5.5V5h.5a.5.5 0 0 1 0 1H14v.5a.5.5 0 0 1-1 0V6h-.5a.5.5 0 0 1 0-1H13v-.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                  <svg *ngSwitchDefault xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       class="bi bi-circle-half me-1" viewBox="0 0 16 16">
                      <path d="M8 15V1a7 7 0 1 1 0 14z"/>
                  </svg>
              </ng-container>
          </button>
          <div class="dropdown-menu">
              <a class="dropdown-item d-flex align-items-center" href="#" (click)="onThemeSelect('light')"
                 data-bs-theme-value="light">
                  <svg [ngClass]="{ 'text-danger': currentTheme === 'light', 'opacity-50': currentTheme !== 'light' }"
                       xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                       viewBox="0 0 16 16" class="bi bi-sun-fill opacity-50 me-2">
                      <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"></path>
                  </svg>
                  Light</a>
              <a class="dropdown-item d-flex align-items-center" href="#" (click)="onThemeSelect('dark')"
                 data-bs-theme-value="dark">
                  <svg [ngClass]="{ 'text-danger': currentTheme === 'dark', 'opacity-50': currentTheme !== 'dark' }"
                       xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                       viewBox="0 0 16 16" class="bi bi-moon-stars-fill opacity-50 me-2">
                      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278"></path>
                  </svg>
                  Dark</a>
              <a class="dropdown-item d-flex align-items-center" href="#" (click)="onThemeSelect('auto')"
                 data-bs-theme-value="auto">
                  <svg [ngClass]="{ 'text-danger': currentTheme === 'auto', 'opacity-50': currentTheme !== 'auto' }"
                       xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                       viewBox="0 0 16 16" class="bi bi-circle-half opacity-50 me-2">
                      <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"></path>
                  </svg>
                  Auto</a>
          </div>
      </div>`
})

export class ThemeSwitcherComponent {
  @Output() themeChanged = new EventEmitter<string>();

  constructor(public themeService: ThemeService) {}

  // Getter to access current theme
  get currentTheme(): string {
    return this.themeService.currentTheme;
  }

  // Method to emit theme change
  onThemeSelect(theme: string): void {
    this.themeService.setTheme(theme);
    this.themeChanged.emit(theme);
  }

  testClick(){
    console.log("theeeemes")
  }
}





