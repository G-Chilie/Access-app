import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasisAccessComponent } from './basis-access.component';

describe('BasisAccessComponent', () => {
  let component: BasisAccessComponent;
  let fixture: ComponentFixture<BasisAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasisAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasisAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
