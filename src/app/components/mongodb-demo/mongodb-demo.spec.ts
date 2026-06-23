import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongodbDemo } from './mongodb-demo';

describe('MongodbDemo', () => {
  let component: MongodbDemo;
  let fixture: ComponentFixture<MongodbDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MongodbDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(MongodbDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
