import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDocumentFormComponent } from './download-document-form.component';

describe('DownloadDocumentFormComponent', () => {
  let component: DownloadDocumentFormComponent;
  let fixture: ComponentFixture<DownloadDocumentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadDocumentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadDocumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
