import {
  Component,
  ContentChildren,
  Input,
  Output,
  QueryList,
  EventEmitter,
  TemplateRef,
  AfterContentInit,
  HostListener,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step {
  label: string;
  icon: string;
}

@Component({
  selector: 'step-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="multiple-forms rt-row">
      <ul class="rt-row flex flex-row content-center gap-2">
        <li
          *ngFor="let step of steps; let i = index"
          [ngClass]="{ active: currentStep >= i }"
          class="flex flex-column txt-align-center gap-5"
        >
          <i [ngClass]="step.icon"></i>
          <strong>{{ step.label }}</strong>
        </li>
      </ul>

      <!-- fieldsets -->
      <ng-container *ngFor="let step of steps; let i = index">
        <fieldset
          [ngClass]="{ show: currentStep === i, hide: currentStep !== i }"
          #stepField
        >
          <ng-container
            *ngTemplateOutlet="
              stepContents.get(i) || null;
              context: { $implicit: i }
            "
          ></ng-container>
        </fieldset>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .multiple-forms fieldset {
        background: white;
        border: 0 none;
        border-radius: 0.5rem;
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        padding-bottom: 20px;
        position: relative;
        overflow-y: auto;
        max-height: 600px;
      }
      .multiple-forms fieldset.hide {
        display: none;
        transition: all 1s ease-in-out;
      }
      .multiple-forms fieldset.show {
        display: block;
        transition: all 1s ease-in-out;
      }
      .multiple-forms li {
        list-style-type: none;
        font-size: 15px;
        width: 20%;
        position: relative;
        font-weight: 400;
        justify-content: center;
        align-items: center;
        align-content: center;
        overflow: hidden;
        cursor: pointer;
      }
      .multiple-forms li i {
        width: 40px;
        height: 40px;
        background-color: rgb(0, 87, 248);
        color: white;
        border-radius: 50%;
        font-size: 1.3rem;
        font-weight: 400;
        align-items: center;
        align-content: center;
        z-index: 1;
        transition: border 0.9s ease-in-out;
      }
      .multiple-forms li:before {
        content: ' ';
        position: absolute;
        width: 100%;
        border: 4px solid blue;
        top: 16px;
        transition: border 0.9s ease-in-out;
      }
      .multiple-forms li.active:before {
        content: ' ';
        position: absolute;
        width: 100%;
        top: 16px;
        border: 4px solid rgb(255, 0, 200);
        transition: border 0.9s ease-in-out;
      }
      .multiple-forms li.active i {
        border: 4px solid rgb(255, 0, 200);
        transition: border 0.9s ease-in-out;
      }
    `,
  ],
})
export class StepFormComponent implements AfterContentInit {
  @Input() steps: Step[] = [];
  @Input() currentStep = 0;
  @Output() onChangeStep = new EventEmitter<number>();

  @ContentChildren('fieldContent', { read: TemplateRef })
  stepContents!: QueryList<TemplateRef<any>>;

  @ViewChildren('stepField') stepFields!: QueryList<ElementRef<HTMLElement>>;

  private stepContentsMap: Map<number, TemplateRef<any>> = new Map();

  constructor() {
    this.stepContents = new QueryList<TemplateRef<any>>();
  }

  ngAfterContentInit() {
    this.stepContents.forEach((templateRef, index) => {
      this.stepContentsMap.set(index, templateRef);
    });
    this.updateFieldsetsVisibility();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.matches('[proxBtn]')) {
      this.proximo();
    } else if (target.matches('[antBtn]')) {
      this.anterior();
    }
  }

  proximo() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.onChangeStep.emit(this.currentStep);
      this.updateFieldsetsVisibility();
    }
  }

  anterior() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.onChangeStep.emit(this.currentStep);
      this.updateFieldsetsVisibility();
    }
  }

  goToStep(index: number) {
    this.currentStep = index;
    this.onChangeStep.emit(this.currentStep);
    this.updateFieldsetsVisibility();
  }

  private updateFieldsetsVisibility() {
    if (this.stepFields) {
      this.stepFields.forEach((field, index) => {
        const element = field.nativeElement;
        if (index === this.currentStep) {
          element.classList.add('show');
          element.classList.remove('hide');
        } else {
          element.classList.add('hide');
          element.classList.remove('show');
        }
      });
    }
  }

}
