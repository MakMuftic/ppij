import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DvoranafullComponent } from './dvoranafull.component';

describe('DvoranafullComponent', () => {
  let component: DvoranafullComponent;
  let fixture: ComponentFixture<DvoranafullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DvoranafullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DvoranafullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
