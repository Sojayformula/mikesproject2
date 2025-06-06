import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaffLayoutComponent } from './edit-staff-layout.component';

describe('EditStaffLayoutComponent', () => {
  let component: EditStaffLayoutComponent;
  let fixture: ComponentFixture<EditStaffLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStaffLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStaffLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
