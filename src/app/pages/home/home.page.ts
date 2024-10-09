import { Component, OnInit } from '@angular/core';
import { RemoteConfig, getValue, fetchAndActivate } from '@angular/fire/remote-config';
import { TaskServiceService } from '@nequi-app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  listTasks: any;
  showCarouselHomeFeature = false;


  constructor(private taskService: TaskServiceService, private remoteConfig: RemoteConfig) { }

  ngOnInit() {
    console.log('[HomePage]');
    this.getTasksList();
  }

  async getTasksList() {
    const listTask = await this.taskService.getTasks();
  }

}
