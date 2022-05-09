import { Injectable } from '@angular/core';
import { DatePipe, Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private datepipe: DatePipe) { }

  isMobile!: boolean

  setIsMobile(status: boolean) {
    this.isMobile = status
  }

  getIsMobile() {
    return this.isMobile
  }

  getDate(format: string) {
    var date
    date = new Date()
    date = this.datepipe.transform(date, format)
    return <string>(date)
  }

  getFirstDayMonth() {

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    return firstDay

  }

  getLastDayMonth() {

    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay

  }

  //getLastDayofMonth(month: number) {
  //  var date
  //  date = new Date()
  //  date.setMonth(month + 1)
  //  date.setDate(0)
  //  date = date.getDate()
  //  return date
  //}

  generateDaysArray(startdate: any, enddate: any) {

    console.log(startdate, enddate)

    var daysArray: any[] = [];

    let firstday = new Date(startdate).getDate()

    let lastday = new Date(enddate).getDate()

    console.log(firstday, lastday)

    let day = new Date(startdate);

    while (day <= enddate) {

      daysArray.push(this.datepipe.transform(day,'yyyy-MM-dd'))
      let newDate = day.setDate(day.getDate() + 1);
      day = new Date(newDate);
    }

    /*console.log(daysArray)*/

    return (daysArray)
  }

  //generateMonthsArray() {

  //  var monthsArray: any[] = [];
  //  var month;
  //  for (let i = 0, j = 11; i <= j; i++) {
  //    month = new Date()
  //    month.setDate(1)
  //    month.setMonth(i)
  //    month = this.datepipe.transform(month, 'MMMM');
  //    monthsArray.push(month)
  //  }
  //  return (monthsArray)
  //}

  //getMonth(date: any) {
  //  var month;
  //  month = this.datepipe.transform(date, 'MM');
  //  return (month);
  //}

  //decodeDate(date: any) {
  //  var decode;
  //  decode = this.datepipe.transform(date, 'mm-dd-yyyy');
  //  return (decode);
  //}


}
