import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { ChartType, Row } from 'angular-google-charts';
import { LibraryService } from 'src/app/services/library/library.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, rubberBandAnimation } from 'angular-animations';

import { Announcement } from 'src/app/services/data/data.model';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],

  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    rubberBandAnimation(),
  ]
})
export class AnnouncementComponent implements OnInit {

  constructor(
    private dataService: DataService,
    public libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    this.loadOnLoop()
  }



  async loadOnLoop() {
    //Event Loop Starts Here
    this.getAnnouncements();


    await this.delay(1000);
    this.reloadLoop();
    //Event Loop End Here
  }

  reloadLoop() {
    this.loadOnLoop()
  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  addAnnouncement() {

  }

  editAnnouncement() {

  }

  archiveAnnouncement() {

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
