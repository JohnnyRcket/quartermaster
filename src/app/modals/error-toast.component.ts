import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-error-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
      <div
              class="toast-container position-fixed top-0 start-50 translate-middle-x pt-4"
              style="z-index: 1080"
      >
          <div
                  *ngFor="let msg of messages"
                  class="toast show align-items-center text-bg-danger border-0 mb-2"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
          >
              <div class="d-flex">
                  <div class="toast-body">{{ msg }}</div>
                  <button
                          type="button"
                          class="btn-close btn-close-white me-2 m-auto"
                          (click)="remove(msg)"
                  ></button>
              </div>
          </div>
      </div>
  `
})
export class ErrorToastComponent {
  messages: string[] = [];

  show(message: string) {
    if (this.messages.includes(message)) return;

    this.messages.push(message);
    setTimeout(() => this.remove(message), 4000);
  }

  remove(message: string) {
    this.messages = this.messages.filter(m => m !== message);
  }
}
