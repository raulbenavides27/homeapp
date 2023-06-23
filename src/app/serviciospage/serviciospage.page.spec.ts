import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiciospagePage } from './serviciospage.page';

describe('ServiciospagePage', () => {
  let component: ServiciospagePage;
  let fixture: ComponentFixture<ServiciospagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ServiciospagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
