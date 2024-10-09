import { Component, OnInit } from '@angular/core';
import { fetchAndActivate, getValue, RemoteConfig } from '@angular/fire/remote-config';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  showTabHomeFeature = false;
  constructor(private remoteConfig: RemoteConfig) { }

  ngOnInit() {
    console.log('[TabsPage]');

    this.remoteConfig.settings.fetchTimeoutMillis = 5000;
    this.remoteConfig.settings.minimumFetchIntervalMillis = 5000;

    fetchAndActivate(this.remoteConfig).then(() => {
      this.showTabHomeFeature = getValue(this.remoteConfig, "home_carousel_enabled").asBoolean();
    })
  }

}
