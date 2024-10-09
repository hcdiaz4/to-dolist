import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaturesControllerPage } from './fatures-controller.page';

describe('FaturesControllerPage', () => {
  let component: FaturesControllerPage;
  let fixture: ComponentFixture<FaturesControllerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FaturesControllerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
