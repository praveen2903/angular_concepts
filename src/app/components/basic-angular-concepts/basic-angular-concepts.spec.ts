import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAngularConcepts } from './basic-angular-concepts';

describe('BasicAngularConcepts', () => {
  let component: BasicAngularConcepts;
  let fixture: ComponentFixture<BasicAngularConcepts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicAngularConcepts],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicAngularConcepts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
