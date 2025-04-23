// wipe-modal.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonService } from '../services/json.service';

@Component({
  selector: 'app-wipe-modal',
  standalone: true,
  imports: [CommonModule, NgbModalModule],
  template: `
    <div class="modal-content p-3">
      <div class="modal-header">
        <h5 class="modal-title">Confirm Wipe</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss()"></button>
      </div>
      <div class="modal-body">
        Are you <strong>absolutely sure</strong>?<br>
        This will erase <em>all data</em> and clear cookies.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" (click)="modal.dismiss()">Cancel</button>
        <button type="button" class="btn btn-danger btn-sm" (click)="wipeEverything()">Yes, wipe everything</button>
      </div>
    </div>
  `
})
export class WipeModalComponent {
  modal = inject(NgbActiveModal);
  json = inject(JsonService);

  wipeEverything() {
    this.json.wipeAllData();
    this.modal.close();
  }
}
