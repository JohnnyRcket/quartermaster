import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-content p-3">
      <div class="modal-header justify-content-between m-0 p-0">
        <h5 class="modal-title m-0 p-0">User Guide</h5>
        <button type="button" class="btn-close m-0 p-0" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style="white-space: pre-wrap;">
        <p><strong>Welcome to Quartermaster:<br></strong>A tool for managing a Ryuutama TTRPG party's shared inventory. It is a browser-based webapp where you can save, export, import, and generally (hopefully) not worry about losing stuff between sessions.</p>

        <p><strong>How To Use It:</strong></p>
        <ol class="mb-3">
          <li>Add characters and animals using the “New” buttons at the top.</li>
          <li>Click “+” to add items.</li>
          <li>Click an item or character or animal name to edit.</li>
          <li>You can drag and drop items to move things around.</li>
          <li>Use the Export and Import buttons to share data or use shared data.</li>
          <li>Persistence in local storage.</li>
        </ol>

        <p><strong>Special Notes:</strong></p>
        <ul class="mb-3">
          <li>Changes are saved to your browser automatically.</li>
          <li>If you clear cookies or local storage, or hit the “Clear All” button, your data is gone unless you exported it.</li>
        </ul>

        <p><strong>Demo Mode:</strong> Click "Reset to Default" in the Clear All menu to instantly repopulate the app with the default sample characters and items. Helpful to see if you need an example to guide you, or want a basis to work off of.</p>

        <p class="mb-0"><strong>That's it. That’s the app.</strong></p>
      </div>
    </div>
  `
})
export class FaqModalComponent {
  constructor(public modal: NgbActiveModal) {}
}
