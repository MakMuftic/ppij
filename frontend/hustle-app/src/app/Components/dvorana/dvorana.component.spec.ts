import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DvoranaComponent } from './dvorana.component';

describe('DvoranaComponent', () => {
  let component: DvoranaComponent;
  let fixture: ComponentFixture<DvoranaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DvoranaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DvoranaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
