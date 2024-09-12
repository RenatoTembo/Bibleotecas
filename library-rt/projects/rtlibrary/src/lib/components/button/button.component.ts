import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'rt-button',
  standalone: true,
  imports: [CommonModule],
  template: '<button [ngClass]="type">{{ label }}</button>',
  styles: `
    button {
      padding: 10px 20px;
      margin: 0 2px;
      font-size: 16px;
      border-radius: 4px;
      cursor: pointer;
      border: none;
      color: white; /* Texto branco por padrão */
    }

    button.primary {
      background-color: #007bff;
    }

    button.secondary {
      background-color: #6c757d;
    }

    button.success {
      background-color: #28a745;
    }

    button.danger {
      background-color: #dc3545;
    }

    button.warning {
      background-color: #ffc107;
    }

    button:active {
      font-size: 15.7px;
    }
  `,
})
export class ButtonComponent {
  @Input() label: string = 'Clique aqui'; // Texto do botão
  @Input() type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' = 'primary'; // Tipo do botão

  constructor() {}
}
