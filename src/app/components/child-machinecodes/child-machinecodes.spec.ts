import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildMachinecodes } from './child-machinecodes';

describe('ChildMachinecodes', () => {
  let component: ChildMachinecodes;
  let fixture: ComponentFixture<ChildMachinecodes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildMachinecodes],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildMachinecodes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
