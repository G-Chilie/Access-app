import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteToApplicationComponent } from './route-to-application.component';

describe('RouteToApplicationComponent', () => {
  let component: RouteToApplicationComponent;
  let fixture: ComponentFixture<RouteToApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteToApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteToApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
