import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateModalComponent } from './validate-modal.component';

describe('ValidateModalComponent', () => {
  let component: ValidateModalComponent;
  let fixture: ComponentFixture<ValidateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
