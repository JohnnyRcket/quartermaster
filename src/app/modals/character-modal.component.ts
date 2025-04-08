import { Component } from '@angular/core';

@Component({
  selector: 'app-character-modal',
  standalone: true,
  template: `
    <div class="modal fade" role="dialog" tabindex="-1" id="character-modal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Character</h4>
            <button class="btn-close" type="button" aria-label="Close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <span>Name: </span>
                <input class="form-control-sm mb-0 pb-1" type="text" id="characterName">
              </div>
              <div class="col">
                <span>Capacity: </span>
                <input class="form-control-sm" type="number" id="characterCapacity">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Save</button>
            <button class="btn btn-secondary" type="button">Delete</button>
            <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: []
})
export class CharacterModalComponent {}
