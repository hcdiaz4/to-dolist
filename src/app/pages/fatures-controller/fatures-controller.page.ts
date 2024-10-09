import { Component, OnInit } from '@angular/core';
import { fetchAndActivate, getValue, RemoteConfig } from '@angular/fire/remote-config';

@Component({
  selector: 'app-fatures-controller',
  templateUrl: './fatures-controller.page.html',
  styleUrls: ['./fatures-controller.page.scss'],
})
export class FaturesControllerPage implements OnInit {
  showCarouselHomeFeature = false;
  goToPage = '';
  constructor(private remoteConfig: RemoteConfig) { }

  ngOnInit() {
    console.log('[HomePage]');
    this.remoteConfig.settings.fetchTimeoutMillis = 5000;
    this.remoteConfig.settings.minimumFetchIntervalMillis = 5000;

    fetchAndActivate(this.remoteConfig).then(() => {
      this.showCarouselHomeFeature = getValue(this.remoteConfig, "home_carousel_enabled").asBoolean();
      this.goToPage = this.showCarouselHomeFeature ? '/tabs/home' : '/tabs/tasks';
    })
  }
}