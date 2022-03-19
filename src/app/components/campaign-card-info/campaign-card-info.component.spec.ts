import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCardInfoComponent } from './campaign-card-info.component';

describe('CampaignCardInfoComponent', () => {
  let component: CampaignCardInfoComponent;
  let fixture: ComponentFixture<CampaignCardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignCardInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
