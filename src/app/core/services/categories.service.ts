import { inject, Injectable } from '@angular/core';
import { child, Database, get, getDatabase, push, ref, set, update } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private database = inject(Database);
  private dbRef = ref(getDatabase());

  constructor() { }

  listCategories = () => {
    return get(child(this.dbRef, `categories/`));
  }

  addCategory = (category: any) => {
    try {
      const postListRef = ref(this.database, 'categories');
      const newPostRef = push(postListRef);
      set(newPostRef, category);
    } catch {
      console.log
    }
  }

  editCategories = (data_category?: any) => {
    try {
      const updateTaskRef = ref(this.database, `categories`);
      update(updateTaskRef, data_category);
    } catch (error) {
      console.log(error);
    }
  }

}
