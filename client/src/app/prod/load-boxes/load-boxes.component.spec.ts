import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBoxesComponent } from './load-boxes.component';

describe('LoadBoxesComponent', () => {
  let component: LoadBoxesComponent;
  let fixture: ComponentFixture<LoadBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
