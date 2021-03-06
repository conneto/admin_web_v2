import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignForm } from './campaign-form.component';

describe('CampaignForm', () => {
  let component: CampaignForm;
  let fixture: ComponentFixture<CampaignForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignForm ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
