import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmengencycontactComponent } from './emengencycontact.component';

describe('EmengencycontactComponent', () => {
  let component: EmengencycontactComponent;
  let fixture: ComponentFixture<EmengencycontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmengencycontactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmengencycontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
