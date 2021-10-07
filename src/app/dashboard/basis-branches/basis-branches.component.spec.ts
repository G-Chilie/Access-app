import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasisBranchesComponent } from './basis-branches.component';

describe('BasisBranchesComponent', () => {
  let component: BasisBranchesComponent;
  let fixture: ComponentFixture<BasisBranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasisBranchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasisBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
