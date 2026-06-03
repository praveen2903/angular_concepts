import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularInterview } from './angular-interview';

describe('AngularInterview', () => {
  let component: AngularInterview;
  let fixture: ComponentFixture<AngularInterview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularInterview],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularInterview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
