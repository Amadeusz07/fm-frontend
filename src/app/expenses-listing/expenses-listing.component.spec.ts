import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesListingComponent } from './expenses-listing.component';

describe('ExpensesListingComponent', () => {
  let component: ExpensesListingComponent;
  let fixture: ComponentFixture<ExpensesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
