import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignRequestCardComponent } from './campaign-request-card.component';

describe('CampaignRequestCardComponent', () => {
  let component: CampaignRequestCardComponent;
  let fixture: ComponentFixture<CampaignRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignRequestCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
