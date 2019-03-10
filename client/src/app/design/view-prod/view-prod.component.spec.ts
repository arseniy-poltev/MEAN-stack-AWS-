import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProdComponent } from './view-prod.component';

describe('ViewProdComponent', () => {
  let component: ViewProdComponent;
  let fixture: ComponentFixture<ViewProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
