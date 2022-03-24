import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationRequestDetailsComponent } from './organization-request-details.component';

describe('OrganizationRequestDetailsComponent', () => {
  let component: OrganizationRequestDetailsComponent;
  let fixture: ComponentFixture<OrganizationRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationRequestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
