import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuesViewComponent } from './venues-view.component';

describe('VenuesViewComponent', () => {
  let component: VenuesViewComponent;
  let fixture: ComponentFixture<VenuesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
