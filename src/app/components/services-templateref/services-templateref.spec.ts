import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesTemplateref } from './services-templateref';

describe('ServicesTemplateref', () => {
  let component: ServicesTemplateref;
  let fixture: ComponentFixture<ServicesTemplateref>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesTemplateref],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesTemplateref);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
