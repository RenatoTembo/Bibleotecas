import { Component } from '@angular/core';
import { ButtonComponent } from '../public-api';

@Component({
  selector: 'lib-rtlibrary',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  template: `
    <p>
      rtlibrary works!
    </p>
    <rt-button label="Salvar" type="primary"></rt-button>
    <rt-button label="Cancelar" type="secondary"></rt-button>
  `,
  styles: ``
})
export class RtlibraryComponent {

}
