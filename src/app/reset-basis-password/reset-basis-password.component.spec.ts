import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetBasisPasswordComponent } from './reset-basis-password.component';

describe('ResetBasisPasswordComponent', () => {
  let component: ResetBasisPasswordComponent;
  let fixture: ComponentFixture<ResetBasisPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetBasisPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetBasisPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
