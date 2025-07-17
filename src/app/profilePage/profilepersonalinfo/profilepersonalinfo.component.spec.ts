import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepersonalinfoComponent } from './profilepersonalinfo.component';

describe('ProfilepersonalinfoComponent', () => {
  let component: ProfilepersonalinfoComponent;
  let fixture: ComponentFixture<ProfilepersonalinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilepersonalinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilepersonalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
