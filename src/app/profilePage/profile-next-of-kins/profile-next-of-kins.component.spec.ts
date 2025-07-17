import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNextOfKinsComponent } from './profile-next-of-kins.component';

describe('ProfileNextOfKinsComponent', () => {
  let component: ProfileNextOfKinsComponent;
  let fixture: ComponentFixture<ProfileNextOfKinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileNextOfKinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileNextOfKinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
