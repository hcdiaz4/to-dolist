import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '@nequi-app/core/services';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  listItems = new FormArray([]);

  formCategories = this.formBuilder.group({
    items: this.formBuilder.array([])
  });

  constructor(private categoriesService: CategoriesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log('[CategoriesPage]');
    this.getCategories();
  }

  get itemsCategory() {
    return this.formCategories.get('items') as FormArray;
  }

  async getCategories() {
    const categories = await this.categoriesService.listCategories();
    categories.forEach((element) => {
      this.itemsCategory.push(this.formBuilder.control({ value: element.val().title, disabled: true }));
    });

  }

  addCategory() {
    this.itemsCategory.push(this.formBuilder.control({ value: '', disabled: false }, Validators.required));
  }

  saveEditTask() {
    const getAllCategoriesItems = this.formCategories.controls.items.value;
    getAllCategoriesItems.map(category => {
      this.categoriesService.addCategory({
        title: category,
        description: ''
      });
    });
  }

}
