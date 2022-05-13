import { Component } from '@angular/core';
import { DataService } from './services/data/data.service';
import { LibraryService } from './services/library/library.service';

import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]

})
export class AppComponent {
  title = 'Re:Source';

  constructor(public dataService: DataService, public libraryService: LibraryService) {}

  ngOnInit(): void {

    this.load();

  }
  async load() {
    //Event Loop Starts Here

    this.checkIfMobile();
    /*this.checkIfServerActive();*/

    await this.delay(1000);
    this.reload();
    //Event Loop End Here
  }

  reload() {
    this.load();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isMobile: boolean = false;

  checkIfMobile() {
    if (window.screen.width <= 480) {
      this.isMobile = true;
    }
    else {
      this.isMobile = false
    }
    this.libraryService.setIsMobile(this.isMobile)
  }





}

