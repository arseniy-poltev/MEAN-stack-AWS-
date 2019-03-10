import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredPalletComponent } from './stored-pallet.component';

describe('StoredPalletComponent', () => {
  let component: StoredPalletComponent;
  let fixture: ComponentFixture<StoredPalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoredPalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredPalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
