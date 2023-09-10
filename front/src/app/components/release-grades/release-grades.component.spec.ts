import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseGradesComponent } from './release-grades.component';

describe('ReleaseGradesComponent', () => {
  let component: ReleaseGradesComponent;
  let fixture: ComponentFixture<ReleaseGradesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReleaseGradesComponent]
    });
    fixture = TestBed.createComponent(ReleaseGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
