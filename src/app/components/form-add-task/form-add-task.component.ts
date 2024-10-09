import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TaskServiceService } from '@nequi-app/core/services';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-form-add-task',
  templateUrl: './form-add-task.component.html',
  styleUrls: ['./form-add-task.component.scss'],
})
export class FormAddTaskComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder, private taskService: TaskServiceService, private categoriesService: CategoriesService) { }

  listCategories: any[] = [];

  taskForm = this.formBuilder.group({
    title: ['', Validators.required],
    short_description: ['', Validators.required],
    category: ['', Validators.required],
    priority: ['', Validators.required],
    status: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit() {
    console.log('[FormAddTaskComponent]');
    this.getCategories();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  async getCategories() {
    const listCategories = await this.categoriesService.listCategories();
    if (listCategories.val()) {
      const refactorListCategories: any[] = [];
      Object.entries(listCategories.val()).map(val => {
        const category: any = val[1];
        refactorListCategories.push({
          id: val[0],
          ...category
        })
      });
      this.listCategories = refactorListCategories;
    }
  }

  onSaveTask() {
    this.taskService.addTask(this.taskForm.value);
    this.modalCtrl.dismiss();
  }

}
