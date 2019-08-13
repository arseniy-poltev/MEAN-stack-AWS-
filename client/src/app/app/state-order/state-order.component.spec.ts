import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateOrderComponent } from './state-order.component';

describe('StateOrderComponent', () => {
  let component: StateOrderComponent;
  let fixture: ComponentFixture<StateOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
