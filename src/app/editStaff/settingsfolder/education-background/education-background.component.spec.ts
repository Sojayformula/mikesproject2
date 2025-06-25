import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationBackgroundComponent } from './education-background.component';

describe('EducationBackgroundComponent', () => {
  let component: EducationBackgroundComponent;
  let fixture: ComponentFixture<EducationBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
