import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DvoraneComponent } from './dvorane.component';

describe('DvoraneComponent', () => {
  let component: DvoraneComponent;
  let fixture: ComponentFixture<DvoraneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DvoraneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DvoraneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
