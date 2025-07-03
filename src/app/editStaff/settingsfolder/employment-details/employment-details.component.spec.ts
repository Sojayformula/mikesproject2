import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentDetailsComponent2 } from './employment-details.component';

describe('EmploymentDetailsComponent', () => {
  let component: EmploymentDetailsComponent2;
  let fixture: ComponentFixture<EmploymentDetailsComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentDetailsComponent2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentDetailsComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
