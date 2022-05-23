import { Component, OnInit, ViewChild, TemplateRef, ElementRef} from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType, Row } from 'angular-google-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog} from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/data.service';
import Swal from 'sweetalert2';
import { Data } from '@angular/router';
import { DatePipe } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import { Announcement, Employee, Task_Board, Inventory, Attendance, Time, File, Gallery, Payroll, Purchase, Petty_Cash, Revenue, Sale } from 'src/app/services/data/data.model';

import { LibraryService } from 'src/app/services/library/library.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import * as e from 'express';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { clear, timeStamp } from 'console';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],

  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class ProfileComponent implements OnInit {

  constructor(
    private libraryService: LibraryService,
    private dataService: DataService,
    private datepipe: DatePipe,
    private dialog: MatDialog,
    private httpClient: HttpClient,

  ) { }
    userData: any = {}
  ngOnInit(): void {
    let data: any
    data = localStorage.getItem('data')
    this.userData = JSON.parse(data)
    console.log(this.userData)
    this.loadOnLoop()

  }

  @ViewChild('empUserProfile', { static: true }) empUserProfile!: TemplateRef<any>;
  @ViewChild('empChangePassword', { static: true }) empChangePassword!: TemplateRef<any>;

  openDialogEditUser(input: any) {
    this.dialog.open(this.empUserProfile, { data: input });
  }

  openDialogChangePassword(input: any) {
    this.dialog.open(this.empChangePassword, {data: input})
  }

  isLoaded: boolean = false;

  async loadOnLoop() {

    //Event Loop Starts Here    
    this.checkIfMobile();

    await this.loadTab(this.activeTab);

    this.isLoaded = true;
    this.isLoadedTab = true;

    await this.delay(60000);
    this.reloadLoop();
    

    //Event Loop End Here
  }

  //LoadTabData

  isLoadedTab = false;
  activeTab = 0

  async loadTab(event: any) {


    let tab = 0
    /*this.activeTab = event.index*/

    if (typeof event == 'object') {
      tab = event.index
      this.activeTab = tab
    }
    else {
      tab = this.activeTab
    }
    

    switch (tab) {
      case 0:

        this.isLoadedTab = false;

        await this.getEmployee(this.userData.data._id)

        await this.delay(1000);
        this.isLoadedTab = true;

        break;

      default:
    }
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

  isToggleArchive = false

  employeeData: any ={}
  getEmployee(input: string){
    console.log(input)
    let id =  input
    console.log(id)
    this.dataService.get(`employees/get/${input}`).subscribe((data: any) => {
      console.log(data)
      this.employeeData = data
    })
  }

  editEmp(input: any) {
    let editimage = input.emp_imgfile
    const form = new FormData()
    form.append('file', editimage)
    if(!input.emp_imgUrl){
      if(editimage){

        this.httpClient.post<any>('http://localhost:3000/api/uploads', form).subscribe((data: any) => {
          input.emp_imgUrl = data.filename
          this.dataService.patch('employees/edit', { data: input }).subscribe((data: any) => {
          
            if(data.code == 200) Swal.fire('Edit Successful', '', 'success')
            else {Swal.fire('Action unsuccessful!', '', 'error')}
  
          })
      })
    }
    }else if (input.emp_imgUrl){  
      this.httpClient.post<any>('http://localhost:3000/api/uploads', form).subscribe((data: any) => {
          input.emp_imgUrl = data.filename
          this.dataService.patch('employees/edit', { data: input }).subscribe((data: any) => {
          
            if(data.code == 200) Swal.fire('Edit Successful', '', 'success')
            else {Swal.fire('Action unsuccessful!', '', 'error')}
  
          })
        })
    }else{
      this.dataService.patch('employees/edit', { data: input }).subscribe((data: any) => {
        
        if(data.code == 200) Swal.fire('Edit Successful', '', 'success')
        else {Swal.fire('Action unsuccessful!', '', 'error')}

      })
    }
  }

  otp: any
  realotp: any
  click = false

  sendOTP(){
    this.click = !this.click

    this.dataService.get('otp/get').subscribe((data: any) => {
      console.log(data.data)
      this.realotp = data.data
      localStorage.setItem('rotp', data.data)
    })

    if(!this.click) {
      const timeoutid = setTimeout(function(){
        console.log('30 sec mins')
      }, 30000)

      clearTimeout(timeoutid)
      this.click = !this.click
    }
    
    
    setTimeout(() => {

    }, 300000)


  }
  verify() {
    if(this.otp == localStorage.getItem('rotp')){

      Swal.fire('succes')
      let verify: any = {}
      console.log(localStorage.getItem('_id'))
      verify._id = localStorage.getItem('_id')
      verify.emp_isVerified = true
      this.dataService.patch('employees/edit', {data: verify}).subscribe((data: any) => {
        console.log(data)
      })

    } else {
      Swal.fire('kekw')
    }
  }

  editUser(input: any){

  //   if(input.emp_imgurl){}

  //   this.httpClient.post<any>('','').subscribe((data: any) => {
  //     console.log(data)
  //   })
    this.dataService.patch('employees/edit', {data: input}).subscribe((data: any) => {
      console.log(data)
    })

  }

  changePword(input: any){
    this.dataService.patch('employees/change-password', {data:input}).subscribe((data: any) => {
      console.log(data)
    })
  }
  
}
