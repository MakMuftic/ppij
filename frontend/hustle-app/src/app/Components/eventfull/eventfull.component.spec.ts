import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventfullComponent } from './eventfull.component';

describe('EventfullComponent', () => {
  let component: EventfullComponent;
  let fixture: ComponentFixture<EventfullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventfullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
