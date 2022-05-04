import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignUpdateFormComponent } from './campaign-form.component';

describe('CampaignFormComponent', () => {
  let component: CampaignUpdateFormComponent;
  let fixture: ComponentFixture<CampaignUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
