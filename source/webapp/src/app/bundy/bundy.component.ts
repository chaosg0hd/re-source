import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType, Row } from 'angular-google-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataService } from 'src/app/services/data/data.service';
import { LibraryService } from 'src/app/services/library/library.service';
import Swal from 'sweetalert2';
import { Data } from '@angular/router';
import { DatePipe } from '@angular/common';

import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, rubberBandAnimation } from 'angular-animations';


import { Announcement, Employee, Task_Board, Inventory, Attendance, Time, File, Gallery, Payroll, Purchase, Petty_Cash, Revenue, Sale } from 'src/app/services/data/data.model';


@Component({
  selector: 'app-bundy',
  templateUrl: './bundy.component.html',
  styleUrls: ['./bundy.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class BundyComponent implements OnInit {

  constructor(
    public datepipe: DatePipe,
    private dataService: DataService,
    private libraryService: LibraryService,
  )
  { }

  ngOnInit(): void {

    this.loadOnLoop();
    
  }
  //pagintor
  @ViewChild('empBundyPaginator', { static: false })
  set empBundyPaginator(value: MatPaginator) {
    if (this.employeesDataSource) {
      this.employeesDataSource.paginator = value;
    }
  }

  //@ViewChild('empDialog', { static: true }) empDialog!: TemplateRef<any>;

  //OOP
  isLoaded: boolean = false;

  async loadOnLoop() {

    //Event Loop Starts Here
    this.checkIfMobile();
    this.getTime();
    this.getEmployees();
    this.getAnnouncements();
    this.checkIfAvailable();
    this.getStatus();

    

    this.isLoaded = true;

    await this.delay(6000);
    this.reloadLoop();
    
    //Event Loop End Here
  }

  reloadLoop() {
    this.loadOnLoop()
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //check if mobile

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile()
  }

  announcementData: Announcement[] = []

  announcementTitle: string = ""
  announcementContent: string = ""

  getAnnouncements() {
    //this.dataService.getAllItem('announcements').subscribe((data: any) => {
    //  /*console.log(data);*/
    //  this.announcementData = data;

    //  var currentDate = new Date();
    //  /*console.log (currentDate);*/

    //  for (var announcement of this.announcementData) {
    //    var announcementDate = new Date(announcement.announcement_end_date)
    //    /*console.log(announcementDate);*/

    //    if (currentDate <= announcementDate) {
    //      this.announcementTitle = announcement.announcement_title;
    //      this.announcementContent = announcement.announcement_content;
    //      /*console.log("OK")*/
    //    }
    //    else {
    //      this.announcementTitle = "";
    //      this.announcementContent = "";
    //    }
    //  }


    //})
  }

  timeinhours!: any
  timeinminutes!: any
  timeinseconds!: any
  timeinmeri!: any
  day!: any
  date!: any
  

  async getTime() {
    while (true) {
      this.date = new Date
      this.day = this.datepipe.transform(this.date, "fullDate")
      this.timeinhours = this.datepipe.transform(this.date, "hh")
      this.timeinminutes = this.datepipe.transform(this.date, "mm")
      this.timeinseconds = this.datepipe.transform(this.date, "ss")
      this.timeinmeri = this.datepipe.transform(this.date, "a")
      await this.delay(1000)
    }
  }

  employeesPayload: any;
  employeesData: Employee[] = [];
  employeesDataSource = new MatTableDataSource(this.employeesData);
  employeesDisplayedColumns = ['number', 'name', 'position', 'department', 'status', 'time'];

  employeesIdArchive: any;

  getEmployees() {

    this.dataService.get('employees/get')
      .subscribe((data: any) => {

        console.log(data)

        this.employeesPayload = data;
        this.employeesData = this.employeesPayload.data;
        this.employeesDataSource.data = this.employeesData;
      });
  }

  timePayload: any;
  timeData: Time[] = []
  
  getStatus() {

    this.dataService.get('times/get')
      .subscribe((data: any) => {

        console.log(data)

        this.timePayload = data
        this.timeData = this.timePayload.data

      })

  }

  checkStatus(id: any) {

    let status = false

    if (this.timeData.length == 0) {
      status = false
    }

    this.timeData 
      .map((time) => {
        if (time.emp_id == id) {
          status = true
        }
      })

    return status
  }

  isclockedIn: boolean = false;

  clockinId = localStorage.getItem("id") 


  checkIfAvailable() {

    this.dataService.get(`times/check/${this.clockinId}`)
      .subscribe((data: any) => {

        if (data.code == 200) {
          this.isclockedIn = true
        }
        else {
          this.isclockedIn = false
        }

      })

  }

  timeIn() {
    
    this.clockinId = localStorage.getItem("id")
    let req = { "emp_id": this.clockinId }

    this.dataService.post('times/timein', { data: req }).
      subscribe((data: any) => {
        //INSERT SWAL HERE

        console.log(data)
        this.getStatus()

      })


    this.isclockedIn = true
  }

  timeOut() {
    
    this.clockinId = localStorage.getItem("id")
    let delreq = { "emp_id": this.clockinId }      

    this.dataService.post('times/timeout', { data : delreq }).
      subscribe((data: any) => {
        
        console.log(data)

        if (data.code == 200) {

          //INSERT SWAL HERE

          let date = this.datepipe.transform(new Date(data.data.createdAt), 'YYYY-MM-dd')
          let attreq = {}
          attreq = { "atten_emp_id": data.data.emp_id, "atten_seconds": data.seconds, "atten_date": this.datepipe.transform(date, 'YYYY-MM-dd') }
          
          this.dataService.post('attendances/new', { data: attreq })
            .subscribe((data) => {

              console.log(data)
              this.getStatus()
              this.isclockedIn = false

             })
        }
       
      })   

  }

  getTimeTable(id: any) {

    let timeIn = null
    let timeObject = new Date()


    if (this.timeData.length == 0) {
      timeIn = null
    }

    this.timeData
      .map((time) => {

        if (time.emp_id == id) {
          timeIn = "Has Time"
          timeObject = time.createdAt
          timeIn = this.getTimeIn(timeObject)
        }
      })

    return timeIn

  }


  getTimeIn(time: any) {

    var oldTime = new Date(time);
    var timeNow = new Date();

    var newTime = Math.abs(oldTime.getTime() - timeNow.getTime());

    var newTimeinSeconds = newTime / 1000;
    var newTimeinMinutes = newTimeinSeconds / 60;
    var newTimeinHours = newTimeinMinutes / 60;

    return (Math.floor(newTimeinHours) + "h : " + Math.floor(newTimeinMinutes % 60) + "m : " + Math.floor(newTimeinSeconds % 60) + "s");
  }




  

  

 



}
