import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgralisteComponent } from './igraliste.component';

describe('IgralisteComponent', () => {
  let component: IgralisteComponent;
  let fixture: ComponentFixture<IgralisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgralisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgralisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
