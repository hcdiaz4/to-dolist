import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { TASKS_STATES } from '@nequi-app/core/constants/global.constants';
import { TaskInterface } from '@nequi-app/core/models';
import { TaskServiceService } from '@nequi-app/core/services';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {

  @ViewChild('miBoton') button: ElementRef;

  taskId: string = '';
  task: TaskInterface = {};
  taskGlobal = '';
  isEdit: boolean = false;


  constructor(
    private activedRoute: ActivatedRoute,
    private alertController: AlertController,
    private taskService: TaskServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private navCtrl: NavController) { }

  taskFormEdit = this.formBuilder.group({
    title: ['', Validators.required],
    short_description: ['', Validators.required],
    category: ['', Validators.required],
    priority: ['', Validators.required],
    status: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit() {
    this.taskId = this.activedRoute.snapshot.queryParamMap?.get('id') || '0';
    this.getTaskDetail();
  }

  async getTaskDetail() {
    const task = await this.taskService.getTaskById(this.taskId);
    this.task = task.val();
    this.taskGlobal = TASKS_STATES[Number(this.task.status)];
  }

  async confirmDeleteTask() {
    const alert = await this.alertController.create({
      message: 'This task will be deleted, do you wish to continue?',
      buttons: [
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.deleteTask();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  async deleteTask() {
    const task = await this.taskService.deleteTask(this.taskId);
    this.navCtrl.back();
  }

  edit() {
    this.isEdit = true;
    this.taskFormEdit.controls.title.setValue(this.task.title!);
    this.taskFormEdit.controls.short_description.setValue(this.task.short_description!);
    this.taskFormEdit.controls.description.setValue(this.task.description!);
    this.taskFormEdit.controls.priority.setValue(this.task.priority!);
    this.taskFormEdit.controls.category.setValue(this.task.category!);
    this.taskFormEdit.controls.status.setValue(this.task.status!);
  }

  saveEditTask() {
    this.taskService.editTask(this.taskId, this.taskFormEdit.value);
    this.getTaskDetail();
    this.isEdit = !this.isEdit;
  }

  ejectSubmitForm() {
    this.button.nativeElement.click();
  }

}
