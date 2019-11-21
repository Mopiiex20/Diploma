import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BegginTestComponent } from './beggin-test.component';

describe('BegginTestComponent', () => {
  let component: BegginTestComponent;
  let fixture: ComponentFixture<BegginTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BegginTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BegginTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
