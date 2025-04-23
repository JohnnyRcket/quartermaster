// port-modal.component.ts
import { Component } from '@angular/core';
import { JsonService } from '../services/json.service';
import { CommonModule } from '@angular/common';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-port-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './port-modal.component.html'
})
export class PortModalComponent {
  fileContent = '';
  exportText = '';
  exportMode: 'pretty' | 'raw' = 'pretty';
  mode: 'import' | 'export' = 'export';

  constructor(public json: JsonService, public activeModal: NgbActiveModal) {
    this.updateExportText();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      this.fileContent = content;
      this.json.import(content);
    };
    reader.readAsText(file);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      this.fileContent = content;
      this.json.import(content);
    };
    reader.readAsText(file);
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  updateExportText() {
    const data = this.json.activeInventory;
    this.exportText = this.exportMode === 'pretty'
      ? this.json.exportPrettyFormat()
      : JSON.stringify(data, null, 2);
  }

  generatePrettyExport(data: any): string {
    return JSON.stringify(data, null, 2); // stub — customize later
  }

  setExportMode(mode: 'pretty' | 'raw') {
    this.exportMode = mode;
    this.updateExportText();
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.exportText);
  }

  close(){
    this.activeModal.close();
  }

  downloadExport() {
    const blob = new Blob([this.exportText], { type: 'text/plain;charset=utf-8' });
    const url = (window as any).URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    const extension = this.exportMode === 'pretty' ? 'txt' : 'json';
    link.download = `inventory-export.${extension}`;

    link.click();
    (window as any).URL.revokeObjectURL(url);
  }
}
