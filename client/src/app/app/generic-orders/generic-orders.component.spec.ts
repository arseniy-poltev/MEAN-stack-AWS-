import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericOrdersComponent } from './generic-orders.component';

describe('GenericOrdersComponent', () => {
  let component: GenericOrdersComponent;
  let fixture: ComponentFixture<GenericOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
