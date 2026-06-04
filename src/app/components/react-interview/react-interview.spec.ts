import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactInterview } from './react-interview';

describe('ReactInterview', () => {
  let component: ReactInterview;
  let fixture: ComponentFixture<ReactInterview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactInterview],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactInterview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
