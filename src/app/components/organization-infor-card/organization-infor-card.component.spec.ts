import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationInforCardComponent } from './organization-infor-card.component';

describe('OrganizationInforCardComponent', () => {
  let component: OrganizationInforCardComponent;
  let fixture: ComponentFixture<OrganizationInforCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationInforCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationInforCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
