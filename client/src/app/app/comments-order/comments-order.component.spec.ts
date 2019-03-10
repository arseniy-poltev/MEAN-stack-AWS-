import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsOrderComponent } from './comments-order.component';

describe('CommentsOrderComponent', () => {
  let component: CommentsOrderComponent;
  let fixture: ComponentFixture<CommentsOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
