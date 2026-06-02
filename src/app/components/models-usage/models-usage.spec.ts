import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsUsage } from './models-usage';

describe('ModelsUsage', () => {
  let component: ModelsUsage;
  let fixture: ComponentFixture<ModelsUsage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelsUsage],
    }).compileComponents();

    fixture = TestBed.createComponent(ModelsUsage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
