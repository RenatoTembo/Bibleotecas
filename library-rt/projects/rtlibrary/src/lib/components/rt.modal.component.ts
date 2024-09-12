import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rt-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" *ngIf="isVisible">
      <div class="modal" [ngClass]="{'static-modal': isStatic}" [ngStyle]="{'min-width.%': minWidth}" (click)="onBackdropClick($event)">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ label }}</h5>
              <i class="btn-close bi bi-x" aria-label="Close" (click)="close()"></i>
            </div>
            <div class="modal-body">
              <ng-content></ng-content>
            </div>
            <div class="modal-footer" *ngIf="hasFooterContent">
              <ng-content select="[footer-button]"></ng-content>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: flex-start;
      z-index: 1050;
    }
    .modal {
      background-color: white;
      border-radius: 0.3rem;
      box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
      position: relative;
      top: 20px;
    }
    .static-modal {
      pointer-events: none;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 7px;
      border-bottom: 1px solid black;
      gap: 5px;
    }
    .modal-header i{
      position: absolute;
      right: 7px;
      top: 5px;
      z-index: 9;
    }
    .modal-footer {
      display: flex;
      justify-content: left;
      align-items: center;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      gap: 5px;
    }
    .modal-body {
      padding: 0.5rem;
      max-height: 500px;
      overflow-y: auto;
    }
    .btn-close {
      font-size: 1.5rem;
      cursor: pointer;
    }
    .btn-close:hover {
      transform: scale(1.4);
    }
  `]
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() label: string = '';
  @Input() title: string = this.label;
  @Input() isStatic: boolean = false;
  @Input() minWidth: number | null = 70;
  isVisible: boolean = false;
  hasFooterContent: boolean = false;

  @ViewChild('footer', { static: false }) footer: ElementRef | undefined;

  private clickListener: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.clickListener = this.handleClick.bind(this);
    document.addEventListener('click', this.clickListener);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.clickListener);
  }

  ngAfterViewInit() {
    this.checkFooterContent();
  }

  private handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && target.hasAttribute('openModal')) {
      const modalId = target.getAttribute('openModal');
      if (modalId === this.elementRef.nativeElement.getAttribute('id')) {
        this.open();
      }
    }
    if (target && target.hasAttribute('modalClose')) {
      const modalContent = this.elementRef.nativeElement.querySelector('.modal-content');
      if (modalContent && modalContent.contains(target)) {
        this.close();
      }
    }
  }

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  onBackdropClick(event: MouseEvent) {
    if (!this.isStatic && event.target === event.currentTarget) {
      this.close();
    }
  }

  private checkFooterContent() {
    if (this.footer) {
      this.hasFooterContent = this.footer.nativeElement.children.length > 0;
    }
  }
}
