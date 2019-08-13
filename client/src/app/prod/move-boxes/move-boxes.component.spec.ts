import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveBoxesComponent } from './move-boxes.component';

describe('MoveBoxesComponent', () => {
  let component: MoveBoxesComponent;
  let fixture: ComponentFixture<MoveBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
