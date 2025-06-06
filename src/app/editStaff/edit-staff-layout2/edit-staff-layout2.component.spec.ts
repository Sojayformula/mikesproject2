import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaffLayout2Component } from './edit-staff-layout2.component';

describe('EditStaffLayout2Component', () => {
  let component: EditStaffLayout2Component;
  let fixture: ComponentFixture<EditStaffLayout2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStaffLayout2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStaffLayout2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
