import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignUserComponent } from './asign-user.component';

describe('AsignUserComponent', () => {
  let component: AsignUserComponent;
  let fixture: ComponentFixture<AsignUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
