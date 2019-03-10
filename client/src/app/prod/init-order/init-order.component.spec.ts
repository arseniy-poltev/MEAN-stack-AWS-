import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitOrderComponent } from './init-order.component';

describe('InitOrderComponent', () => {
  let component: InitOrderComponent;
  let fixture: ComponentFixture<InitOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
