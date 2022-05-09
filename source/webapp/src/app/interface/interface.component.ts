import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { LibraryService } from 'src/app/services/library/library.service';

import { RouterLink, Router } from '@angular/router';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss'],

  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class InterfaceComponent implements OnInit {

  constructor(
    public dataService: DataService,
    public libraryService: LibraryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOnLoop();
  }

  isLoaded: boolean = false;

  async loadOnLoop() {

    //Event Loop Starts Here
    
    this.checkIfMobile();

    this.getName()

    await this.delay(1000);
    this.reloadLoop();
    this.isLoaded = true

    //Event Loop End Here
  }

  reloadLoop() {
    this.loadOnLoop()
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Check if Mobile

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile()
  }

  username: any
  imgUrl:any
  getName() {
    var fname = localStorage.getItem('fname')
    var lname = localStorage.getItem('lname')
    this.imgUrl = localStorage.getItem('imgUrl')
    this.username = fname +" "+ lname

  }

  logout() {


    localStorage.clear
    this.router.navigate(['login'])

  }

}
