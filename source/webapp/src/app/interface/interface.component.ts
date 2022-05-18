import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { LibraryService } from 'src/app/services/library/library.service';
import { RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';
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

    this.getUserData()

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
  role: any;
  imgUrl: any

  getUserData() {

    let fname = localStorage.getItem('fname')
    let lname = localStorage.getItem('lname')
    this.role = localStorage.getItem('role')
    this.imgUrl = localStorage.getItem('imgUrl')
    this.username = fname +" "+ lname

  }

  logout() {

   
    Swal.fire({
      title: 'Do you want to Logout?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        localStorage.clear()
        this.router.navigate(['login'])
      }
    })


  }

}
