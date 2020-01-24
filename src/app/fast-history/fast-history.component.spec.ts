import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastHistoryComponent } from './fast-history.component';

describe('FastHistoryComponent', () => {
  let component: FastHistoryComponent;
  let fixture: ComponentFixture<FastHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
