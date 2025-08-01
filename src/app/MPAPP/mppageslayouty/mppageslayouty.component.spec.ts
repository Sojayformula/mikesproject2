import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MPPageslayoutyComponent } from './mppageslayouty.component';

describe('MPPageslayoutyComponent', () => {
  let component: MPPageslayoutyComponent;
  let fixture: ComponentFixture<MPPageslayoutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MPPageslayoutyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MPPageslayoutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
