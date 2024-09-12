import { Component, Input, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rt-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [id]="id" class="dropdown flex flex-column content-left" [class.show]="isDropdownOpen">
      <button
        (click)="toggleDropdown()"
        [ngClass]="classList"
        [ngStyle]="{'border-radius': borderRadiusStyle, 'padding': '5px'}"
        class="bt-dropdown dropdown-toggle"
        type="button"
        aria-expanded="false">
        {{ label }}
      </button>
      <ul class="dropdown-menu" [class.show]="isDropdownOpen">
        <ng-content></ng-content>
      </ul>
    </div>
  `,
  styles: [`
    .dropdown {
      position: relative;
      display: inline-block;
      text-align: left !important;
    }
    .dropdown .bt-dropdown{
      font-size: 10pt !important;
      padding: 3px 5px
    }
    .dropdown-menu {
      display: none;
      position: absolute;
      background-color: white;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 99;
      list-style: none;
      padding: 0;
      margin: 0;
      right: 0;
      text-align: left !important;
    }
    .dropdown.show .dropdown-menu {
      display: block;
      text-align: left !important;
    }
    .dropdown-menu li {
      padding: 5px;
      cursor: pointer;
      text-align: left !important;
    }
    .dropdown-menu li:hover {
      background-color: #f1f1f1;
    }
  `]
})
export class RtDropdownComponent implements OnChanges {
  @Input() id?: string;
  @Input() classList: string = '';
  @Input() label: string = '';
  @Input() borderRadius: string = '0';  // Default to 0 if not provided
  @Input() isRound: boolean = false;     // Default to false if not provided

  isDropdownOpen = false;
  static openDropdown: RtDropdownComponent | null = null; // Track the currently open dropdown

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isRound'] && changes['isRound'].currentValue) {
      this.borderRadius = '50%';
    }
  }

  get borderRadiusStyle(): string {
    return this.isRound ? '50%' : this.borderRadius;
  }

  toggleDropdown() {
    if (RtDropdownComponent.openDropdown && RtDropdownComponent.openDropdown !== this) {
      RtDropdownComponent.openDropdown.closeDropdown();
    }

    this.isDropdownOpen = !this.isDropdownOpen;
    RtDropdownComponent.openDropdown = this.isDropdownOpen ? this : null;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
    if (RtDropdownComponent.openDropdown === this) {
      RtDropdownComponent.openDropdown = null;
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.dropdown')) {
      this.closeDropdown();
    }
  }

  @HostListener('click', ['$event'])
  handleClickInside(event: MouseEvent) {
    // event.stopPropagation(); // Prevent the click inside the component from closing the dropdown
  }
}
