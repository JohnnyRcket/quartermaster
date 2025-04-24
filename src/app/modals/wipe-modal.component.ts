// wipe-modal.component.ts

import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonService } from '../services/json.service';

@Component({
  selector: 'app-wipe-modal',
  standalone: true,
  imports: [CommonModule, NgbModalModule],
  template: `
    <div class="modal-content" ngbAutofocus>
      <div class="modal-header">
        <h5 class="modal-title fancy-header">{{ mode === 'wipe' ? 'Confirm Wipe' : 'Reset to Demo Data' }}</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss()"></button>
      </div>
        <ng-container *ngIf="mode === 'wipe'; else resetContent">
            <div class="text-start text-center">
                <span class="d-inline">
                Are you <span class="text-danger fw-bold">absolutely sure</span>?<br>
                This will erase <span class="text-danger fw-bold">all data</span> and clear cookies.
                </span>
            </div>
        </ng-container>
        <ng-template #resetContent>
            <div class="text-start text-center">
                <span class="d-inline">
                This will <span class="text-danger fw-bold">REPLACE</span> all data (including cookies) with
                <span class="text-danger fw-bold">DEMO DATA</span>.</span>
                <br>Existing content will be lost.</div>
        </ng-template>
        <div class="modal-footer d-flex justify-content-center gap-2">
        <button type="button" class="btn btn-secondary btn-sm" (click)="modal.dismiss()">Cancel</button>
          <button type="button" class="btn btn-danger btn-sm" (click)="confirm()">
              {{ mode === 'wipe' ? 'Yes, erase everything' : 'Yes, reset to demo data' }}
          </button>
      </div>
    </div>
  `
})
export class WipeModalComponent {
  modal = inject(NgbActiveModal);
  json = inject(JsonService);
  @Input() mode!: 'wipe' | 'reset';

  confirm() {
    if (this.mode === 'wipe') {
      this.json.wipeAllData();
    } else {
      this.json.reset()
    }
    this.modal.close();
  }
}
