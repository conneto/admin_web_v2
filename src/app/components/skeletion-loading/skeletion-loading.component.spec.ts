import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletionLoadingComponent } from './skeletion-loading.component';

describe('SkeletionLoadingComponent', () => {
  let component: SkeletionLoadingComponent;
  let fixture: ComponentFixture<SkeletionLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletionLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletionLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
