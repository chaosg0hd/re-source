import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { ChartType, Row } from 'angular-google-charts';
import { LibraryService } from 'src/app/services/library/library.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, rubberBandAnimation } from 'angular-animations';
import { Announcement, Employee, Task_Board, Inventory, Attendance, Time, File, Gallery, Payroll, Purchase, Petty_Cash, Revenue, Sale } from 'src/app/services/data/data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    rubberBandAnimation(),
  ]
  
})
export class HomeComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    this.loadOnLoop();
  }


  
  isLoaded: boolean = false;

  async loadOnLoop() {

    //Event Loop Starts Here
    
    this.checkIfMobile();

    this.getTasks();
    this.getActive();


    
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

  //Check if Mobile

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile()
  }

  /*Functions*/

  taskBoardData: Task_Board[] = [];

  getTasks() {
    //this.dataService.getAllItem('taskboard').subscribe((data: any) => {
    //  if (this.taskBoardData.length == 0) {
    //    this.taskBoardData = data;
    //  }

    //  if (this.taskBoardData.length != data.length) {
    //    this.taskBoardData = data;
    //  }
    //})
  }

  timePayload: any;
  timeData: Time[] = []

  getActive() {

    this.dataService.get('times/get')
      .subscribe((data) => {        
        console.log(data)
        this.timePayload = data
        this.timeData = this.timePayload.data
        
      })

  }

  getTimeActive() {

    let id = localStorage.getItem("id")

    let timeIn = '0'
    let timeObject = new Date()


    if (this.timeData.length == 0) {
      timeIn = '0'
    }

    this.timeData.map((time) => {
        if (time.emp_id == id) {
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

    return (Math.floor(newTimeinHours) + "h : " + Math.floor(newTimeinMinutes % 60) + "m : " + Math.floor(newTimeinSeconds % 60) + "s ");
  }





























  activeDiv: any

  onclickDiv(divId: any) {
    if (this.activeDiv == divId) {
      this.activeDiv = null
    }
    else {
      this.activeDiv = divId;
    }   
  }




  

}
