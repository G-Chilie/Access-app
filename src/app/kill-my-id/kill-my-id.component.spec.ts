import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KillMyIdComponent } from './kill-my-id.component';

describe('KillMyIdComponent', () => {
  let component: KillMyIdComponent;
  let fixture: ComponentFixture<KillMyIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KillMyIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KillMyIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
