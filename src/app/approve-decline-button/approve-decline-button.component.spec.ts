import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDeclineButtonComponent } from './approve-decline-button.component';

describe('ApproveDeclineButtonComponent', () => {
  let component: ApproveDeclineButtonComponent;
  let fixture: ComponentFixture<ApproveDeclineButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDeclineButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDeclineButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
