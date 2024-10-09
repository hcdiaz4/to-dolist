import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-redirect',
  templateUrl: './loading-redirect.component.html',
  styleUrls: ['./loading-redirect.component.scss'],
})
export class LoadingRedirectComponent implements OnInit {
  @Input() goToPage: string = '';
  constructor(private router: Router) { }

  ngOnInit() {
    console.log('[LoadingRedirectComponent]');
    setTimeout(() => {
      this.router.navigate([this.goToPage]);
    }, 2000);
  }

}
