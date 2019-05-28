import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenurlComponent } from './openurl.component';

describe('OpenurlComponent', () => {
  let component: OpenurlComponent;
  let fixture: ComponentFixture<OpenurlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenurlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
