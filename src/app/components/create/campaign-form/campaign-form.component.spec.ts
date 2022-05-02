import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamapaignFormComponent } from './campaign-form.component';

describe('CamapaignFormComponent', () => {
  let component: CamapaignFormComponent;
  let fixture: ComponentFixture<CamapaignFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamapaignFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CamapaignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
