import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeJs } from './node-js';

describe('NodeJs', () => {
  let component: NodeJs;
  let fixture: ComponentFixture<NodeJs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NodeJs],
    }).compileComponents();

    fixture = TestBed.createComponent(NodeJs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
