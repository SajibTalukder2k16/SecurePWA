import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredPageComponent } from './expired-page.component';

describe('ExpiredPageComponent', () => {
  let component: ExpiredPageComponent;
  let fixture: ComponentFixture<ExpiredPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpiredPageComponent]
    });
    fixture = TestBed.createComponent(ExpiredPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
