import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { LibraryService } from 'src/app/services/library/library.service';
import { MatPaginator } from '@angular/material/paginator';
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
import { AcceptValidator, MaxSizeValidator, NgxMatFileInputComponent } from '@angular-material-components/file-input';
import { ThemePalette } from '@angular/material/core';
import { environment } from 'src/environments/environment';

import { Announcement, Task_Board, Inventory } from 'src/app/services/data/data.model';


import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, rubberBandAnimation } from 'angular-animations';

//SAMPLE

//declaration mat input
const presetFiles = [new File([], "file 1"), new File([], "file 2")];
const presetFile = new File([], "file 1");

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
  ) {
    // this.fileControl = new FormControl(this.files, [
    //   Validators.required,
    //   MaxSizeValidator(this.maxSize * 1024)
    // ])
  }

  baseURL = environment.BASE_URL

  


  @ViewChild('invEditDialog', { static: true }) invEditDialog!: TemplateRef<any>;
  @ViewChild('invAddDialog', { static: true }) invAddDialog!: TemplateRef<any>;
  @ViewChild('invAddInvoiceDialog', { static: true }) invAddInvoiceDialog!: TemplateRef<any>;


  openDialogInvEdit(input: any) {
    this.dialog.open(this.invEditDialog, { data: input });
  }

  openDialogInvAdd() {
    var input = {}
    this.dialog.open(this.invAddDialog, { data: input });
  }

  openDialogInvAddInvoice() {
    var input = {}
    this.dialog.open(this.invAddInvoiceDialog, { data: input });
  }

  ngOnInit(): void { 
    /*this.loadOnstart();*/
    this.loadOnLoop();
    

    //mat inpur
  //   this.fileControl.valueChanges.subscribe((files: any) => {
  //     if (!Array.isArray(files)) {
  //       this.files = [files];
  //     } else {
  //       this.files = files;
  //     }
  //   })
   }

  @ViewChild('inventoryGalleryPaginator', { static: false })
  set inventoryGalleryPaginator(value: MatPaginator) {
    if (this.inventoriesDataSource) {
      this.inventoriesDataSource.paginator = value;
    }
  }

  @ViewChild('inventoryTablePaginator', { static: false })
  set inventoryTablePaginator(value: MatPaginator) {
    if (this.inventoriesDataSource) {
      this.inventoriesDataSource.paginator = value;
    }
  }
  @ViewChild('inventoryGallery2Paginator', { static: false })
  set inventoryGallery2Paginator(value: MatPaginator) {
    if (this.inventoriesDataSource) {
      this.inventoriesDataSource.paginator = value;
    }
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

        this.getInventories()

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
  inventoriesData: Inventory[] = [];
  inventoriesDataSource = new MatTableDataSource(this.inventoriesData);
  inventoriesDisplayedColumns = ['name', '_id', 'id', 'description', 'category', 'quantity','supplier', 'min_amount','price','actions'];
  inventoriesIdArchive: any;

  isToggleArchive = false

  getInventories() {
    this.dataService.get('inventories/get')
      .subscribe((data: any) => {
        console.log(data);
        this.inventoriesPayload = data;
        this.inventoriesData = this.inventoriesPayload.data;

        this.inventoriesData.map((data : any) => {
          data.sale_price = data.inv_price
          data.sale_quantity = 0
          data.purc_price = data.inv_price
          data.purc_quantity = 0

        })

        this.inventoriesDataSource.data = this.inventoriesData;

        this.inventoriesGalleryData = this.inventoriesDataSource.data

        //this.employeesDataSource.paginator = this.empPaginator
        //this.employeesDataSource.sort = this.empSort;

      });
  }

  inventoriesGalleryData: any

  applyFilterInv(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.inventoriesDataSource.filter = filterValue.trim().toLowerCase();
    this.inventoriesGalleryData = this.inventoriesDataSource._pageData

  }

  image: any
  image2: any
  invData: any = {}
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  //newInv(input: any) {
  //  const imageData = new FormData()
  //  //imageData = input.inv_imgUrl
  //  let filename: string

  //  // console.log(input.inv_imgUrl)
  //  // console.log(this.image)
  //  // console.log(imageData)
  //  this.image2 = input.inv_imgUrl 
  //  imageData.append('file', this.image2)
  //  //imageData.append('file', this.image)
    
    
  //  this.invData.inv_id = input.inv_id
  //  this.invData.inv_name = input.name
  //  this.invData.inv_category = input.category
  //  this.invData.inv_description = input.description 
  //  this.invData.inv_quantity = input.quantity
  //  this.invData.inv_price = input.price
  //  this.invData.inv_supplier = input.supplier
  //  this.invData.inv_min_amount = input.min_amount

  //  this.httpClient.post<any>('http://localhost:3000/api/uploads/', imageData).subscribe((data: any) => {
  //      console.log(data)
  //    // console.log(data.filename)
  //      this.invData.inv_imageUrl = data.filename
  //      this.dataService.post('inventories/new', this.invData).subscribe((data) => {
  //      console.log(data)
  //      this.getInventories()
  //    })
  //  })
     
  //}

  globalImage: any
  editInv(input: any) {
    const editImageData = new FormData()
    this.globalImage = input.inv_imgUrl 
    editImageData.append('file', this.globalImage)

    
    this.dataService.patch('inventories/edit', { data: input }).subscribe((data) => {
      console.log(data)

      this.getInventories()

    })

  }

  archiveInv(input: any) {

    input.isArchive = 1;

    this.dataService.patch('inventories/edit', { data: input })
      .subscribe((data) => {
      console.log(data)

      this.getInventories()
    })

  }  

  deleteInv(input: any) {

    this.dataService.delete(`inventories/delete/${input._id}`)
      .subscribe((data: any) => {

        if (data.code == 200) {
        }
        else {
        }

      })

  }

  addNewItem(input: any) {

    this.dataService.post('inventories/new', { data: input })
      .subscribe((data: any) => {

        console.log(data)

      })
  }



  //sales
  addSale(input: any) {

    let saleData: any = {}
    
    saleData.sale_name = input.inv_name
    saleData.sale_desc = 'Sale'
    saleData.sale_supplier = input.inv_supplier
    saleData.sale_amount = input.sale_quantity * input.sale_price
    console.log(saleData)

    let invData: any = {}
    console.log(invData.inv_quantity)
    invData.inv_quantity = input.inv_quantity - input.sale_quantity
    invData._id = input._id
    console.log(invData._id)
    //LATER NA IBA PANG FIELDS ETO MUNA

    //CALL TO ADD TO EXPENSES
    this.dataService.post('sales/new', { data: saleData }).subscribe((data) => {
      //CALL TO EDIT INVENTORIES
      console.log(data)
      this.dataService.patch('inventories/edit', { data: invData }).subscribe((data) => {
        console.log(data)
        this.getInventories()
        
      })


    })
  }

  newPurchase(input: any) {
    let purchaseData: any = {}

    purchaseData.purc_name = input.purc_name
    purchaseData.purc_id = input.purc_id
    purchaseData.purc_date = input.purc_date
    purchaseData.purc_ref = input.purc_ref
    purchaseData.purc_by = input.purc_by
    purchaseData.purc_amount = input.purc_amount
    purchaseData.purc_supplier = input.purc_supplier

    this.httpClient.post<any>('http://localhost:3000/api/purchases/new', purchaseData).subscribe((data: any) => {
      console.log(data)
      this.getInventories()
      //this.getPurchases()
      
    })
    
  }



  toggleArchive() {

    if (this.isToggleArchive) {
      this.isToggleArchive = false
    }
    else {
      this.isToggleArchive = true
    }

    this.getInventories()
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

