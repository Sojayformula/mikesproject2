import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmploymentComponent } from './profile-employment.component';

describe('ProfileEmploymentComponent', () => {
  let component: ProfileEmploymentComponent;
  let fixture: ComponentFixture<ProfileEmploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileEmploymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEmploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
