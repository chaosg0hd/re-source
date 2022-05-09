import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { LibraryService } from 'src/app/services/library/library.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

import { ConnStatus, Announcement, TaskBoard, Inventories } from 'src/app/services/data/data.model';


import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, rubberBandAnimation } from 'angular-animations';

export interface PurchasesData {
  number: number;
  id: string;
  _id: string;

  purc_date: any;  
  purc_supplier: string;
  purc_price: number;
  purc_quantity: any;
  purc_desc: string;
  purc_by: string;
  purc_amount: number;

  isArchive: number;
  created_at: any;
  updated_at: any;
}

//SAMPLE


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    rubberBandAnimation(),
  ]
})
export class InventoryComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialog : MatDialog,
    private httpClient: HttpClient,
    private libraryService: LibraryService
  ) { }

  ngOnInit(): void { 
    /*this.loadOnstart();*/
    this.loadOnLoop();
  }

  //OOP
  isLoaded: boolean = false;

  async loadOnLoop() {

    //Event Loop Starts Here    
    this.checkIfMobile();

    this.loadTab(this.activeTab);

    this.isLoaded = true;
    this.isLoadedTab = true;

    await this.delay(5000);
    this.reloadLoop();


    //Event Loop End Here
  }

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

        this.getInventories()

        await this.delay(1000);
        this.isLoadedTab = true;


        break;

      case 1:

        this.isLoadedTab = false;

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

  //check iF mobile

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile()
  }

  

//  export interface Inventories {

//  _id: string;

//  number: number;
//  id: string;
//  name: string;
//  description: string;
//  quantity: number;
//  price: number;
//  imageUrl: string

//  isArchive: number;
//  created_at: Date;
//  updated_at: Date;

//}

  inventoriesPayload: any;
  inventoriesData: Inventories[] = [];
  inventoriesDataSource = new MatTableDataSource(this.inventoriesData);
  inventoriesDisplayedColumns = ['number', 'name', 'id', 'description', 'quantity', 'price', 'actions'];
  inventoriesIdArchive: any;

  getInventories() {
    this.dataService.get('inventories/get')
      .subscribe((data: any) => {
        console.log(data);
        this.inventoriesPayload = data.inventory;
        this.inventoriesData = this.inventoriesPayload;
        this.inventoriesDataSource.data = this.inventoriesPayload;
      });
  }

  pushItemData: any = {};
  idArchive: any;
  handleError: any;
  filterValue: any;

  applyFilterInventories(filterValue: string){ 
    // this.filterValue = (event.target as HTMLInputElement).value;     
      this.inventoriesDataSource.filter = filterValue.trim().toLowerCase();
  }



  //addItem() {
  //  // const dialogRef = this.dialog.open(AddItemComponent, {
  //  //   height: '75%',
  //  //   width: '100%'
  //  // });

  //  // dialogRef.afterClosed().subscribe(() => this.getInventories());
  //  const dialogRef = this.dialog.open(AddItemComponent, {
  //    height: '75%',
  //    width: '100%'
  //  });

  //  dialogRef.afterClosed().subscribe(result =>
  //    {
  //      this.getInventories()
  //      console.log(result)
  //    })
  //}

  //itemView(data: any){ 
  //  try {
  //    const dialogRef = this.dialog.open(ViewItemComponent, {
  //      width: '100%',
  //      height: '75%',
  //      data: data
  //    });

  //    dialogRef.afterClosed().subscribe(result => {
  //      this.getInventories();
  //      console.log(result)
  //    })
  //  }
  //  catch (error) {
  //    console.log(error);
  //  }
      
  //  }

  itemUpdate(data: any){
  // const dialogRef2 = this.dialog.open(EditComponent, {
  //   width: '50%',
  //   data: i
  //  });

  //  dialogRef2.afterClosed().subscribe(() => this.pullInventories());
  }

  clearForm(){
    // this.prodName = '';
    // this.prodDesc = '';
    // this.prodQty = '';
    // this.prodPrice = '';
    // this.prodSupp = '';
    // this.prodImg = '';
  }

  purchasesPayload: any;
  purchasesData: PurchasesData[] = [];
  purchasesDataSource = new MatTableDataSource(this.purchasesData);
  purchasesDisplayedColumns: string[] = ['number', 'id', 'purc_date', 'purc_supplier', 'purc_price', 'purc_quantity', 'purc_desc', 'purc_by', 'actions'];
  purchasesRecentDisplayedColumns: string[] = ['purc_date', 'purc_desc', 'purc_quantity'];
  purchasesDataIsArchived: any;

  getPurchases() {
    //this.purchasesData = PURC_DATA;
    //this.purchasesDataSource.data = this.purchasesData;

    ////this.dataService.getAllItem("expenses").subscribe((data: any) => {
    ////  this.expensesPayload = data;
    ////  console.log(this.expensesPayload);
    ////  this.expensesData = this.expensesPayload;
    ////  this.expensesDataSource.data = this.expensesData;
    ////});
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
