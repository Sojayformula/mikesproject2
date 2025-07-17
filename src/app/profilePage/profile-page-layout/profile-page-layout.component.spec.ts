import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageLayoutComponent } from './profile-page-layout.component';

describe('ProfilePageLayoutComponent', () => {
  let component: ProfilePageLayoutComponent;
  let fixture: ComponentFixture<ProfilePageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePageLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
