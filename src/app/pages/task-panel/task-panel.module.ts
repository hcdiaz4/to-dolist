import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskPanelPageRoutingModule } from './task-panel-routing.module';

import { TaskFiltersComponent } from 'src/app/components/task-filters/task-filters.component';
import { FormAddTaskComponent } from 'src/app/components/form-add-task/form-add-task.component';
import { TaskPanelPage } from './task-panel.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TaskPanelPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TaskPanelPage, TaskFiltersComponent, FormAddTaskComponent]
})
export class TaskPanelPageModule { }
