import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignRequestDetailComponent } from './campaign-request-detail.component';

describe('CampaignRequestDetailComponent', () => {
  let component: CampaignRequestDetailComponent;
  let fixture: ComponentFixture<CampaignRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignRequestDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
