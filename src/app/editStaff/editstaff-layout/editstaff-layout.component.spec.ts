import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstaffLayoutComponent } from './editstaff-layout.component';

describe('EditstaffLayoutComponent', () => {
  let component: EditstaffLayoutComponent;
  let fixture: ComponentFixture<EditstaffLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditstaffLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditstaffLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
