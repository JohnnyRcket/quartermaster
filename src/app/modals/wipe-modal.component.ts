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
        <h5 class="modal-title fancy-header">Confirm Wipe</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss()"></button>
      </div>
            <div class="text-start text-center">
                <span class="d-inline">
                Are you <span class="text-danger fw-bold">ABSOLUTELY SURE</span>?<br>
                This will erase <span class="text-danger fw-bold">ALL DATA</span> and clear cookies.
                </span>
            </div>
        <div class="modal-footer d-flex justify-content-center gap-2">
        <button type="button" class="btn btn-secondary btn-sm" (click)="modal.dismiss()">Cancel</button>
          <button type="button" class="btn btn-danger btn-sm" (click)="confirm()">Delete Everything</button>
            <button type="button" class="btn btn-outline-danger btn-sm" (click)="reset()">Reset to Default</button>
      </div>
    </div>
  `
})
export class WipeModalComponent {
  modal = inject(NgbActiveModal);
  json = inject(JsonService);

  confirm() {
    this.json.wipeAllData();
    this.modal.dismiss()
  }

  reset(){
    this.json.reset()
    this.modal.dismiss()
  }
}
