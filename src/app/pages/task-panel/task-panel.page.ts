import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Properties, States, TaskInterface } from '@nequi-app/core/models';
import { CategoriesService, TaskServiceService } from '@nequi-app/core/services';
import { FormAddTaskComponent } from 'src/app/components/form-add-task/form-add-task.component';

@Component({
  selector: 'app-task-panel',
  templateUrl: './task-panel.page.html',
  styleUrls: ['./task-panel.page.scss'],
})

export class TaskPanelPage implements OnInit {

  listTasks: any[] = [];
  listPrioritiesData: Properties[];
  listCategoriesData: any;
  listStatesData: States[];

  constructor(
    private modalCtrl: ModalController,
    private taskService: TaskServiceService,
    private categoriesService: CategoriesService,
    private router: Router,
    private routeActived: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('[TaskPanelPage]');
    this.listPriorities();
    this.listCategories();
    this.listStates();
  }

  ionViewWillEnter() {
    this.routeActived.params.subscribe(params => {
      this.listTasks = [];
      this.getTasksList();
    });
  }

  async openModalFormAddTask() {
    const modalForm = await this.modalCtrl.create({
      component: FormAddTaskComponent,
      cssClass: 'modal-full'
    });

    modalForm.onDidDismiss().then(() => {
      this.getTasksList()
    })

    modalForm.present();
  }

  async getTasksList() {
    const listTask = await this.taskService.getTasks();
    if (listTask.val()) {
      const refactorListTasks: TaskInterface[] = [];
      Object.entries(listTask.val()).map(val => {
        const task: any = val[1];
        refactorListTasks.push({
          id: val[0],
          ...task
        })
      });
      this.listTasks = refactorListTasks;
    }
  }

  sortByCategory($event: any) {
    console.log('Resolve Emit: ', $event);
    const filterVal = $event;
    console.log('Sort: ', this.listTasks);
    const response = this.listTasks.sort((a, b) => {
      if (a.category === filterVal) {
        return -1;
      }
      if (b.category !== filterVal) {
        return 1;
      }
      return 0;
    });

    console.log(response);
  }

  async listCategories() {
    const categoires = await this.categoriesService.listCategories();
    this.listCategoriesData = categoires.val();
  }

  async listPriorities() {
    const priorities = await this.taskService.getPriorities();
    this.listPrioritiesData = priorities.val();
  }

  async listStates() {
    const states = await this.taskService.getStates();
    this.listStatesData = states.val();
  }

  addCategory() {
    const category = {
      title: 'Hotfixes',
      description: 'Hotfixes tasks'
    }

    this.categoriesService.addCategory(category);
  }

  goToTaskDetail(task_id: string) {
    this.router.navigate(['/task-detail'], {
      queryParams: {
        id: task_id
      }
    });
  }

}
