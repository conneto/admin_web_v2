import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeToListComponent } from './change-to-list.component';

describe('ChangeToListComponent', () => {
  let component: ChangeToListComponent;
  let fixture: ComponentFixture<ChangeToListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeToListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
