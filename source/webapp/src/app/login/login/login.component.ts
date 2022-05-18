import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { LibraryService } from 'src/app/services/library/library.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private libraryService: LibraryService,
    private router: Router,
    private authService: AuthService
  ) {}
  
 

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
   }

    this.loadOnLoop()
  }

  isLoaded: boolean = false;
  async loadOnLoop() {

    //Event Loop Starts Here

    this.checkIfMobile();
    this.isLoaded = false;


    
    this.isLoaded = true;
    await this.delay(60000);
    this.reloadLoop();

    //Event Loop End Here
  }

  reloadLoop() {
    this.loadOnLoop()
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isMobile: boolean = false
  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile();
  }


  /*Functions*/

  id: any
  password: any
  loginData: any = {}
  login() {
    this.loginData.emp_id = this.id
    this.loginData.emp_password = this.password

    if (this.id == '00000' && this.password == '00000') {

      this.router.navigate(['home'])
    }



    this.dataService.post('employees/login', {data:this.loginData} ).subscribe((data: any) => {

      console.log(data)

      if (data.code == 200) {
        localStorage.clear();
        localStorage.setItem('id', data.data.emp_id);
        localStorage.setItem('imgUrl', data.data.emp_imgUrl);
        localStorage.setItem('lname', data.data.emp_lname);
        localStorage.setItem('fname', data.data.emp_fname);
        localStorage.setItem('mname', data.data.emp_mname);
        localStorage.setItem('data', JSON.stringify(data))
        /*localStorage.setItem('contact_list', data.employee.list);*/

        var name = localStorage.getItem('fname') + ' ' + localStorage.getItem('lname')

        Swal.fire(
          'Logged in Successfully!',
          'Welcome '+ name,
          'success'
        ).then(()=>this.router.navigate(['home']))     
      }
      else if (data.code == 401) {
        Swal.fire(
          'Invalid Credentials!',
          '',
          'error'
        )
      }
      else if (data.code == 404) {
        Swal.fire(
          'Account Does Not Exist',
          '',
          'error'
        )
      }
      else if (data.code == 500) {
        Swal.fire(
          'Server Error!',
          '',
          'error'
        )
      }
      else {
        Swal.fire(
          'Unknown Error',
          '',
          'error'
        )
      }
    }, (error : any) => {
      Swal.fire(
        'Client Side Error!',
        '',
        'error'
      )
    })
  }
}
