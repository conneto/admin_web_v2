import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSkeletonLoadingComponent } from './organization-skeleton-loading.component';

describe('OrganizationSkeletonLoadingComponent', () => {
  let component: OrganizationSkeletonLoadingComponent;
  let fixture: ComponentFixture<OrganizationSkeletonLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationSkeletonLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSkeletonLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
