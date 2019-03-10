import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsOrderComponent } from './actions-order.component';

describe('ActionsOrderComponent', () => {
  let component: ActionsOrderComponent;
  let fixture: ComponentFixture<ActionsOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
