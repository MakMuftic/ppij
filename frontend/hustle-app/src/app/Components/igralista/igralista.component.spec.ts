import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgralistaComponent } from './igralista.component';

describe('IgralistaComponent', () => {
  let component: IgralistaComponent;
  let fixture: ComponentFixture<IgralistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgralistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgralistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
