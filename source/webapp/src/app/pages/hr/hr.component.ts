import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType, Row } from 'angular-google-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog} from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/data.service';
import Swal from 'sweetalert2';
import { Data } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Announcement, Employee, Task_Board, Inventory, Attendance, Time, File, Gallery, Payroll, Purchase, Petty_Cash, Revenue, Sale } from 'src/app/services/data/data.model';

import { LibraryService } from 'src/app/services/library/library.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.scss'],


  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})

export class HrComponent implements OnInit{

  constructor(
    private libraryService: LibraryService,
    private dataService: DataService,
    private datepipe: DatePipe,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {

    this.loadOnLoop()

  }

  @ViewChild('empPaginator', { static: false })
  set empPaginator(value: MatPaginator) {
    if (this.employeesDataSource) {
      this.employeesDataSource.paginator = value;
    }
  }

  @ViewChild('attPaginator', { static: false })
  set attPaginator(value: MatPaginator) {
    if (this.calendarDataSource) {
      this.calendarDataSource.paginator = value;
    }
  }

  @ViewChild('timePaginator', { static: false })
  set timePaginator(value: MatPaginator) {
    if (this.attendanceDataSource) {
      this.attendanceDataSource.paginator = value;
    }
  }

  @ViewChild('payrollPaginator', { static: false })
  set payrollPaginator(value: MatPaginator) {
    if (this.attendanceDataSource) {
      this.attendanceDataSource.paginator = value;
    }
  }
  
  @ViewChild('empDialog', { static: true }) empDialog!: TemplateRef<any>;
  @ViewChild('empNewDialog', { static: true }) empNewDialog!: TemplateRef<any>;
  @ViewChild('attEditDialog', { static: true }) attEditDialog!: TemplateRef<any>;
  @ViewChild('attNewDialog', { static: true }) attNewDialog!: TemplateRef<any>;
  @ViewChild('addEditDialog', { static: true }) addEditDialog!: TemplateRef<any>;
  @ViewChild('dedEditDialog', { static: true }) dedEditDialog!: TemplateRef<any>;

  @ViewChild(MatSort) empSort!: MatSort;

  openDialogEditEmp(input: any) {
    this.dialog.open(this.empDialog, { data: input });
  }

  openDialogNewEmp() {
    var input = {}
    this.dialog.open(this.empNewDialog, { data: input });
  }

  openDialogAttEdit(input: any) {
    this.dialog.open(this.attEditDialog, { data: input });
  }

  openDialogAttNew() {
    var input = {}
    this.dialog.open(this.attNewDialog, { data: input });
  }

  openDialogAddEdit(input: any) {
    this.dialog.open(this.addEditDialog, { data: input });
  }

  openDialogDedEdit(input: any) {
    this.dialog.open(this.dedEditDialog, { data: input });
  }


  //OOP
  isLoaded: boolean = false;

  async loadOnLoop() {

    //Event Loop Starts Here    
    this.checkIfMobile();

    this.loadTab(this.activeTab);
    this.getStatus();  

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

        this.getEmployees();
        this.getStatus();

        await this.delay(1000);
        this.isLoadedTab = true;
        

        break;

      case 1:

        this.isLoadedTab = false;

        this.getEmployees();
        this.setupDate();
        this.fillAttendanceTable()
        this.getAttendance()

        await this.delay(1000);
        this.isLoadedTab = true;

        break;

      case 2:

        this.isLoadedTab = false;

        this.getEmployees();
        this.setupDate();
        this.fillAttendanceTable()
        this.getAttendance()

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

  //FunctionS

  toggleArchive() {
    if (this.isToggleArchive) {
      this.isToggleArchive = false
    }
    else {
      this.isToggleArchive = true
    }

    this.getEmployees
  }

  //Employees

  employeesPayload: any;
  employeesData: Employee[] = [];
  employeesDataSource = new MatTableDataSource(this.employeesData);
  employeesDisplayedColumns = ['emp_name', 'emp_number', 'emp_id', 'emp_age', 'emp_address', 'emp_position', 'emp_department', 'emp_rate', 'emp_rate_type', 'emp_role', 'emp_status', 'actions'];

  isToggleArchive = false

  getEmployees() {

    this.dataService.get('employees/get')
      .subscribe((data) => {

        console.log(data)

        this.employeesPayload = data;
        this.employeesData = this.employeesPayload.data;

        if (this.isToggleArchive == false) {
          let array: any[] = [];
          this.employeesData.map((data) => { if (data.isArchive != 1) { array.push(data) } })
          this.employeesData = array
          console.log(array)
        }
        else {
          this.employeesData = this.employeesPayload.data
          
        }    
        
        this.employeesDataSource.data = this.employeesData
        this.employeesDataSource.paginator = this.empPaginator
        this.employeesDataSource.sort = this.empSort
      });
  }
  

  timePayload: any;
  timeData: Time[] = []

  getStatus() {

    this.dataService.get('times/get')
      .subscribe((data) => {
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

  newEmp(input : any) {

    delete input.password2

    this.dataService.post('employees/signup', { data: input }).subscribe((data) => {
      console.log(data)

      this.getEmployees()

    })

  }

  editEmp(input: any) {

    this.dataService.patch('employees/edit', { data: input }).subscribe((data) => {
      console.log(data)

      this.getEmployees()
    })

  }

  archiveEmp(input: any) {

    input.isArchive = 1;

    this.dataService.patch('employees/edit', { data: input }).subscribe((data) => {
      console.log(data)

      this.getEmployees()
    })

  }

  deleteEmp(input : any) {

    this.dataService.delete(`employees/delete/${input._id}`)
      .subscribe((data: any) => {

        if (data.code == 200) {
        }
        else {
        }

        this.getEmployees()

      })

  }
  

  calendarDisplayedColumns: any[] = [];

  fillAttendanceTable() {
    
    this.calendarDisplayedColumns = []
    this.calendarDisplayedColumns.push("emp_name")
    this.calendarDisplayedColumns.push("emp_id")
    this.calendarDisplayedColumns.push("emp_rate_type")
    this.calendarDisplayedColumns = this.calendarDisplayedColumns.concat(this.daysArray)
    this.calendarDisplayedColumns.push("total")

  }

  fillPayrollTable() {

    this.calendarDisplayedColumns = []
    this.calendarDisplayedColumns.push("emp_name")
    this.calendarDisplayedColumns.push("emp_id")
    this.calendarDisplayedColumns.push("emp_rate_type")
    this.calendarDisplayedColumns.push("emp_rate")
    this.calendarDisplayedColumns = this.calendarDisplayedColumns.concat(this.daysArray)       
    this.calendarDisplayedColumns.push("total")

  }

  buildJSON() {
    let Obj: any = []
    this.employeesData.map((emp) => {

      let json

      if (emp.emp_fname == undefined) {
        emp.emp_fname = " "
      }
      if (emp.emp_lname == undefined) {
        emp.emp_lname = " "
      }

      let emp_name = emp.emp_fname + ' ' + emp.emp_lname

      json = { emp_id: emp.emp_id, emp_name: emp_name, emp_rate: emp.emp_rate, emp_rate_type: emp.emp_rate_type, attendance: this.buildDays(emp.emp_id), total: this.getTotal(emp.emp_id), emp_salary: this.getSalary(emp.emp_rate, emp.emp_rate_type, this.getTotal(emp.emp_id)) }

      Obj.push(json)
    })

    console.log(Obj)

    return Obj
  }

  getTotal(emp: any) {  

    let total = 0

    this.attendanceData.map((atten) => {

      if (atten.atten_date != null || atten.atten_date != undefined) {

        let date = this.datepipe.transform(new Date(atten.atten_date), 'YYYY-MM-dd')
        this.daysArray.map((days) => {
          if (emp == atten.atten_emp_id && date == days) {
            total = total + atten.atten_seconds
          }
        })

      }

      

      })      

    return total
  }

  getSalary(emp_rate: any, emp_rate_type: any, total: any) {

    let salary = 0

    let days = this.daysArray.length

    switch (emp_rate_type) {
      case "daily":
        salary = Math.floor(total / 8) * emp_rate
        break
      case "weekly":
        salary = (Math.floor(days / 7)) * emp_rate
        break
      case "monthly":
        salary = (Math.floor(days / 28)) * emp_rate
        break
     default:

    }

    if (isNaN(salary)) {
      salary = 0
    }  

    return salary 
  }

  buildDays(emp: any) {
    let Obj: any = []
    this.daysArray.map((days) => {
      let json
      json = { hours: this.buildHours(days, emp), date: days }
      Obj.push(json)
    })
    return Obj
  }

  buildHours(day: any, emp: any) {
    let hours = 0
    this.attendanceData.map((atten) => {

      if (atten.atten_date != null || atten.atten_date != undefined) {
      let date = this.datepipe.transform(new Date(atten.atten_date), 'YYYY-MM-dd')
          if (emp == atten.atten_emp_id && day == date) {
              hours = hours + atten.atten_seconds
        
          }
          else {
          }
      }

      

      
    })
    return hours
  }

  getName(id: any) {

    let name = ''

    this.employeesData.map((data) => {
      if (data.emp_id == id) {
        name = data.emp_fname + " " + data.emp_lname
      }

    })

    return name

  }

  formatAtt() {

    this.attendanceData.map((data) => {      

      data.atten_emp_name = this.getName(data.atten_emp_id)

      data.atten_seconds = Math.floor(Number(data.atten_seconds) / 3600000)

    })



  }

  attendancePayload: any;
  attendanceData: Attendance[] = [];
  attendanceDataSource = new MatTableDataSource(this.attendanceData);
  attendanceDisplayedColumns = ['emp_name', 'emp_id', 'emp_date', 'emp_hours', 'actions'];

  calendarData: any[] = []
  calendarDataSource = new MatTableDataSource(this.calendarData);

  getAttendance() {

    this.calendarData = []

    this.dataService.get('attendances/get').subscribe((data: any) => {
      console.log(data)

      this.attendancePayload = data;
      this.attendanceData = this.attendancePayload.data;
      this.formatAtt()

      
      this.attendanceDataSource.data = this.attendanceData
      this.attendanceDataSource.paginator = this.timePaginator

      this.calendarData = []
      this.calendarData = this.buildJSON()
      this.calendarDataSource.data = this.calendarData
      this.calendarDataSource.paginator = this.attPaginator

      this.setupDate()

    })   
  }

  editAtt(input: any) {

    input.atten_seconds = Number(input.atten_seconds * 3600000)

    this.dataService.patch('attendances/edit', { data: input })
      .subscribe((data) => {
        console.log(data)

        this.getAttendance()

    })

  }

  newAtt(input: any) {    

    input.atten_seconds = Number(input.atten_seconds * 3600000)

    this.dataService.post('attendances/new', { data: input })
      .subscribe((data) => {
        console.log(data)

        this.getAttendance()

    })

  }

  archiveAtt(input: any) {

    input.isArchive = 1;

    this.dataService.patch('attendances/edit', { data: input }).subscribe((data) => {
      console.log(data)

      this.getAttendance()
    })

  }

  deleteAtt(input: any) {

    this.dataService.delete(`attendances/delete/${input._id}`)
      .subscribe((data: any) => {

        if (data.code == 200) {
        }
        else {
        }

        this.getAttendance()

      })

  }

  payrollData: any[] = []
  payrollDataSource = new MatTableDataSource(this.payrollData)
  payrollDisplayedColumns = ['emp_name', 'emp_id', 'emp_rate', 'emp_rate_type', 'emp_addition', 'emp_deduction', 'total', 'computed']

  payrollLoaded = false;

  async makePayroll() {

    this.payrollLoaded = false;

    this.buildPayroll(this.calendarDataSource.filteredData)

    

    /*console.log(this.calendarDataSource.filteredData)*/

    this.payrollLoaded = true;

  }  

  buildPayroll(data: any[]) {

    console.log(data)

    let payrollData: any[] = data

    payrollData.map((content: any) => {

      delete content.attendance 
      content.emp_addition = 0
      content.emp_deduction = 0
      content.computed = content.emp_salary

    })

    console.log(payrollData)


    this.payrollDataSource.data = payrollData
    this.calculateGrossTotal()

    
    //console.log(this.payrollDataSource.data)   

    
  }

  addAddition(data: any) {

    this.payrollData = this.payrollDataSource.data

    this.payrollData.map((content) => {
      if (content.emp_id == data.emp_id) {
        content.computed = Number(content.emp_salary) + Number(content.emp_addition)
      }
    })

    this.payrollDataSource.data = this.payrollData

    this.calculateGrossTotal()

  }

  addDeduction(data: any) {

    this.payrollData = this.payrollDataSource.data

    this.payrollData.map((content) => {

      if (content.emp_id == data.emp_id) {
        content.computed = Number(content.emp_salary) - Number(content.emp_deduction)

      }

    })

    this.payrollDataSource.data = this.payrollData

    this.calculateGrossTotal()

  }

  grossTotal = 0

  calculateGrossTotal() {

    this.payrollData = this.payrollDataSource.data

    this.payrollData.map((content) => {

      if (content.computed == undefined || content.computed == '') {
        content.computed = 0
      }
      this.grossTotal = this.grossTotal + Number(content.computed)

    })

  }

  editPay(input: any) {

    this.dataService.patch('payrolls/edit', { data: input })
      .subscribe((data) => {
        console.log(data)

      })

  }

  newPay(input: any) {

    this.dataService.post('payrolls/new', { data: input })
      .subscribe((data) => {
        console.log(data)

      })

  }

  archivePay(input: any) {

    input.isArchive = 1;

    this.dataService.patch('payrolls/edit', { data: input })
      .subscribe((data) => {
      console.log(data)
    })

  }

  deletePay(input: any) {

    this.dataService.delete(`payrolls/delete/${input._id}`)
      .subscribe((data: any) => {

        if (data.code == 200) {
        }
        else {
        }

      })

  }

  //onPrint() {
  //  let printContents = document.getElementById('print').innerHTML;
  //  const originalContents = document.body.innerHTML;
  //  document.body.innerHTML = printContents;
  //  window.print();
  //  document.body.innerHTML = originalContents;
  //}

  

  



































  applyFilterEmp(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeesDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterCalendar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.calendarDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterTimeIn(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.attendanceDataSource.filter = filterValue.trim().toLowerCase();
  }




  getTotalTime() {

  }

  getFirstDayMonth() {

    let day = this.libraryService.getFirstDayMonth()
    return day

  }

  getLastDayMonth() {
    return this.libraryService.getLastDayMonth()
  }


  getDays() {

  }

  getMonths() {

  }

  startDate = this.getFirstDayMonth()

  endDate = this.getLastDayMonth()


  setupDate() {

    this.getDaysArray()

  }

  daysArray: any[] = []

  getDaysArray() {

    this.daysArray = this.libraryService.generateDaysArray(this.startDate, this.endDate)
    
    

  }

}
