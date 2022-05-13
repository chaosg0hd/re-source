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

import { Announcement, Employee, Task_Board, Inventory, Attendance, Time, File, Gallery, Payroll, Purchase, Petty_Cash, Revenue, Sale } from 'src/app/services/data/data.model';
import { Data } from '@angular/router';

//import { AddExpensesComponent } from './add-expenses/add-expenses.component';
//import { AddRevenuesComponent } from './add-revenues/add-revenues.component';
//import { AddSalessComponent } from './add-saless/add-saless.component';
//import { AddPurchaseFinanceComponent } from './add-purchase-finance/add-purchase-finance.component';
//import { EditRevenuesComponent } from './edit-revenues/edit-revenues.component';
//import { EditExpensesComponent } from './edit-expenses/edit-expenses.component';
//import { AddPettyCashComponent } from './add-petty-cash/add-petty-cash.component';
//import { ViewPettyCashComponent } from './view-petty-cash/view-petty-cash.component';
//import { EditPettyCashComponent } from './edit-petty-cash/edit-petty-cash.component';
//import { ViewRevenuesComponent } from './view-revenues/view-revenues.component';
//import { ViewExpensesComponent } from './view-expenses/view-expenses.component';


export interface PettyCashData {
  number: number;
  id: string;
  _id: string;

  pet_date: any;
  pet_desc: string;
  pet_amount: number;
  pet_by: string;

  isArchive: number;
  created_at: any;
  updated_at: any;
}

export interface RevenuesData {
  number: number;
  id: string;
  _id: string;

  rev_date: any;
  rev_supplier: string;
  rev_desc: string;
  rev_by: string;
  rev_amount: number;

  isArchive: number;
  created_at: any;
  updated_at: any;
}

export interface ExpensesData {
  number: number;
  id: string;
  _id: string;

  exp_date: any;
  exp_supplier: string;
  exp_desc: string;
  exp_by: string;
  exp_amount: number;

  isArchive: number;
  created_at: any;
  updated_at: any;
}

export interface PurchasesData {
  number: number;
  id: string;
  _id: string;

  purc_date: any;
  purc_supplier: string;
  purc_price: number;
  purc_quantity: number;
  purc_desc: string;
  purc_by: string;

  isArchive: number;
  created_at: any;
  updated_at: any;
}

export interface SalesData {
  number: number;
  id: string;
  _id: string;

  sales_date: any;
  sales_supplier: string;
  sales_price: number;
  sales_quantity: number;
  sales_desc: string;
  sales_by: string;

  isArchive: number;
  created_at: any;
  updated_at: any;
}

export interface PayrollData {
  number: number;
  id: string;
  _id: string;

  payr_date: any;
  payr_supplier: string;
  payr_desc: string;
  payr_by: string;
  payr_amount: number;

  isArchive: number;
  created_at: any;
  updated_at: any;
}

export interface GraphData {
  date: any;
  amount: number;
  type: any;
}


//SAMPLE

//export interface PettyCashStartData {
//  number: number;
//  id: string;
//  _id: string;

//  pet_date: Date;
//  pet_amount: number;

//  isArchive: number;
//  created_at: Date;
//  updated_at: Date;
//}

const PETSTART: number = 100000;

const PET_DATA: PettyCashData[] = [
  { number: 1, id: "123242512321", _id: '2021022', pet_date: "2022-01-11T16:00:00.000+00:00", pet_amount: 10000, pet_desc: "Contract Fees", pet_by: "Position", isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "123242512321", _id: '2021022', pet_date: "2022-02-11T16:00:00.000+00:00", pet_amount: 10000, pet_desc: "Contract Fees", pet_by: "Position", isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "123242512321", _id: '2021022', pet_date: "2022-03-11T16:00:00.000+00:00", pet_amount: 10000, pet_desc: "Contract Fees", pet_by: "Position", isArchive: 0, created_at: "20011201", updated_at: "20011201" },
];


const REV_DATA: RevenuesData[] = [
  { number: 1, id: "123242512321", _id: '2021022', rev_date: "2022-01-11T16:00:00.000+00:00", rev_supplier: "Bob the Builder", rev_desc: "Contract Fees", rev_by: "Position", rev_amount: 10000, isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "123242512321", _id: '2021022', rev_date: "2022-02-11T16:00:00.000+00:00", rev_supplier: "Bob the Builder", rev_desc: "Contract Fees", rev_by: "Position", rev_amount: 10000, isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "123242512321", _id: '2021022', rev_date: "2022-03-11T16:00:00.000+00:00", rev_supplier: "Bob the Builder", rev_desc: "Contract Fees", rev_by: "Position", rev_amount: 10000, isArchive: 0, created_at: "20011201", updated_at: "20011201" },
];

const SALES_DATA: SalesData[] = [
  { number: 1, id: "123242512321", _id: '2021022', sales_date: "2022-01-11T16:00:00.000+00:00", sales_supplier: "Bob the Builder", sales_price: 10, sales_quantity: 133, sales_desc: "Sales", sales_by: "Position", isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "123242512321", _id: '2021022', sales_date: "2022-02-11T16:00:00.000+00:00", sales_supplier: "Bob the Builder", sales_price: 100, sales_quantity: 1333, sales_desc: "Sales", sales_by: "Position", isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "123242512321", _id: '2021022', sales_date: "2022-03-11T16:00:00.000+00:00", sales_supplier: "Bob the Builder", sales_price: 100, sales_quantity: 1233, sales_desc: "Sales", sales_by: "Position", isArchive: 0, created_at: "20011201", updated_at: "20011201" },
];

const EXPE_DATA: ExpensesData[] = [
  { number: 1, id: "123242512321", _id: '2021022', exp_date: "2022-01-11T16:00:00.000+00:00", exp_supplier: "Bob The Builder", exp_desc: "Rent", exp_by: "Position", exp_amount: 30000, isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "123242512321", _id: '2021022', exp_date: "2022-02-11T16:00:00.000+00:00", exp_supplier: "Bob The Builder", exp_desc: "Rent", exp_by: "Position", exp_amount: 30000, isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "123242512321", _id: '2021022', exp_date: "2022-03-11T16:00:00.000+00:00", exp_supplier: "Bob The Builder", exp_desc: "Rent", exp_by: "Position", exp_amount: 30000, isArchive: 0, created_at: "20011201", updated_at: "20011201" },

];

const PURC_DATA: PurchasesData[] = [
  { number: 1, id: "123242512321", _id: '2021022', purc_date: "2022-01-11T16:00:00.000+00:00", purc_supplier: "any", purc_price: 10, purc_quantity: 102, purc_desc: "Stock", purc_by: "Position", isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "123242512321", _id: '2021022', purc_date: "2022-02-11T16:00:00.000+00:00", purc_supplier: "any", purc_price: 100, purc_quantity: 102, purc_desc: "Stock", purc_by: "Position", isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "123242512321", _id: '2021022', purc_date: "2022-03-11T16:00:00.000+00:00", purc_supplier: "any", purc_price: 100, purc_quantity: 1212, purc_desc: "Stock", purc_by: "Position", isArchive: 0, created_at: "20011201", updated_at: "20011201" },

];

const PAYR_DATA: PayrollData[] = [
  { number: 1, id: "123242512321", _id: '2021022', payr_date: "2022-01-11T16:00:00.000+00:00", payr_supplier: "Wage", payr_desc: "Wage", payr_by: "Position", payr_amount: 20000, isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "123242512321", _id: '2021022', payr_date: "2022-02-11T16:00:00.000+00:00", payr_supplier: "Wage", payr_desc: "Wage", payr_by: "Position", payr_amount: 20000, isArchive: 0, created_at: "20011201", updated_at: "20011201" },
  { number: 1, id: "123242512321", _id: '2021022', payr_date: "2022-03-11T16:00:00.000+00:00", payr_supplier: "Wage", payr_desc: "Wage", payr_by: "Position", payr_amount: 20000, isArchive: 0, created_at: "20011201", updated_at: "20011201" },
];

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
  constructor
    (
      private matDialog: MatDialog,
      private dataService: DataService,
      private libraryService: LibraryService
    ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadOnLoop()
    //this.resetBal();
    //this.load();   

    /*this.dataSource.paginator = this.paginator;*/
  }









  //TOO LAZY TO DO PROPERLY

  balJan: number = 0
  balFeb: number = 0
  balMar: number = 0
  balApr: number = 0
  balMay: number = 0
  balJun: number = 0
  balJul: number = 0
  balAug: number = 0
  balSep: number = 0
  balOct: number = 0
  balNov: number = 0
  balDec: number = 0

  resetBal() {

    this.balJan = 0
    this.balFeb = 0
    this.balMar = 0
    this.balApr = 0
    this.balMay = 0
    this.balJun = 0
    this.balJul = 0
    this.balAug = 0
    this.balSep = 0
    this.balOct = 0
    this.balNov = 0
    this.balDec = 0

  }

  /*OOP*/

  isLoaded: boolean = false;

  async loadOnLoop() {

    //Event Loop Starts Here

    await this.delay(1000);
    this.checkIfMobile();



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

  //async load() {
  //  this.isLoaded = false;
  //  await this.delay(1000);


  //  //Event Loop Starts Here

  //  this.checkIfMobile();

  //  //this.resetBal();

  //  ///*this.setPettySample();*/

  //  //this.getPettyStartCash();

  //  //this.getPettyCash();
  //  //this.getRevenues();
  //  //this.getSales();
  //  //this.getExpenses();
  //  //this.getPurchases();
  //  //this.getPayroll();

  //  //this.getRevenuesData();
  //  //this.getSalesData();
  //  //this.getExpensesData();
  //  //this.getPurchasesData();
  //  //this.getPayrollData();

  //  //this.mergeRevGraphData();
  //  //this.mergeExpGraphData();

  //  //this.graphVar = [];

  //  this.isLoaded = true;
  //  //Event Loop End Here
  //}


  applyFilterExpenses(filterValue: string) {
    this.expensesDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterSales(filterValue: string) {
    this.salesDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterRevenues(filterValue: string) {
    this.revenuesDataSource.filter = filterValue.trim().toLowerCase();
  }

  //DECLARATIONS

  //PETTY CASH

  pettyCashPayload: any;
  pettyCashData: PettyCashData[] = [];
  pettyCashDataSource = new MatTableDataSource(this.pettyCashData);
  pettyCashDisplayedColumns = ['number', 'id', 'pet_date', 'pet_desc' , 'pet_amount', 'pet_by', 'actions'];
  pettyCashIdArchive: any;

  //REVENUES

  revenuesPayload: any;
  revenuesData: RevenuesData[] = [];
  revenuesDataSource = new MatTableDataSource(this.revenuesData);
  revenuesDisplayedColumns: string[] = ['number', '_id', 'rev_date', 'rev_desc', 'rev_by', 'rev_amount', 'rev_supplier', 'actions'];
  revenuesDataIsArchived: any;

  salesPayload: any;
  salesData: SalesData[] = [];
  salesDataSource = new MatTableDataSource(this.salesData);
  salesDisplayedColumns: string[] = ['number', '_id', 'sales_date', 'sales_desc', 'sales_by', 'sales_amount', 'sales_supplier', 'actions'];
  salesDataIsArchived: any;

  //EXPENSES

  expensesPayload: any;
  expensesData: ExpensesData[] = [];
  expensesDataSource = new MatTableDataSource(this.expensesData);
  expensesDisplayedColumns: string[] = ['number', '_id', 'exp_date', 'exp_desc', 'exp_by', 'exp_amount', 'actions'];
  expensesDataIsArchived: any;

  purchasesPayload: any;
  purchasesData: PurchasesData[] = [];
  purchasesDataSource = new MatTableDataSource(this.purchasesData);
  purchasesDisplayedColumns: string[] = ['number', '_id', 'purc_date', 'purc_desc', 'purc_by', 'purc_amount', 'purc_supplier', 'actions'];
  purchasesDataIsArchived: any;

  payrollPayload: any;
  payrollData: PayrollData[] = [];
  payrollDataSource = new MatTableDataSource(this.payrollData);
  payrollDisplayedColumns = ['number', '_id', 'payr_date', 'payr_desc', 'payr_by', 'payr_amount', 'payr_supplier', 'actions'];
  payrollDataIsArchived: any;

  //FUNCTIONS

  //PETTY CASH

 
  setPettySample() {
    this.setPettyStartCash(PETSTART);
  }

  setAmountPet!: number;

  setPettyStartCash(amount: number) {
    localStorage.setItem('StartPetty', amount.toString());
    this.getPettyStartCash();
    this.computePettyCash();
  }

  pettyCashStart: number = 0;
  pettyCash: number = 0;

  getPettyStartCash() {
    this.pettyCashStart = (Number(localStorage.getItem('StartPetty')));
  }

  getPettyCash() {

    this.pettyCashData = PET_DATA;
    this.pettyCashDataSource.data = this.pettyCashData;

    //this.dataService.getAllItem('pettycash').subscribe((data: any) => {
    //  this.pettyCashPayload = data;
    //  console.log(this.pettyCashPayload);
    //  this.pettyCashData = this.pettyCashPayload;
    //  this.pettyCashDataSource.data = this.pettyCashPayload;
    //});

    this.computePettyCash()

  }

  computePettyCash() {

    let pettycashData = this.pettyCashData;

    this.pettyCash = this.pettyCashStart

    for (var data of pettycashData) {
      console.log(data.pet_amount)
      this.pettyCash = this.pettyCash + data.pet_amount
    }


  }

  transData: any = {};
  transPerson: any;
  transCashFlow: any;
  transAmount: any;
  transDesc: any;
  selected: any;
  countPetty: any;
  countPettyCash () {
    this.dataService.get('finance/pettycash/get').subscribe((data:any) => {
      this.countPetty = data.length + 1;
    })
  }
  addTransaction() {
    // const dialogRef = this.matDialog.open(AddPettyCashComponent, {
    //   height: '75%',
    //   width: '100%'
    // });

    // dialogRef.afterClosed().subscribe(() => this.getPettyCash());
    this.countPettyCash();
    this.transData.pet_by = this.transPerson;
    if(this.selected == 'deduct') {
      this.transData.pet_amount = (this.transAmount) * (-1)
    } else {
      this.transData.pet_amount = this.transAmount;
    }
    this.transData.isArchive = 0;
    this.transData.pet_desc = this.transDesc;
    this.transData.number = this.countPetty;
    console.log(this.selected);
    console.log(this.transData.pet_amount)

    // this.dataService.createItem('transaction', this.transData).subscribe((data: any) => {
    //   console.log(data);
    // })

    Swal.fire(
      'Item Added!',
      '',
      'success'
    )
    this.dataService.post('finance/pettycash/new', this.transData).subscribe((data: any) => {
      console.log(data);
      this.getPettyCash();
      this.transDesc = this.transAmount = this.transCashFlow = this.transPerson = ''
    })
    
    }

  //viewPettyCash(pettyCash: any) {
  //  const dialogRef = this.matDialog.open(ViewPettyCashComponent, {
  //    height: '75%',
  //    width: '100%',
  //    data: pettyCash
  //  });

  //  dialogRef.afterClosed().subscribe(() => this.getPettyCash());
  //}

  //editPettyCash(pettyCash: any) {
  //  const dialogRef = this.matDialog.open(EditPettyCashComponent, {
  //    height: '75%',
  //    width: '100%',
  //    data: pettyCash
  //  });

  //  dialogRef.afterClosed().subscribe(() => this.getPettyCash());
  //}

  //archivePettyCash(_id: any) {
  //  Swal.fire({
  //    title: 'Are you sure?',
  //    text: "You won't be able to revert this!",
  //    icon: 'warning',
  //    showCancelButton: true,
  //    confirmButtonColor: '#3085d6',
  //    cancelButtonColor: '#d33',
  //    confirmButtonText: 'Yes, delete it!'
  //  }).then((result) => {
  //    if (result.isConfirmed) {
  //      Swal.fire(
  //        'Deleted!',
  //        'Your file has been deleted.',
  //        'success'
  //      )
  //      this.pettyCashIdArchive = _id;
  //      this.dataService.patch('pettycash', this.pettyCashIdArchive, { "isArchive": 1 }).subscribe((data: any) => {
  //        console.log(data);
  //      });
  //      this.getPettyCash();
  //    }
  //  })
  //}

  //REVENUES and SALES 

  getRevenues() {

    this.revenuesData = REV_DATA;
    this.revenuesDataSource.data = this.revenuesData;

    //this.dataService.getAllItem("revenues").subscribe((data: any) => {
    //  this.revenuesPayload = data
    //  console.log(this.revenuesPayload);
    //  this.revenuesData = this.revenuesPayload;
    //  this.revenuesDataSource.data = this.revenuesData;  
    //});
  }



  getSales() {

    this.salesData = SALES_DATA;
    this.salesDataSource.data = this.salesData;



    //this.dataService.getAllItem("sales").subscribe((data: any) => {
    //  this.salesPayload = data
    //  console.log(this.salesPayload);
    //  this.salesData = this.salesPayload;
    //  this.salesDataSource.data = this.salesData;
    //});    
  }  

  //addRevenues() {
  //  const dialogRef = this.matDialog.open(AddRevenuesComponent, {
  //    height: '75%',
  //    width: '100%'
  //  });

  //  dialogRef.afterClosed().subscribe(() => this.getRevenues());
  //}

  //viewRevenues(revenues: any) {
  //  const dialogRef = this.matDialog.open(ViewRevenuesComponent, {
  //    height: '75%',
  //    width: '100%',
  //    data: revenues
  //  });

  //  dialogRef.afterClosed().subscribe(() => this.getRevenues());
  //}

  //editRevenues(revenues: any) {
  //  const dialogRef = this.matDialog.open(EditRevenuesComponent, {
  //    height: '75%',
  //    width: '100%',
  //    data: revenues
  //  });

  //  dialogRef.afterClosed().subscribe(() => { this.getRevenues() });
  //  //this.getRevenues(), this.load()
  //}

  //archiveRevenues(_id: any) {
  //  Swal.fire({
  //    title: 'Are you sure?',
  //    text: "You won't be able to revert this!",
  //    icon: 'warning',
  //    showCancelButton: true,
  //    confirmButtonColor: '#3085d6',
  //    cancelButtonColor: '#d33',
  //    confirmButtonText: 'Yes, delete it!'
  //  }).then((result) => {
  //    if (result.isConfirmed) {
  //      Swal.fire(
  //        'Archived!',
  //        'Your file has been archived.',
  //        'success'
  //      )
  //      this.revenuesDataIsArchived = _id;
  //      this.dataService.archiveItem('revenues', this.revenuesDataIsArchived, { "isArchive": 1 }).subscribe((data: any) => {
  //        console.log(data);
  //      });
  //      this.getRevenues();
  //    }
  //  })
  //}
  

  getExpenses() {
    this.expensesData = EXPE_DATA;
    this.expensesDataSource.data = this.expensesData;

    //this.dataService.getAllItem("expenses").subscribe((data: any) => {
    //  this.expensesPayload = data;
    //  console.log(this.expensesPayload);
    //  this.expensesData = this.expensesPayload;
    //  this.expensesDataSource.data = this.expensesData;
    //});
  }

  getPurchases() {
    this.purchasesData = PURC_DATA;
    this.purchasesDataSource.data = this.purchasesData;

    //this.dataService.getAllItem("expenses").subscribe((data: any) => {
    //  this.expensesPayload = data;
    //  console.log(this.expensesPayload);
    //  this.expensesData = this.expensesPayload;
    //  this.expensesDataSource.data = this.expensesData;
    //});
  }

  getPayroll() {
    this.payrollData = PAYR_DATA;
    this.payrollDataSource.data = this.payrollData;

    //this.dataService.getAllItem("expenses").subscribe((data: any) => {
    //  this.expensesPayload = data;
    //  console.log(this.expensesPayload);
    //  this.expensesData = this.expensesPayload;
    //  this.expensesDataSource.data = this.expensesData;
    //});
  }

  //addExpenses() {
  //  const dialogRef = this.matDialog.open(AddExpensesComponent, {
  //    height: '75%',
  //    width: '100%'
  //  });

  //  dialogRef.afterClosed().subscribe(() => this.getExpenses());
  //}

  //viewExpenses(expenses: any) {
  //  const dialogRef = this.matDialog.open(ViewExpensesComponent, {
  //    height: '75%',
  //    width: '100%',
  //    data: expenses
  //  });

  //  dialogRef.afterClosed().subscribe(() => this.getExpenses());
  //}

  //editExpenses(expenses: any) {
  //  const dialogRef = this.matDialog.open(EditExpensesComponent, {
  //    height: '75%',
  //    width: '100%',
  //    data: expenses
  //  });

  //  dialogRef.afterClosed().subscribe(() => this.getExpenses());
  //}

  //archiveExpenses(_id: any) {
  //  Swal.fire({
  //    title: 'Are you sure?',
  //    text: "You won't be able to revert this!",
  //    icon: 'warning',
  //    showCancelButton: true,
  //    confirmButtonColor: '#3085d6',
  //    cancelButtonColor: '#d33',
  //    confirmButtonText: 'Yes, delete it!'
  //  }).then((result) => {
  //    if (result.isConfirmed) {
  //      Swal.fire(
  //        'Archived!',
  //        'Your file has been archived.',
  //        'success'
  //      )
  //      this.expensesDataIsArchived = _id;
  //      this.dataService.archiveItem('expenses', this.expensesDataIsArchived, { "isArchive": 1 }).subscribe((data: any) => {
  //        console.log(data);
  //      });
  //      this.getExpenses();
  //      /*this.load();*/
  //    }
  //  })
  //}

  //GRAPH

  //PUSH DATA

  graphVar: any = {};

  revenuesDataGraph: GraphData[] = []

  getRevenuesData() {
    this.revenuesDataGraph = []
    let revenuesData = this.revenuesData;
    for (var data of revenuesData) {
      this.graphVar.date = data.rev_date
      this.graphVar.amount = data.rev_amount
      this.graphVar.type = "rev"
      this.revenuesDataGraph.push(this.graphVar)
      console.log(this.graphVar)
      this.graphVar = [];
    }
  }

  salesDataGraph: GraphData[] = []

  getSalesData() {
    this.salesDataGraph = []
    let salesdata = this.salesData;
    for (var data of salesdata) {
      this.graphVar.date = data.sales_date
      this.graphVar.amount = data.sales_quantity * data.sales_price
      this.graphVar.type = "sales"
      this.salesDataGraph.push(this.graphVar)
      console.log(this.graphVar)
      this.graphVar = [];
    }
  }

  expensesDataGraph: GraphData[] = []

  getExpensesData() {
    this.expensesDataGraph = []
    let expensesData = this.expensesData;
    for (var data of expensesData) {
      this.graphVar.date = data.exp_date
      this.graphVar.amount = data.exp_amount
      this.graphVar.type = "exp"
      this.expensesDataGraph.push(this.graphVar)
      this.graphVar = [];
    }
  }

  purchasesDataGraph: GraphData[] = []

  getPurchasesData() {
    this.purchasesDataGraph = []
    let purchasesData = this.purchasesData;
    for (var data of purchasesData) {
      this.graphVar.date = data.purc_date
      this.graphVar.amount = data.purc_price * data.purc_quantity
      this.graphVar.type = "purc"
      this.purchasesDataGraph.push(this.graphVar)
      this.graphVar = [];
    }
  }

  payrollDataGraph: GraphData[] = []

  getPayrollData() {
    this.payrollDataGraph = []
    let payrollData = this.payrollData;
    for (var data of payrollData) {
      this.graphVar.date = data.payr_date
      this.graphVar.amount = data.payr_amount
      this.graphVar.type = "payr"
      this.payrollDataGraph.push(this.graphVar)
      this.graphVar = [];
    }
  }

  //Merge RevData

  graphRevData: GraphData[] = []

  mergeRevGraphData() {
    this.dataRevenues = [];
    this.graphRevData = this.revenuesDataGraph.concat(this.salesDataGraph);
    let graphrevdata = this.graphRevData;

    //HARD-CODING MONTHS HERE may better solutions pero fuck it

    var janRev = 0; var janSal = 0; var janNet = 0;
    var febRev = 0; var febSal = 0; var febNet = 0;
    var marRev = 0; var marSal = 0; var marNet = 0;
    var aprRev = 0; var aprSal = 0; var aprNet = 0;
    var mayRev = 0; var maySal = 0; var mayNet = 0;
    var junRev = 0; var junSal = 0; var junNet = 0;
    var julRev = 0; var julSal = 0; var julNet = 0;
    var augRev = 0; var augSal = 0; var augNet = 0;
    var sepRev = 0; var sepSal = 0; var sepNet = 0;
    var octRev = 0; var octSal = 0; var octNet = 0;
    var novRev = 0; var novSal = 0; var novNet = 0;
    var decRev = 0; var decSal = 0; var decNet = 0;

    var feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec = 0

    //for (var data of graphrevdata) {
    //  console.log("xxxxxxxxxxxxx" + this.libraryService.getMonth(data.date));

    //  if (this.libraryService.getMonth(data.date) == "01") {
    //    if (data.type === "rev") {
    //      janRev = janRev + data.amount;
    //    }
    //    if (data.type === "sales") {
    //      janSal = janSal + data.amount;
    //    }
    //    janNet = janNet + data.amount;
    //    console.log(janNet)
    //  }
    //  if (this.libraryService.getMonth(data.date) == "02") {
    //    if (data.type === "rev") {
    //      febRev = febRev + data.amount;
    //    }
    //    if (data.type === "sales") {
    //      febSal = febSal + data.amount;
    //    }
    //    febNet = febNet + data.amount;
    //  }
    //  if (this.libraryService.getMonth(data.date) == "03") {
    //    if (data.type === "rev") {
    //      marRev = marRev + data.amount;
    //    }
    //    if (data.type === "sales") {
    //      marSal = marSal + data.amount;
    //    }
    //    marNet = marNet + data.amount;
    //  }
    //  if (this.libraryService.getMonth(data.date) == "04") {
    //    if (data.type === "rev") {
    //      aprRev = aprRev + data.amount;
    //    }
    //    if (data.type === "sales") {
    //      aprSal = aprSal + data.amount;
    //    }
    //    aprNet = aprNet + data.amount;
    //  }
    //  if (this.libraryService.getMonth(data.date) == "05") {
    //    if (data.type === "rev") {
    //      mayRev = mayRev + data.amount;
    //    }
    //    if (data.type === "sales") {
    //      maySal = maySal + data.amount;
    //    }
    //    mayNet = mayNet + data.amount;
    //  }

    //}

    console.log("January", janRev, janSal, janNet)

    this.dataRevenues.push(["January", janRev, janSal, janNet]); this.balJan = janNet;
    this.dataRevenues.push(["February", febRev, febSal, febNet]); this.balFeb = febNet;
    this.dataRevenues.push(["March", marRev, marSal, marNet]); this.balMar = marNet;
    this.dataRevenues.push(["April", aprRev, aprSal, aprNet]); this.balApr = aprNet;
    this.dataRevenues.push(["May", mayRev, maySal, mayNet]); this.balMay = mayNet;
    this.dataRevenues.push(["June", mayRev, maySal, mayNet]); this.balJun = mayNet;
    this.dataRevenues.push(["July", mayRev, maySal, mayNet]); this.balJul = mayNet;
    this.dataRevenues.push(["August", mayRev, maySal, mayNet]); this.balAug = mayNet;
    this.dataRevenues.push(["September", mayRev, maySal, mayNet]); this.balSep = mayNet;
    this.dataRevenues.push(["October", mayRev, maySal, mayNet]); this.balOct = mayNet;
    this.dataRevenues.push(["November", mayRev, maySal, mayNet]); this.balNov = mayNet;
    this.dataRevenues.push(["December", mayRev, maySal, mayNet]); this.balDec = mayNet;
  }  

  graphExpData: GraphData[] = []

  mergeExpGraphData() {
    this.dataExpenses = [];
    //YEAH REMOVE LATER
    this.dataBalance = [];

    this.graphExpData = this.expensesDataGraph.concat(this.purchasesDataGraph.concat(this.payrollDataGraph));
    console.log(this.graphExpData);    

    //HARD-CODING MONTHS HERE may better solutions pero fuck it

    var janExp = 0; var janPurc = 0; var janPayr = 0; var janxNet = 0;
    var febExp = 0; var febPurc = 0; var febPayr = 0; var febxNet = 0;
    var marExp = 0; var marPurc = 0; var marPayr = 0; var marxNet = 0;
    var aprExp = 0; var aprPurc = 0; var aprPayr = 0; var aprxNet = 0;
    var mayExp = 0; var mayPurc = 0; var mayPayr = 0; var mayxNet = 0;

    let graphexpdata = this.graphExpData;
    //for (var data of graphexpdata) {
    //  console.log("xxxxxxxxxxxxx" + this.libraryService.getMonth(data.date));

    //  if (this.libraryService.getMonth(data.date) == "01") {
    //    if (data.type === "exp") {
    //      janExp = janExp + data.amount;
    //    }
    //    if (data.type === "purc") {
    //      janPurc = janPurc + data.amount;
    //    }
    //    if (data.type === "payr") {
    //      janPayr = janPayr + data.amount;
    //    }
    //    janxNet = janxNet + data.amount;
    //  }
    //  if (this.libraryService.getMonth(data.date) == "02") {
    //    if (data.type === "exp") {
    //      febExp = febExp + data.amount;
    //    }
    //    if (data.type === "purc") {
    //      febPurc = febPurc + data.amount;
    //    }
    //    if (data.type === "payr") {
    //      febPayr = febPayr + data.amount;
    //    }
    //    febxNet = febxNet + data.amount;
    //  }
    //  if (this.libraryService.getMonth(data.date) == "03") {
    //    if (data.type === "exp") {
    //      marExp = marExp + data.amount;
    //    }
    //    if (data.type === "purc") {
    //      marPurc = marPurc + data.amount;
    //    }
    //    if (data.type === "payr") {
    //      marPayr = marPayr + data.amount;
    //    }
    //    marxNet = marxNet + data.amount;
    //  }
    //  if (this.libraryService.getMonth(data.date) == "04") {
    //    if (data.type === "exp") {
    //      aprExp = aprExp + data.amount;
    //    }
    //    if (data.type === "purc") {
    //      aprPurc = aprPurc + data.amount;
    //    }
    //    if (data.type === "payr") {
    //      aprPayr = aprPayr + data.amount;
    //    }
    //    aprxNet = aprxNet+ data.amount;
    //  }
    //  if (this.libraryService.getMonth(data.date) == "05") {
    //    if (data.type === "exp") {
    //      mayExp = mayExp + data.amount;
    //    }
    //    if (data.type === "purc") {
    //      mayPurc = mayExp + data.amount;
    //    }
    //    if (data.type === "payr") {
    //      mayPayr = mayExp + data.amount;
    //    }
    //    mayxNet = mayxNet + data.amount;
    //  }

    //}

    this.dataExpenses.push(["January", janExp, janPurc, janPayr, janxNet]); this.balJan = this.balJan - janxNet;
    this.dataExpenses.push(["February", febExp, febPurc, febPayr, febxNet]); this.balFeb = this.balFeb - febxNet;
    this.dataExpenses.push(["March", marExp, marPurc, marPayr, marxNet]); this.balMar = this.balMar - marxNet;
    this.dataExpenses.push(["April", aprExp, aprPurc, aprPayr, aprxNet]); this.balApr = this.balApr - aprxNet;
    this.dataExpenses.push(["May", mayExp, mayPurc, mayPayr, mayxNet]); this.balMay = this.balMay - mayxNet;
    this.dataExpenses.push(["June", mayExp, mayPurc, mayPayr, mayxNet]); this.balJun = this.balMay - mayxNet;
    this.dataExpenses.push(["July", mayExp, mayPurc, mayPayr, mayxNet]); this.balJun = this.balMay - mayxNet;
    this.dataExpenses.push(["August", mayExp, mayPurc, mayPayr, mayxNet]); this.balAug = this.balMay - mayxNet;
    this.dataExpenses.push(["September", mayExp, mayPurc, mayPayr, mayxNet]); this.balSep = this.balMay - mayxNet;
    this.dataExpenses.push(["October", mayExp, mayPurc, mayPayr, mayxNet]); this.balOct = this.balMay - mayxNet;
    this.dataExpenses.push(["November", mayExp, mayPurc, mayPayr, mayxNet]); this.balNov = this.balMay - mayxNet;
    this.dataExpenses.push(["December", mayExp, mayPurc, mayPayr, mayxNet]); this.balDec = this.balMay - mayxNet;

    // TOO LAZY TO DO THE RIGHT WAY

    var averageBal = 0
    averageBal = this.balJan + this.balFeb + this.balMar + this.balApr + (this.balMay * 7);

    this.dataBalance.push(["January", this.balJan + janxNet, janxNet * -1, this.balJan, averageBal]);
    this.dataBalance.push(["February", this.balFeb + febxNet, febxNet * -1, this.balFeb, averageBal]);
    this.dataBalance.push(["March", this.balMar + marxNet, marxNet * -1, this.balMar, averageBal]);
    this.dataBalance.push(["April", this.balApr + aprxNet, aprxNet * -1, this.balApr, averageBal]);
    this.dataBalance.push(["May", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
    this.dataBalance.push(["June", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
    this.dataBalance.push(["July", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
    this.dataBalance.push(["August", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
    this.dataBalance.push(["September", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
    this.dataBalance.push(["October", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
    this.dataBalance.push(["November", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
    this.dataBalance.push(["December", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);

    console.log(this.salesDataGraph)

  }

  //addSales() {
  //  const dialogRef = this.matDialog.open(AddSalessComponent, {
  //    height: '75%',
  //    width: '100%'
  //  });

  //  dialogRef.afterClosed().subscribe(() => this.getSales());
  //}

  //addPurchase() {
  //  const dialogRef = this.matDialog.open(AddPurchaseFinanceComponent, {
  //    height: '75%',
  //    width: '100%'
  //  });

  //  dialogRef.afterClosed().subscribe();
  //}

  //addPayroll() {
  //  const dialogRef = this.matDialog.open(AddPurchaseFinanceComponent, {
  //    height: '75%',
  //    width: '100%'
  //  });

  //  dialogRef.afterClosed().subscribe();
  //}

  loading = false;


  loadPurchasesPayload() {
    this.loading = true;
    this.dataService
  }


  //Graphs
  dynamicResize = true;

  titleRevenues = 'Revenues for the past months';
  typeRevenues = ChartType.ComboChart;
  dataRevenues: any =[];

   chartColumnsRevenues = ["Year","Non-Sale Revenues", "Sales Revenues", "Net Revenues"];
   optionsRevenues = {      
      hAxis: {
         title: 'Month'
      },
      vAxis:{
         title: 'Cash'
     },
     seriesType: 'bars',
     isStacked: true,
     animation: {
        startup: true,
        duration: 1000,
       easing: 'inAndOut'
     },
     series: { 2: { type: 'line' } },
     curveType: 'function', legend: { position: 'bottom' },
  };

  //Expenses
  titleExpenses = 'Expenses for the past months';
  typeExpenses = ChartType.ComboChart;
  dataExpenses: any = [];
  chartColumnsExpenses = ["Month", "General Expenses", "Stock Purchases", "Payroll Expenses", "Net Expenses"];
  optionsExpenses = {
    crosshair: { trigger: 'both' },
    hAxis: {
      title: 'Month'
    },
    vAxis: {
      title: 'Cash'
    },
    seriesType: 'bars',
    isStacked: true,
    animation: {
      startup: true,
      duration: 1000,
      easing: 'inAndOut'
    },
    series: { 3: { type: 'line' }},
    curveType: 'function', legend: { position: 'bottom' },
  };

  //Financial Balance
  titleBalance = 'Summary of Finances';
  typeBalance = ChartType.ComboChart;
  dataBalance: any = [];
  chartColumnsBalance = ["Month", "Revenues", "Expenses", "Balance", "Average Balance"];
  optionsBalance = {
    hAxis: {
      title: 'Month'
    },
    vAxis: {
      title: 'Cash'
    },
    seriesType: 'bars',
    isStacked: true,
    animation: {
      startup: true,
      duration: 1000,
      easing: 'inAndOut'
    },
    series: { 2: { type: 'line' }, 3: { type: 'line' }},
    curveType: 'function', legend: { position: 'bottom' },
  };

  //Sales
  titleSales = "Sales";
  typeSales = ChartType.Bar;
  chartColumnsSales = ["Cash", "AR", "AP"];
  dataSales = [
    ["2017", 5, 6],
    ["2018", 6, 5],
    ["2019", 8, 4],
    ["2020", 9, 3]
  ];

  

  //table
  displayedColumns: string[] = ['Description', 'Amount', 'Date', 'Noted By', 'Actions'];

}
