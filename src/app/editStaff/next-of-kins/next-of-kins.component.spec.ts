import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextOfKinsComponent } from './next-of-kins.component';

describe('NextOfKinsComponent', () => {
  let component: NextOfKinsComponent;
  let fixture: ComponentFixture<NextOfKinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextOfKinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextOfKinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
