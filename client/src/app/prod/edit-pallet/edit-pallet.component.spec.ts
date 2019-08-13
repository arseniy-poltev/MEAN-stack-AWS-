import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPalletComponent } from './edit-pallet.component';

describe('EditPalletComponent', () => {
  let component: EditPalletComponent;
  let fixture: ComponentFixture<EditPalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
