import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipesRouting } from './pipes-routing';

describe('PipesRouting', () => {
  let component: PipesRouting;
  let fixture: ComponentFixture<PipesRouting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PipesRouting],
    }).compileComponents();

    fixture = TestBed.createComponent(PipesRouting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
