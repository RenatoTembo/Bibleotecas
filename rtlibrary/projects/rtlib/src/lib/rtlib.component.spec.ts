import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtlibComponent } from './rtlib.component';

describe('RtlibComponent', () => {
  let component: RtlibComponent;
  let fixture: ComponentFixture<RtlibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RtlibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RtlibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
