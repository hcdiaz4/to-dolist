import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskPanelPage } from './task-panel.page';

describe('TaskPanelPage', () => {
  let component: TaskPanelPage;
  let fixture: ComponentFixture<TaskPanelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
