import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatusFilterComponent } from './user-status-filter.component';

describe('UserStatusFilterComponent', () => {
  let component: UserStatusFilterComponent;
  let fixture: ComponentFixture<UserStatusFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStatusFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
