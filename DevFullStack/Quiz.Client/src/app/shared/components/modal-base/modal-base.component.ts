import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss']
})
export class ModalBaseComponent {
  @Input() config: {
    title: string;
    confirmText?: string;
    cancelText?: string;
    showCancelButton?: boolean;
    showConfirmButton?: boolean;
    size?: 'md' | 'sm' | 'lg' | 'xl';
  } = {
      title: '',
      confirmText: 'Xác nhận',
      cancelText: 'Huỷ',
      showCancelButton: true,
      showConfirmButton: true,
      size: 'md'
    };

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  @ViewChild('modalElement') modalElement!: ElementRef<HTMLDivElement>;
  @ContentChild(TemplateRef) contentTemplate!: TemplateRef<any>;

  show() {
    const modal = this.modalElement.nativeElement;
    modal.classList.add('show', 'd-block');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  hide() {
    const modal = this.modalElement.nativeElement;
    modal.classList.remove('show', 'd-block');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    this.closed.emit(); 
  }

  onBackdropClick(event: MouseEvent) {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  onConfirmClick() {
    this.confirm.emit();
    this.hide();
  }

  onCancelClick() {
    this.cancel.emit();
    this.hide();
  }

  get modalSizeClass(): string {
    switch (this.config.size) {
      case 'sm': return 'modal-sm';
      case 'lg': return 'modal-lg';
      case 'xl': return 'modal-xl';
      default: return '';
    }
  }
}