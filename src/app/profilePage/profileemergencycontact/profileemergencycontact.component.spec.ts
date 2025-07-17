import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileemergencycontactComponent } from './profileemergencycontact.component';

describe('ProfileemergencycontactComponent', () => {
  let component: ProfileemergencycontactComponent;
  let fixture: ComponentFixture<ProfileemergencycontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileemergencycontactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileemergencycontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
