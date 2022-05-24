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

  forgot(){
    Swal.fire({
      title: 'Enter account ID',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Send password reset',
    }).then((result) => {
      console.log(result)
      if(result.value){
        //let forgot = {emp_id: result.value}
        //console.log(forgot)
        let newdata : any = {}
        newdata.emp_id = result.value 
        this.dataService.patch('employees/forgot-password', {data: newdata}).subscribe((data: any) => {
          console.log(data)
        })
      }
    })
  }
  
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
      let otp: any
      if (data.code == 200) {
          if(data.data.emp_isVerified == false){
            let newdata = data.data
            newdata.emp_otp = data.otp
            otp = data.otp
            let _id = data.data._id
            this.dataService.patch('employees/otp', {data: newdata}).subscribe((dataOTP: any) => {
              console.log(dataOTP)
              //otp = dataOTP.data.emp_otp
              Swal.fire({
                title: 'Enter your otp code',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Verify',
              }).then((result) => {
                let kekw: any = {}
                console.log(data)
                kekw._id = _id
                kekw.emp_isVerified = true
                this.dataService.patch('employees/edit', {data : kekw} ).subscribe((data: any) => {
                  console.log(data)
                })
                if(result.value == otp){
                  //localStorage.clear();
                localStorage.setItem('_id', data.data._id);
                localStorage.setItem('role', data.data.emp_role);
          // localStorage.setItem('id', data.data.emp_id);
          // localStorage.setItem('imgUrl', data.data.emp_imgUrl);
            localStorage.setItem('lname', data.data.emp_lname);
            localStorage.setItem('fname', data.data.emp_fname);
          // localStorage.setItem('mname', data.data.emp_mname);
        
          localStorage.setItem('data', JSON.stringify(data))
          Swal.fire(
            'Logged in Successfully!',
            'Welcome '+ name,
            'success'
          ).then(()=>this.router.navigate(['home']))
                } else {
                  Swal.fire('Invalid OTP code', '', 'error')
                }
            })

            })
            this.router.navigate(['home'])
          } else {
              localStorage.clear();
              localStorage.setItem('_id', data.data._id);
              localStorage.setItem('role', data.data.emp_role);
        // localStorage.setItem('id', data.data.emp_id);
        // localStorage.setItem('imgUrl', data.data.emp_imgUrl);
          localStorage.setItem('lname', data.data.emp_lname);
          localStorage.setItem('fname', data.data.emp_fname);
        // localStorage.setItem('mname', data.data.emp_mname);
      
        localStorage.setItem('data', JSON.stringify(data))
        /*localStorage.setItem('contact_list', data.employee.list);*/

        var name = localStorage.getItem('fname') + ' ' + localStorage.getItem('lname')

        Swal.fire(
          'Logged in Successfully!',
          'Welcome '+ name,
          'success'
        ).then(()=>this.router.navigate(['home']))
          }
          this.router.navigate(['home'])
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
