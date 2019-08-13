import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOrdersComponent } from './filter-orders.component';

describe('FilterOrdersComponent', () => {
  let component: FilterOrdersComponent;
  let fixture: ComponentFixture<FilterOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
