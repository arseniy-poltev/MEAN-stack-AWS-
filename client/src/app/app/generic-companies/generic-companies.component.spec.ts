import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCompaniesComponent } from './generic-companies.component';

describe('GenericCompaniesComponent', () => {
  let component: GenericCompaniesComponent;
  let fixture: ComponentFixture<GenericCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
