import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Properties, States } from '@nequi-app/core/models';
import { CategoriesService, TaskServiceService } from '@nequi-app/core/services';

@Component({
  selector: 'app-task-filters',
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.scss'],
})
export class TaskFiltersComponent implements OnInit {

  @Input() priorities: Properties[];
  @Input() categories: any;
  @Input() states: States[];
  @Output() changeCategory = new EventEmitter<string>();

  constructor(private categoriesService: CategoriesService, private taskService: TaskServiceService) { }

  listCategories: any[] = [];

  ngOnInit() {
    console.log('[TaskFiltersComponent]');
    this.getCategories();
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

  sendCategory(event: any) {
    this.changeCategory.emit(event.target.value);
    console.log('Emit event: ', event.target.value);
  }

}
