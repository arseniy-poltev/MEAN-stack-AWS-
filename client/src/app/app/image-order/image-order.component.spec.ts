import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageOrderComponent } from './image-order.component';

describe('ImageOrderComponent', () => {
  let component: ImageOrderComponent;
  let fixture: ComponentFixture<ImageOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
