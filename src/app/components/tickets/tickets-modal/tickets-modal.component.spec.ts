import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsModalComponent } from './tickets-modal.component';

describe('TicketsModalComponent', () => {
  let component: TicketsModalComponent;
  let fixture: ComponentFixture<TicketsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
