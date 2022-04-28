import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCampaignParticipationsComponent } from './table-campaign-participations.component';

describe('TableCampaignParticipationsComponent', () => {
  let component: TableCampaignParticipationsComponent;
  let fixture: ComponentFixture<TableCampaignParticipationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCampaignParticipationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCampaignParticipationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
