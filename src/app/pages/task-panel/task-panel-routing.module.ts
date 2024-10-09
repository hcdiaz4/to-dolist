import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskPanelPage } from './task-panel.page';

const routes: Routes = [
  {
    path: '',
    component: TaskPanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskPanelPageRoutingModule {}
