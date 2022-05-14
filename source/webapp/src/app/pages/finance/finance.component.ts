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

import { Announcement, Employee, Task_Board, Expense, Inventory, Attendance, Time, File, Gallery, Payroll, Purchase, Petty_Cash, Revenue, Sale } from 'src/app/services/data/data.model';
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
      private libraryService: LibraryService,
      private dialog: MatDialog,

    ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('revNewDialog', { static: true }) revNewDialog!: TemplateRef<any>;

  openDialogNewRev() {
    var input = {}
    this.dialog.open(this.revNewDialog, { data: input });
  }

  @ViewChild('revEditDialog', { static: true }) revEditDialog!: TemplateRef<any>;

  openDialogEditRev(input: any) {
    this.dialog.open(this.revEditDialog, { data: input });
  }



  //@ViewChild('empNewDialog', { static: true }) empNewDialog!: TemplateRef<any>;
  //@ViewChild('empNewDialog', { static: true }) empNewDialog!: TemplateRef<any>;
  //@ViewChild('empNewDialog', { static: true }) empNewDialog!: TemplateRef<any>;
  //@ViewChild('empNewDialog', { static: true }) empNewDialog!: TemplateRef<any>;

  //@ViewChild('empNewDialog', { static: true }) empNewDialog!: TemplateRef<any>;




  ngOnInit(): void {
    this.loadOnLoop()
    //this.resetBal();
    //this.load();   

    /*this.dataSource.paginator = this.paginator;*/
  }


  //OOP
  isLoaded: boolean = false;

  async loadOnLoop() {

    //Event Loop Starts Here    
    this.checkIfMobile();

    this.loadTab(this.activeTab);

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

        

        await this.delay(1000);
        this.isLoadedTab = true;


        break;

      case 1:

        this.isLoadedTab = false;

        
        this.getRevenues()

        await this.delay(1000);
        this.isLoadedTab = true;

        break;

      case 2:

        this.isLoadedTab = false;

        

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

  //FunctionS

  toggleArchive() {
    if (this.isToggleArchive) {
      this.isToggleArchive = false
    }
    else {
      this.isToggleArchive = true
    }

  }



  //applyFilterExpenses(filterValue: string) {
  //  this.expensesDataSource.filter = filterValue.trim().toLowerCase();
  //}

  //applyFilterSales(filterValue: string) {
  //  this.salesDataSource.filter = filterValue.trim().toLowerCase();
  //}

  //applyFilterRevenues(filterValue: string) {
  //  this.revenuesDataSource.filter = filterValue.trim().toLowerCase();
  //}

  //DECLARATIONS

  //PETTY CASH

  pettyCashPayload: any;
  pettyCashData: Petty_Cash[] = [];
  pettyCashDataSource = new MatTableDataSource(this.pettyCashData);
  pettyCashDisplayedColumns = ['number', 'id', 'pet_date', 'pet_desc' , 'pet_amount', 'pet_by', 'actions'];
  pettyCashIdArchive: any;

  //REVENUES

  revenuesPayload: any;
  revenuesData: Revenue[] = [];
  revenuesDataSource = new MatTableDataSource(this.revenuesData);
  revenuesDisplayedColumns: string[] = ['rev_number', 'rev_ref', 'rev_date', 'rev_name','rev_desc',  'rev_amount', 'rev_supplier', 'rev_by', 'actions'];
  revenuesDataIsArchived: any;


  getRevenues() {

    this.dataService.get('revenues/get')
      .subscribe((data) => {

        console.log(data)

        this.revenuesPayload = data;
        this.revenuesData = this.revenuesPayload.data;

        if (this.isToggleArchive == false) {
          let array: any[] = [];
          this.revenuesData.map((data) => { if (data.isArchive != 1) { array.push(data) } })
          this.revenuesData = array
          console.log(array)
        }
        else {
          this.revenuesData = this.revenuesPayload.data

        }

        this.revenuesDataSource.data = this.revenuesData
        //this.revenuesDataSource.paginator = this.revPaginator
        //this.revenuesDataSource.sort = this.empSort
      });
  }


  newRev(input: any) {

    this.dataService.post('revenues/new', { data: input }).subscribe((data: any) => {
      console.log(data)



      if (data.code == 200) {
        Swal.fire(
          'A!',
          '',
          'success'
        )
      }
      else if (data.code == 500) {
        Swal.fire(
          'Invalid Credentials!',
          '',
          'error'
        )
      }


      this.getRevenues()

    })

  }

  editRev(input: any) {

    this.dataService.patch('revenues/edit', { data: input }).subscribe((data) => {
      console.log(data)

      this.getRevenues()
    })

  }

  archiveEmp(input: any) {

    input.isArchive = 1;

    this.dataService.patch('employees/edit', { data: input }).subscribe((data) => {
      console.log(data)

      this.getRevenues()
    })

  }

  deleteEmp(input: any) {

    this.dataService.delete(`employees/delete/${input._id}`)
      .subscribe((data: any) => {

        if (data.code == 200) {
        }
        else {
        }

        this.getRevenues()

      })

  }









  salesPayload: any;
  salesData: Sale[] = [];
  salesDataSource = new MatTableDataSource(this.salesData);
  salesDisplayedColumns: string[] = ['number', '_id', 'sales_date', 'sales_desc', 'sales_by', 'sales_amount', 'sales_supplier', 'actions'];
  salesDataIsArchived: any;

  //EXPENSES

  expensesPayload: any;
  expensesData: Expense[] = [];
  expensesDataSource = new MatTableDataSource(this.expensesData);
  expensesDisplayedColumns: string[] = ['number', '_id', 'exp_date', 'exp_desc', 'exp_by', 'exp_amount', 'actions'];
  expensesDataIsArchived: any;

  purchasesPayload: any;
  purchasesData: Purchase[] = [];
  purchasesDataSource = new MatTableDataSource(this.purchasesData);
  purchasesDisplayedColumns: string[] = ['number', '_id', 'purc_date', 'purc_desc', 'purc_by', 'purc_amount', 'purc_supplier', 'actions'];
  purchasesDataIsArchived: any;

  payrollPayload: any;
  payrollData: Payroll[] = [];
  payrollDataSource = new MatTableDataSource(this.payrollData);
  payrollDisplayedColumns = ['number', '_id', 'payr_date', 'payr_desc', 'payr_by', 'payr_amount', 'payr_supplier', 'actions'];
  payrollDataIsArchived: any;

  //FUNCTIONS






  //PETTY CASH







 
  //setPettySample() {
  //  this.setPettyStartCash(PETSTART);
  //}

  //setAmountPet!: number;

  //setPettyStartCash(amount: number) {
  //  localStorage.setItem('StartPetty', amount.toString());
  //  this.getPettyStartCash();
  //  this.computePettyCash();
  //}

  //pettyCashStart: number = 0;
  //pettyCash: number = 0;

  //getPettyStartCash() {
  //  this.pettyCashStart = (Number(localStorage.getItem('StartPetty')));
  //}

  //getPettyCash() {

  //  this.pettyCashData = PET_DATA;
  //  this.pettyCashDataSource.data = this.pettyCashData;

  //  //this.dataService.getAllItem('pettycash').subscribe((data: any) => {
  //  //  this.pettyCashPayload = data;
  //  //  console.log(this.pettyCashPayload);
  //  //  this.pettyCashData = this.pettyCashPayload;
  //  //  this.pettyCashDataSource.data = this.pettyCashPayload;
  //  //});

  //  this.computePettyCash()

  //}

  //computePettyCash() {

  //  let pettycashData = this.pettyCashData;

  //  this.pettyCash = this.pettyCashStart

  //  for (var data of pettycashData) {
  //    console.log(data.pet_amount)
  //    this.pettyCash = this.pettyCash + data.pet_amount
  //  }


  //}

  //transData: any = {};
  //transPerson: any;
  //transCashFlow: any;
  //transAmount: any;
  //transDesc: any;
  //selected: any;
  //countPetty: any;
  //countPettyCash () {
  //  this.dataService.get('finance/pettycash/get').subscribe((data:any) => {
  //    this.countPetty = data.length + 1;
  //  })
  //}
  //addTransaction() {
  //  // const dialogRef = this.matDialog.open(AddPettyCashComponent, {
  //  //   height: '75%',
  //  //   width: '100%'
  //  // });

  //  // dialogRef.afterClosed().subscribe(() => this.getPettyCash());
  //  this.countPettyCash();
  //  this.transData.pet_by = this.transPerson;
  //  if(this.selected == 'deduct') {
  //    this.transData.pet_amount = (this.transAmount) * (-1)
  //  } else {
  //    this.transData.pet_amount = this.transAmount;
  //  }
  //  this.transData.isArchive = 0;
  //  this.transData.pet_desc = this.transDesc;
  //  this.transData.number = this.countPetty;
  //  console.log(this.selected);
  //  console.log(this.transData.pet_amount)

  //  // this.dataService.createItem('transaction', this.transData).subscribe((data: any) => {
  //  //   console.log(data);
  //  // })

  //  Swal.fire(
  //    'Item Added!',
  //    '',
  //    'success'
  //  )
  //  this.dataService.post('finance/pettycash/new', this.transData).subscribe((data: any) => {
  //    console.log(data);
  //    this.getPettyCash();
  //    this.transDesc = this.transAmount = this.transCashFlow = this.transPerson = ''
  //  })
    
  //  }

  ////viewPettyCash(pettyCash: any) {
  ////  const dialogRef = this.matDialog.open(ViewPettyCashComponent, {
  ////    height: '75%',
  ////    width: '100%',
  ////    data: pettyCash
  ////  });

  ////  dialogRef.afterClosed().subscribe(() => this.getPettyCash());
  ////}

  ////editPettyCash(pettyCash: any) {
  ////  const dialogRef = this.matDialog.open(EditPettyCashComponent, {
  ////    height: '75%',
  ////    width: '100%',
  ////    data: pettyCash
  ////  });

  ////  dialogRef.afterClosed().subscribe(() => this.getPettyCash());
  ////}

  ////archivePettyCash(_id: any) {
  ////  Swal.fire({
  ////    title: 'Are you sure?',
  ////    text: "You won't be able to revert this!",
  ////    icon: 'warning',
  ////    showCancelButton: true,
  ////    confirmButtonColor: '#3085d6',
  ////    cancelButtonColor: '#d33',
  ////    confirmButtonText: 'Yes, delete it!'
  ////  }).then((result) => {
  ////    if (result.isConfirmed) {
  ////      Swal.fire(
  ////        'Deleted!',
  ////        'Your file has been deleted.',
  ////        'success'
  ////      )
  ////      this.pettyCashIdArchive = _id;
  ////      this.dataService.patch('pettycash', this.pettyCashIdArchive, { "isArchive": 1 }).subscribe((data: any) => {
  ////        console.log(data);
  ////      });
  ////      this.getPettyCash();
  ////    }
  ////  })
  ////}

  ////REVENUES and SALES 

  //getRevenues() {

  //  this.revenuesData = REV_DATA;
  //  this.revenuesDataSource.data = this.revenuesData;

  //  //this.dataService.getAllItem("revenues").subscribe((data: any) => {
  //  //  this.revenuesPayload = data
  //  //  console.log(this.revenuesPayload);
  //  //  this.revenuesData = this.revenuesPayload;
  //  //  this.revenuesDataSource.data = this.revenuesData;  
  //  //});
  //}



  //getSales() {

  //  this.salesData = SALES_DATA;
  //  this.salesDataSource.data = this.salesData;



  //  //this.dataService.getAllItem("sales").subscribe((data: any) => {
  //  //  this.salesPayload = data
  //  //  console.log(this.salesPayload);
  //  //  this.salesData = this.salesPayload;
  //  //  this.salesDataSource.data = this.salesData;
  //  //});    
  //}  

  ////addRevenues() {
  ////  const dialogRef = this.matDialog.open(AddRevenuesComponent, {
  ////    height: '75%',
  ////    width: '100%'
  ////  });

  ////  dialogRef.afterClosed().subscribe(() => this.getRevenues());
  ////}

  ////viewRevenues(revenues: any) {
  ////  const dialogRef = this.matDialog.open(ViewRevenuesComponent, {
  ////    height: '75%',
  ////    width: '100%',
  ////    data: revenues
  ////  });

  ////  dialogRef.afterClosed().subscribe(() => this.getRevenues());
  ////}

  ////editRevenues(revenues: any) {
  ////  const dialogRef = this.matDialog.open(EditRevenuesComponent, {
  ////    height: '75%',
  ////    width: '100%',
  ////    data: revenues
  ////  });

  ////  dialogRef.afterClosed().subscribe(() => { this.getRevenues() });
  ////  //this.getRevenues(), this.load()
  ////}

  ////archiveRevenues(_id: any) {
  ////  Swal.fire({
  ////    title: 'Are you sure?',
  ////    text: "You won't be able to revert this!",
  ////    icon: 'warning',
  ////    showCancelButton: true,
  ////    confirmButtonColor: '#3085d6',
  ////    cancelButtonColor: '#d33',
  ////    confirmButtonText: 'Yes, delete it!'
  ////  }).then((result) => {
  ////    if (result.isConfirmed) {
  ////      Swal.fire(
  ////        'Archived!',
  ////        'Your file has been archived.',
  ////        'success'
  ////      )
  ////      this.revenuesDataIsArchived = _id;
  ////      this.dataService.archiveItem('revenues', this.revenuesDataIsArchived, { "isArchive": 1 }).subscribe((data: any) => {
  ////        console.log(data);
  ////      });
  ////      this.getRevenues();
  ////    }
  ////  })
  ////}
  

  //getExpenses() {
  //  this.expensesData = EXPE_DATA;
  //  this.expensesDataSource.data = this.expensesData;

  //  //this.dataService.getAllItem("expenses").subscribe((data: any) => {
  //  //  this.expensesPayload = data;
  //  //  console.log(this.expensesPayload);
  //  //  this.expensesData = this.expensesPayload;
  //  //  this.expensesDataSource.data = this.expensesData;
  //  //});
  //}

  //getPurchases() {
  //  this.purchasesData = PURC_DATA;
  //  this.purchasesDataSource.data = this.purchasesData;

  //  //this.dataService.getAllItem("expenses").subscribe((data: any) => {
  //  //  this.expensesPayload = data;
  //  //  console.log(this.expensesPayload);
  //  //  this.expensesData = this.expensesPayload;
  //  //  this.expensesDataSource.data = this.expensesData;
  //  //});
  //}

  //getPayroll() {
  //  this.payrollData = PAYR_DATA;
  //  this.payrollDataSource.data = this.payrollData;

  //  //this.dataService.getAllItem("expenses").subscribe((data: any) => {
  //  //  this.expensesPayload = data;
  //  //  console.log(this.expensesPayload);
  //  //  this.expensesData = this.expensesPayload;
  //  //  this.expensesDataSource.data = this.expensesData;
  //  //});
  //}

  ////addExpenses() {
  ////  const dialogRef = this.matDialog.open(AddExpensesComponent, {
  ////    height: '75%',
  ////    width: '100%'
  ////  });

  ////  dialogRef.afterClosed().subscribe(() => this.getExpenses());
  ////}

  ////viewExpenses(expenses: any) {
  ////  const dialogRef = this.matDialog.open(ViewExpensesComponent, {
  ////    height: '75%',
  ////    width: '100%',
  ////    data: expenses
  ////  });

  ////  dialogRef.afterClosed().subscribe(() => this.getExpenses());
  ////}

  ////editExpenses(expenses: any) {
  ////  const dialogRef = this.matDialog.open(EditExpensesComponent, {
  ////    height: '75%',
  ////    width: '100%',
  ////    data: expenses
  ////  });

  ////  dialogRef.afterClosed().subscribe(() => this.getExpenses());
  ////}

  ////archiveExpenses(_id: any) {
  ////  Swal.fire({
  ////    title: 'Are you sure?',
  ////    text: "You won't be able to revert this!",
  ////    icon: 'warning',
  ////    showCancelButton: true,
  ////    confirmButtonColor: '#3085d6',
  ////    cancelButtonColor: '#d33',
  ////    confirmButtonText: 'Yes, delete it!'
  ////  }).then((result) => {
  ////    if (result.isConfirmed) {
  ////      Swal.fire(
  ////        'Archived!',
  ////        'Your file has been archived.',
  ////        'success'
  ////      )
  ////      this.expensesDataIsArchived = _id;
  ////      this.dataService.archiveItem('expenses', this.expensesDataIsArchived, { "isArchive": 1 }).subscribe((data: any) => {
  ////        console.log(data);
  ////      });
  ////      this.getExpenses();
  ////      /*this.load();*/
  ////    }
  ////  })
  ////}

  //GRAPH

  //PUSH DATA

  //graphVar: any = {};

  //revenuesDataGraph: Graph[] = []

  //getRevenuesData() {
  //  this.revenuesDataGraph = []
  //  let revenuesData = this.revenuesData;
  //  for (var data of revenuesData) {
  //    this.graphVar.date = data.rev_date
  //    this.graphVar.amount = data.rev_amount
  //    this.graphVar.type = "rev"
  //    this.revenuesDataGraph.push(this.graphVar)
  //    console.log(this.graphVar)
  //    this.graphVar = [];
  //  }
  //}

  //salesDataGraph: GraphData[] = []

  //getSalesData() {
  //  this.salesDataGraph = []
  //  let salesdata = this.salesData;
  //  for (var data of salesdata) {
  //    this.graphVar.date = data.sales_date
  //    this.graphVar.amount = data.sales_quantity * data.sales_price
  //    this.graphVar.type = "sales"
  //    this.salesDataGraph.push(this.graphVar)
  //    console.log(this.graphVar)
  //    this.graphVar = [];
  //  }
  //}

  //expensesDataGraph: GraphData[] = []

  //getExpensesData() {
  //  this.expensesDataGraph = []
  //  let expensesData = this.expensesData;
  //  for (var data of expensesData) {
  //    this.graphVar.date = data.exp_date
  //    this.graphVar.amount = data.exp_amount
  //    this.graphVar.type = "exp"
  //    this.expensesDataGraph.push(this.graphVar)
  //    this.graphVar = [];
  //  }
  //}

  //purchasesDataGraph: GraphData[] = []

  //getPurchasesData() {
  //  this.purchasesDataGraph = []
  //  let purchasesData = this.purchasesData;
  //  for (var data of purchasesData) {
  //    this.graphVar.date = data.purc_date
  //    this.graphVar.amount = data.purc_price * data.purc_quantity
  //    this.graphVar.type = "purc"
  //    this.purchasesDataGraph.push(this.graphVar)
  //    this.graphVar = [];
  //  }
  //}

  //payrollDataGraph: GraphData[] = []

  //getPayrollData() {
  //  this.payrollDataGraph = []
  //  let payrollData = this.payrollData;
  //  for (var data of payrollData) {
  //    this.graphVar.date = data.payr_date
  //    this.graphVar.amount = data.payr_amount
  //    this.graphVar.type = "payr"
  //    this.payrollDataGraph.push(this.graphVar)
  //    this.graphVar = [];
  //  }
  //}

  ////Merge RevData

  //graphRevData: GraphData[] = []

  //mergeRevGraphData() {
  //  this.dataRevenues = [];
  //  this.graphRevData = this.revenuesDataGraph.concat(this.salesDataGraph);
  //  let graphrevdata = this.graphRevData;

  //  //HARD-CODING MONTHS HERE may better solutions pero fuck it

  //  var janRev = 0; var janSal = 0; var janNet = 0;
  //  var febRev = 0; var febSal = 0; var febNet = 0;
  //  var marRev = 0; var marSal = 0; var marNet = 0;
  //  var aprRev = 0; var aprSal = 0; var aprNet = 0;
  //  var mayRev = 0; var maySal = 0; var mayNet = 0;
  //  var junRev = 0; var junSal = 0; var junNet = 0;
  //  var julRev = 0; var julSal = 0; var julNet = 0;
  //  var augRev = 0; var augSal = 0; var augNet = 0;
  //  var sepRev = 0; var sepSal = 0; var sepNet = 0;
  //  var octRev = 0; var octSal = 0; var octNet = 0;
  //  var novRev = 0; var novSal = 0; var novNet = 0;
  //  var decRev = 0; var decSal = 0; var decNet = 0;

  //  var feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec = 0

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

  //  console.log("January", janRev, janSal, janNet)

  //  this.dataRevenues.push(["January", janRev, janSal, janNet]); this.balJan = janNet;
  //  this.dataRevenues.push(["February", febRev, febSal, febNet]); this.balFeb = febNet;
  //  this.dataRevenues.push(["March", marRev, marSal, marNet]); this.balMar = marNet;
  //  this.dataRevenues.push(["April", aprRev, aprSal, aprNet]); this.balApr = aprNet;
  //  this.dataRevenues.push(["May", mayRev, maySal, mayNet]); this.balMay = mayNet;
  //  this.dataRevenues.push(["June", mayRev, maySal, mayNet]); this.balJun = mayNet;
  //  this.dataRevenues.push(["July", mayRev, maySal, mayNet]); this.balJul = mayNet;
  //  this.dataRevenues.push(["August", mayRev, maySal, mayNet]); this.balAug = mayNet;
  //  this.dataRevenues.push(["September", mayRev, maySal, mayNet]); this.balSep = mayNet;
  //  this.dataRevenues.push(["October", mayRev, maySal, mayNet]); this.balOct = mayNet;
  //  this.dataRevenues.push(["November", mayRev, maySal, mayNet]); this.balNov = mayNet;
  //  this.dataRevenues.push(["December", mayRev, maySal, mayNet]); this.balDec = mayNet;
  //}  

  //graphExpData: GraphData[] = []

  //mergeExpGraphData() {
  //  this.dataExpenses = [];
  //  //YEAH REMOVE LATER
  //  this.dataBalance = [];

  //  this.graphExpData = this.expensesDataGraph.concat(this.purchasesDataGraph.concat(this.payrollDataGraph));
  //  console.log(this.graphExpData);    

  //  //HARD-CODING MONTHS HERE may better solutions pero fuck it

  //  var janExp = 0; var janPurc = 0; var janPayr = 0; var janxNet = 0;
  //  var febExp = 0; var febPurc = 0; var febPayr = 0; var febxNet = 0;
  //  var marExp = 0; var marPurc = 0; var marPayr = 0; var marxNet = 0;
  //  var aprExp = 0; var aprPurc = 0; var aprPayr = 0; var aprxNet = 0;
  //  var mayExp = 0; var mayPurc = 0; var mayPayr = 0; var mayxNet = 0;

  //  let graphexpdata = this.graphExpData;
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

  //  this.dataExpenses.push(["January", janExp, janPurc, janPayr, janxNet]); this.balJan = this.balJan - janxNet;
  //  this.dataExpenses.push(["February", febExp, febPurc, febPayr, febxNet]); this.balFeb = this.balFeb - febxNet;
  //  this.dataExpenses.push(["March", marExp, marPurc, marPayr, marxNet]); this.balMar = this.balMar - marxNet;
  //  this.dataExpenses.push(["April", aprExp, aprPurc, aprPayr, aprxNet]); this.balApr = this.balApr - aprxNet;
  //  this.dataExpenses.push(["May", mayExp, mayPurc, mayPayr, mayxNet]); this.balMay = this.balMay - mayxNet;
  //  this.dataExpenses.push(["June", mayExp, mayPurc, mayPayr, mayxNet]); this.balJun = this.balMay - mayxNet;
  //  this.dataExpenses.push(["July", mayExp, mayPurc, mayPayr, mayxNet]); this.balJun = this.balMay - mayxNet;
  //  this.dataExpenses.push(["August", mayExp, mayPurc, mayPayr, mayxNet]); this.balAug = this.balMay - mayxNet;
  //  this.dataExpenses.push(["September", mayExp, mayPurc, mayPayr, mayxNet]); this.balSep = this.balMay - mayxNet;
  //  this.dataExpenses.push(["October", mayExp, mayPurc, mayPayr, mayxNet]); this.balOct = this.balMay - mayxNet;
  //  this.dataExpenses.push(["November", mayExp, mayPurc, mayPayr, mayxNet]); this.balNov = this.balMay - mayxNet;
  //  this.dataExpenses.push(["December", mayExp, mayPurc, mayPayr, mayxNet]); this.balDec = this.balMay - mayxNet;

  //  // TOO LAZY TO DO THE RIGHT WAY

  //  var averageBal = 0
  //  averageBal = this.balJan + this.balFeb + this.balMar + this.balApr + (this.balMay * 7);

  //  this.dataBalance.push(["January", this.balJan + janxNet, janxNet * -1, this.balJan, averageBal]);
  //  this.dataBalance.push(["February", this.balFeb + febxNet, febxNet * -1, this.balFeb, averageBal]);
  //  this.dataBalance.push(["March", this.balMar + marxNet, marxNet * -1, this.balMar, averageBal]);
  //  this.dataBalance.push(["April", this.balApr + aprxNet, aprxNet * -1, this.balApr, averageBal]);
  //  this.dataBalance.push(["May", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
  //  this.dataBalance.push(["June", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
  //  this.dataBalance.push(["July", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
  //  this.dataBalance.push(["August", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
  //  this.dataBalance.push(["September", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
  //  this.dataBalance.push(["October", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
  //  this.dataBalance.push(["November", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);
  //  this.dataBalance.push(["December", this.balMay + mayxNet, mayxNet * -1, this.balMay, averageBal]);

  //  console.log(this.salesDataGraph)

  //}

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
