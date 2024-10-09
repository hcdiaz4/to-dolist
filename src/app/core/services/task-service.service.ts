import { inject, Injectable } from '@angular/core';
import { child, Database, equalTo, get, getDatabase, onValue, orderByChild, orderByKey, orderByValue, push, query, ref, remove, set, update } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private database = inject(Database);
  private dbRef = ref(getDatabase());

  constructor() { }

  getTasks = () => {
    return get(child(this.dbRef, `tasks/`));
  }

  getTaskById = (task_id: any) => {
    console.log('service tid: ', task_id);
    return get(child(this.dbRef, `tasks/${task_id}`));
  }

  getPriorities = () => {
    return get(child(this.dbRef, `priority/`));
  }

  getStates = () => {
    return get(child(this.dbRef, `states/`));
  }

  orderTaskByCategory = (category?: string) => {
    return get(query(ref(this.database, 'tasks'), orderByChild('title')));
  }

  addTask = (task: any) => {
    try {
      const postListRef = ref(this.database, 'tasks');
      const newPostRef = push(postListRef);
      set(newPostRef, task);
    } catch {
      console.log
    }
  }

  editTask = (task_id: string, data: {}) => {
    try {
      const updateTaskRef = ref(this.database, `tasks/${task_id}`);
      update(updateTaskRef, data);
    } catch (error) {
      console.log(error);
    }
  }

  deleteTask = (task_id: string) => {
    try {
      const updateTaskRef = ref(this.database, `tasks/${task_id}`);
      remove(updateTaskRef);
    } catch (error) {
      console.log(error);
    }
  }

}
