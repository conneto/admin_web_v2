import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRequestCardComponent } from './project-request-card.component';

describe('ProjectRequestCardComponent', () => {
  let component: ProjectRequestCardComponent;
  let fixture: ComponentFixture<ProjectRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRequestCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
