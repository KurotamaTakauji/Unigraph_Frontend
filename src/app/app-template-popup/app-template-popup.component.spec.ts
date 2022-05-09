import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTemplatePopupComponent } from './app-template-popup.component';

describe('AppTemplatePopupComponent', () => {
  let component: AppTemplatePopupComponent;
  let fixture: ComponentFixture<AppTemplatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppTemplatePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTemplatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
