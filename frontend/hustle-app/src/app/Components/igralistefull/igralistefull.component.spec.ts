import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgralistefullComponent } from './igralistefull.component';

describe('IgralistefullComponent', () => {
  let component: IgralistefullComponent;
  let fixture: ComponentFixture<IgralistefullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgralistefullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgralistefullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
