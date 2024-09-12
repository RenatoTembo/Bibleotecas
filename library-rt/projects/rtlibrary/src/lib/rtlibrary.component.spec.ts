import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtlibraryComponent } from './rtlibrary.component';

describe('RtlibraryComponent', () => {
  let component: RtlibraryComponent;
  let fixture: ComponentFixture<RtlibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RtlibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RtlibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
