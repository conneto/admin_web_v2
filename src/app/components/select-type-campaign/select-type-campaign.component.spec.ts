import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTypeCampaignComponent } from './select-type-campaign.component';

describe('SelectTypeCampaignComponent', () => {
  let component: SelectTypeCampaignComponent;
  let fixture: ComponentFixture<SelectTypeCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTypeCampaignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTypeCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
