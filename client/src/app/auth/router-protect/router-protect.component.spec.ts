import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterProtectComponent } from './router-protect.component';

describe('RouterProtectComponent', () => {
  let component: RouterProtectComponent;
  let fixture: ComponentFixture<RouterProtectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterProtectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterProtectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
