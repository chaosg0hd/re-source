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
import { MatSort, Sort } from '@angular/material/sort';
import { GoogleChartsModule } from 'angular-google-charts';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

import { Inventory, Purchase, Sale, Supplier } from 'src/app/services/data/data.model';


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
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private libraryService: LibraryService,
    private datepipe: DatePipe
  ) {
    // this.fileControl = new FormControl(this.files, [
    //   Validators.required,
    //   MaxSizeValidator(this.maxSize * 1024)
    // ])
  }

  baseURL = environment.BASE_URL



  @ViewChild('invAddDialog', { static: true }) invAddDialog!: TemplateRef<any>;
  @ViewChild('invCloneDialog', { static: true }) invCloneDialog!: TemplateRef<any>;
  @ViewChild('invEditDialog', { static: true }) invEditDialog!: TemplateRef<any>;
  @ViewChild('purchaseEditDialog', { static: true }) purchaseEditDialog!: TemplateRef<any>;
  @ViewChild('saleEditDialog', { static: true }) saleEditDialog!: TemplateRef<any>;
  @ViewChild('invAddInvoiceDialog', { static: true }) invAddInvoiceDialog!: TemplateRef<any>;
  //pdf generations
  @ViewChild('purchasePDF', { static: true }) purchasePDF!: TemplateRef<any>;
  @ViewChild('salePDF', { static: true }) salePDF!: TemplateRef<any>;

  openDialogInvAdd() {
    var input = {}
    this.dialog.open(this.invAddDialog, { data: input });
  }

  openDialogInvEdit(input: any) {
    this.dialog.open(this.invEditDialog, { data: input });
  }

  openDialogInvClone(input: any) {
    this.dialog.open(this.invCloneDialog, { data: input });
  }

  openDialogPurchaseEdit(input: any) {
    this.dialog.open(this.purchaseEditDialog, { data: input });
  }

  openDialogSaleEdit(input: any) {
    this.dialog.open(this.saleEditDialog, { data: input });
  }

  //pdf generations
  openDialogPurchasePDF() {
    let input: any = {}
    this.dialog.open(this.purchasePDF, { data: input });
  }

  openDialogSalePDF() {
    let input: any = {}
    this.dialog.open(this.salePDF, { data: input });
  }





  openDialogInvAddInvoice() {
    var input = {}
    this.dialog.open(this.invAddInvoiceDialog, { data: input });
  }

  

  @ViewChild('inventoryGalleryPaginator', { static: false })
  set inventoryGalleryPaginator(value: MatPaginator) {
    if (this.inventoriesDataSource) {
      this.inventoriesDataSource.paginator = value;
    }
  }    

  @ViewChild('purcPaginator', { static: false })
  set purcPaginator(value: MatPaginator) {
    if (this.purchasesDataSource) {
      this.purchasesDataSource.paginator = value;
    }
  }

  ngOnInit(): void {

    this.loadOnLoop();

  }

  @ViewChild(MatSort) invSort!: MatSort;

  /*@ViewChild(MatSort) purcSort!: MatSort;*/

  @ViewChild('purcSort', { static: false })
  set purcSort(value: MatSort) {
    if (this.purchasesDataSource) {
      this.purchasesDataSource.sort = value;
    }
  }

  //OOP
  isLoaded: boolean = false;

  activeDiv: any

  onclickDiv(divId: any) {
    if (this.activeDiv == divId) {
      this.activeDiv = null
    }
    else {
      this.activeDiv = divId;
    }
  }

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

        this.isLoadedTab = false

        this.getInventories()
        
        

        await this.delay(1000)
        this.isLoadedTab = true


        break;

      case 1:

        this.isLoadedTab = false
        this.getPurchases()


        await this.delay(1000);
        this.isLoadedTab = true

        break;

      case 2:

        this.isLoadedTab = false
        this.getSales()



        await this.delay(1000)
        this.isLoadedTab = true

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
  inventoriesDisplayedColumns = ['inv_name', '_id', 'inv_description', 'inv_category', 'inv_quantity', 'inv_supplier', 'inv_min_amount', 'inv_price', 'actions'];
  inventoriesIdArchive: any;

  isToggleArchive = false

  getInventories() {

    this.dataService.get('inventories/get')
      .subscribe((data: any) => {

        console.log(data);
        this.inventoriesPayload = data;
        this.inventoriesData = this.inventoriesPayload.data;

        this.inventoriesData.map((data: any) => {
          data.sale_price = data.inv_price
          data.sale_quantity = 0
          data.purc_price = data.inv_price
          data.purc_quantity = 0

        })

        this.inventoriesDataSource.data = this.inventoriesData;
        this.inventoriesGalleryData = this.inventoriesDataSource.data
        this.inventoriesDataSource.sort = this.invSort;

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

  purchasesPayload: any;
  purchasesData: Purchase[] = [];
  purchasesDataSource = new MatTableDataSource(this.purchasesData);
  purchasesDisplayedColumns = ['_id', 'purc_number', 'purc_itemID', 'purc_itemName', 'purc_supplier', 'purc_price', 'purc_quantity', 'created_at', 'actions'];
  purchasesIdArchive: any;

  getPurchases() {
    this.dataService.get('purchases/get')
      .subscribe((data: any) => {
        console.log(data);
        this.purchasesPayload = data;
        this.purchasesData = this.purchasesPayload.data;
        this.purchasesDataSource.data = this.purchasesData;
        this.purchasesDataSource.paginator = this.purcPaginator
        this.purchasesDataSource.sort = this.purcSort
        console.log(this.purchasesDataSource.data)

        this.getPurchasePie()
        this.getPurchaseLine()

      });
  }

  salesPayload: any;
  salesData: Sale[] = [];
  salesDataSource = new MatTableDataSource(this.salesData);
  salesDisplayedColumns = ['_id', 'sale_number', 'sale_itemID', 'sale_itemName', 'sale_supplier', 'sale_price', 'sale_quantity', 'created_at', 'actions'];
  salesIdArchive: any;

  getSales() {
    this.dataService.get('sales/get')
      .subscribe((data: any) => {
        console.log(data);
        this.salesPayload = data;
        this.salesData = this.salesPayload.data;

        this.salesDataSource.data = this.salesData;

        //this.purchasesGalleryData = this.purchasesDataSource.data

        //this.employeesDataSource.paginator = this.empPaginator
        //this.employeesDataSource.sort = this.empSort;

      });
  }

  applyFilterSales(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.salesDataSource.filter = filterValue.trim().toLowerCase();
    //this.salesData = this.salesDataSource._pageData

  }

  suppliersPayload: any;
  suppliersData: Supplier[] = [];
  suppliersDataSource = new MatTableDataSource(this.suppliersData);
  suppliersDisplayedColumns = ['_id', 'purc_number', 'purc_itemID', 'purc_itemName', 'purc_supplier', 'purc_price', 'purc_quantity', 'created_at', 'actions'];
  suppliersIdArchive: any;

  getSuppliers() {
    this.dataService.get('supplier/get')
      .subscribe((data: any) => {
        console.log(data);
        this.suppliersPayload = data;
        this.suppliersData = this.suppliersPayload.data;

        this.suppliersDataSource.data = this.suppliersData;

        //this.purchasesGalleryData = this.purchasesDataSource.data

        //this.employeesDataSource.paginator = this.empPaginator
        //this.employeesDataSource.sort = this.empSort;

      });
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


  globalImage: any

  editInv(input: any) {
    let editInvData: any = {}
    const editImageData = new FormData()

    this.globalImage = input.inv_imgUrl
    editImageData.append('file', this.globalImage)

    editInvData.inv_id = input.inv_id
    editInvData.inv_name = input.inv_name
    editInvData.inv_category = input.inv_category
    editInvData.inv_description = input.inv_description
    editInvData.inv_quantity = input.inv_quantity
    editInvData.inv_price = input.inv_price
    editInvData.inv_supplier = input.inv_supplier
    editInvData.inv_min_amount = input.inv_min_amount
    editInvData._id = input._id

    if (this.globalImage) {
      this.httpClient.post<any>('http://localhost:3000/api/uploads', editImageData).subscribe((data: any) => {
        console.log(data)
        editInvData.inv_imageUrl = data.filename
        this.dataService.patch('inventories/edit', { data: editInvData }).subscribe((data: any) => {
          console.log(data)

          this.getInventories()
          this.globalImage = ''
          if(data.code == 200) Swal.fire('Edit Successful', '', 'success')
          else {Swal.fire('Action unsuccessful!', '', 'error')}

        })
      })
    } else {
      this.dataService.patch('inventories/edit', { data: editInvData }).subscribe((data: any) => {
        console.log(data)

        this.getInventories()
        if(data.code == 200) Swal.fire('Edit Successful', '', 'success')
          else {Swal.fire('Action unsuccessful!', '', 'error')}

      })
    }


  }

  archiveInv(input: any) {
    Swal.fire({
      title: 'Are you sure you want to archive this item?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        input.isArchive = 1;
        this.dataService.patch('inventories/edit', { data: input })
        .subscribe((data) => {
          console.log(data)

          this.getInventories()
        })
        Swal.fire('Archived!', '', 'success')        
      } else {
        Swal.fire('', 'Action cancelled!', 'info')
      }
    })    
  }

  restoreInv(input: any) {
    Swal.fire({
      title: 'Are you sure you want to restore this item?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        input.isArchive = 0;
        this.dataService.patch('inventories/edit', { data: input })
        .subscribe((data) => {
          console.log(data)

          this.getInventories()
        })
        Swal.fire('Restored!', '', 'success')        
      } else {
        Swal.fire('', 'Action cancelled!', 'info')
      }
    })    
  }

  deleteInv(input: any) {

    console.log()
    Swal.fire({
      title: 'Are you sure you want to delete this item?',
      text: 'This is irreversible!',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        this.dataService.delete(`inventories/delete/${input._id}`)
        .subscribe((data: any) => {
  
          if (data.code == 200) {
            console.log(data)
            this.getInventories()
          }
          else { }
        })
        Swal.fire('Deleted!', '', 'success')        
      } else {
        Swal.fire('', 'Action cancelled!', 'info')
      }
    })    
  }
   
  

  addNewItem(input: any) {

    delete input._id

    this.dataService.post('inventories/new', { data: input })
      .subscribe((data: any) => {

        console.log(data)
        this.getInventories()
        Swal.fire({
          title:'Item Added!',
          icon:'success',
          imageUrl: 'https://sweetalert2.github.io/images/nyan-cat.gif',
          imageWidth: 200,
          imageHeight: 200,
        })

      })
  }



  //sales
  addSale(input: any) {
    let saleData: any = {}

    saleData.purc_itemID = input._id
    saleData.sale_itemName = input.inv_name
    saleData.sale_supplier = input.inv_supplier
    saleData.sale_price = input.sale_price
    saleData.sale_quantity = input.sale_quantity

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
        Swal.fire('', 'Sales transaction added!', 'success')

      })
    })
  }

  editSale(input: any){
    console.log(input)
    let saleData : any = {}
    saleData._id = input._id
    saleData.sale_supplier = input.sale_supplier
    saleData.sale_quantity = input.sale_quantity
    saleData.sale_price = input.sale_price
    console.log(saleData)
    this.dataService.patch('sales/edit', { data: saleData }).subscribe((data: any) => {
      if (data.code == 200) Swal.fire('', 'Sale transaction edited', 'success')
      else { Swal.fire('Edit unsuccessful','','error')}
    })
  }

  archiveSale(input: any) {
    Swal.fire({
      title: 'Are you sure you want to archive this sale transaction?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        input.isArchive = 1;
        this.dataService.patch('sales/edit', { data: input })
        .subscribe((data) => {
          console.log(data)
        })
        Swal.fire('Archived!', '', 'success')        
      } else {
        Swal.fire('', 'Action cancelled!', 'info')
      }
    })    
  }

  restoreSale(input: any) {
    Swal.fire({
      title: 'Are you sure you want to restore this sale transaction?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        input.isArchive = 0;
        this.dataService.patch('sales/edit', { data: input })
        .subscribe((data) => {
          console.log(data)
        })
        Swal.fire('Restored!', '', 'success')        
      } else {
        Swal.fire('', 'Action cancelled!', 'info')
      }
    })    
  }

  deleteSale(input: any) {

    console.log(input)
    Swal.fire({
      title: 'Are you sure you want to delete this sale transaction?',
      text: 'This is irreversible!',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        this.dataService.delete(`sales/delete/${input._id}`)
        .subscribe((data: any) => {
  
          if (data.code == 200) console.log(data)
          else { }
        })
        Swal.fire('Deleted!', '', 'success')        
      } else {
        Swal.fire('', 'Action cancelled!', 'info')
      }
    })    
  }

  addPurchase(input: any) {
    let purchaseData: any = {}

    
    purchaseData.purc_itemID = input._id
    purchaseData.purc_itemName = input.inv_name
    purchaseData.purc_supplier = input.inv_supplier
    purchaseData.purc_price = input.purc_quantity * input.purc_price
    purchaseData.purc_quantity = input.purc_quantity


    let invData: any = {}
    console.log(invData.inv_quantity)
    invData.inv_quantity = input.inv_quantity + input.purc_quantity
    invData._id = input._id
    console.log(invData._id)

    this.dataService.post('purchases/new', { data: purchaseData }).subscribe((data) => {
      //CALL TO EDIT INVENTORIES
      console.log(data)

      this.dataService.patch('inventories/edit', { data: invData }).subscribe((data) => {
        console.log(data)
        this.getInventories()
        Swal.fire('','Purchase transaction added!','success')

      })
    })

  }

  editPurchase(input: any){
    console.log(input)
    let purchaseData : any = {}
    purchaseData._id = input._id
    purchaseData.purc_supplier = input.purc_supplier
    purchaseData.purc_quantity = input.purc_quantity
    purchaseData.purc_price = input.purc_price
    console.log(purchaseData)
    this.dataService.patch('purchases/edit', { data: purchaseData }).subscribe((data: any) => {
      if (data.code == 200) Swal.fire('', 'Purchase transaction edited', 'success')
      else { Swal.fire('Edit unsuccessful','','error')}
    })
  }

  archivePurchase(input: any) {
    Swal.fire({
      title: 'Are you sure you want to archive this purchase transaction?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        input.isArchive = 1;
        this.dataService.patch('purchases/edit', { data: input })
        .subscribe((data) => {
          console.log(data)
        })
        Swal.fire('Archived!', '', 'success')        
      } else {
        Swal.fire('', 'Action cancelled!', 'info')
      }
    })    
  }

  restorePurchase(input: any) {
    Swal.fire({
      title: 'Are you sure you want to restore this purchase transaction?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        input.isArchive = 0;
        this.dataService.patch('purchases/edit', { data: input })
        .subscribe((data) => {
          console.log(data)
        })
        Swal.fire('Restored!', '', 'success')        
      } else {
        Swal.fire('', 'Action cancelled!', 'info')
      }
    })    
  }

  deletePurchase(input: any) {

    console.log(input)
    Swal.fire({
      title: 'Are you sure you want to delete this purchase transaction?',
      text: 'This is irreversible!',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if(result.isConfirmed){
        this.dataService.delete(`purchases/delete/${input._id}`)
        .subscribe((data: any) => {
  
          if (data.code == 200) console.log(data)
          else { }
        })
        Swal.fire('Deleted!', '', 'success')        
      } else {
        Swal.fire('', 'Action cancelled!', 'info')
      }
    })    
  }

//   datesInRange: any
//   getDatesInRange(startDate: any, endDate: any) {
//     const start = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
//     const end = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0));
    
//     const date = new Date(start.getTime());

//     const dates = [];

//     while (date <= end) {
//       dates.push(new Date(date));
//       date.setDate(date.getDate() + 1);
//     }
//     this.datesInRange = dates
//   return dates;
// }
  purchasesPDFPayload : any = {}

  fillDatasourcePurchase(data: any){
        this.purchasesPDFPayload = data;
  }

  generatePurchasePDF(input: any){
    let startDate: any = new Date(new Date(input.startDate).setUTCHours(0,0,0,0))
    let endDate: any = new Date(new Date(input.endDate).setUTCHours(0,0,0,0))
    if (input != '') {
      //this.getDatesInRange(start,end)
      let purchaseData = this.purchasesData
      const filteredPurchaseData = purchaseData.filter((item: any) => {
        return new Date(new Date(item.created_at).setUTCHours(0,0,0,0)) >= startDate
        && new Date(new Date(item.created_at).setUTCHours(0,0,0,0)) <= endDate 
      })
      //console.log(inclusive_dates)
      
      this.purchasesPDFPayload = filteredPurchaseData
      input = filteredPurchaseData
      console.log(this.purchasesPDFPayload)
      var options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Purchase Transaction from ' + startDate +' - '+ endDate,
        useBom: true,
        headers: ["_id", "purc_number", "purc_itemName", "purc_itemID", "purc_price", "purc_quantity", "purc_supplier", "created_at", "updated_at"],
        useHeader: true,
        nullToEmptyString: true,
      }
      new AngularCsv(this.purchasesPDFPayload, 'Purchase transaction from ' + startDate+ ' - ' + endDate, options)
    } else {
        //validation
    }

  }

  salesPDFPayload : any = {}

  fillDatasourceSale(data: any){
        this.purchasesPDFPayload = data;
  }

  generateSalePDF(input: any){
    let startDate: any = new Date(new Date(input.startDate).setUTCHours(0,0,0,0))
    let endDate: any = new Date(new Date(input.endDate).setUTCHours(0,0,0,0))
    if (input != '') {
      let saleData = this.salesData
      const filteredSaleData = saleData.filter((item: any) => {
        return new Date(new Date(item.created_at).setUTCHours(0,0,0,0)) >= startDate
        && new Date(new Date(item.created_at).setUTCHours(0,0,0,0)) <= endDate 
      })
      
      this.salesPDFPayload = filteredSaleData
      input = filteredSaleData
      console.log(this.salesPDFPayload)
      var options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Sales transaction from ' + startDate +' - '+ endDate,
        useBom: true,
        headers: ["_id", "sale_number", "sale_itemName", "sale_itemID", "sale_price", "sale_quantity", "sale_supplier", "created_at", "updated_at"],
        useHeader: true,
        nullToEmptyString: true,
      }
      new AngularCsv(this.salesPDFPayload,
        'Sales transaction from ' + startDate+ ' - ' + endDate, options)

      // this.fillDatasourcePurchase(input)

      //   const data = this.purchasePDFkekw.nativeElement
      //     html2canvas(data).then(canvas => {
      //       const width = 200
      //       let height = canvas.height * width / canvas.width

      //     const fileuri = canvas.toDataURL('image/png')
      //     const pdf = new jsPDF('l', 'mm', 'a4')
      //     let position = 0
      //     pdf.addImage(fileuri, 'PNG', 5, 5, width, height)
      //     pdf.save('purchase')
      //   })

    } else {
        //validation
    }

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







  getItemName(itemID: any) {
    let name = ""
    this.inventoriesData.forEach((inventory) => {
      if (inventory._id === itemID) {
        name = inventory.inv_name

      }

    })
    return name
  }



  ///GRAAAPHS

  getPurchaseLine() {
    let linedata = [{}]


    function onlyUnique(value: any, index: any, self: any) {
      return self.indexOf(value) === index;
    }

    let itemIDS = this.purchasesData.map((purchase) => {
      return purchase.purc_itemID
    })

    let unique = itemIDS.filter(onlyUnique)

    let lineColumn = ['month',]

    unique.forEach((unq) => {
      lineColumn.push(this.getItemName(unq))

    })

    linedata.push(lineColumn)


    for (let month = 0; month <= 11; month++) {
      let total = 0 
      this.purchasesData.forEach((purchase) => {
        let date = new Date(purchase.created_at)
        let dateMonth = date.getMonth()
        if (dateMonth == month) {
          total = total + purchase.purc_price
        }
      })

      linedata.push()
    }
    

    console.log(linedata)



    //unique.forEach((uniqSup) => {

    //  let exsuppliers = this.purchasesData.filter((supplier, index) => {
    //    return supplier.purc_itemID === uniqSup
    //  })

    //  let total = 0
    //  let amount = 0
    //  let itemName = ""
    //  let month = 0

    //  for (month = 0; month <= 11; month++) {

    //    exsuppliers.forEach((supplier) => {

    //      let date = new Date(supplier.created_at)
    //      let dateMonth = date.getMonth()
    //      if (dateMonth == month) {

    //        itemName = supplier.purc_itemName
    //        total = total + supplier.purc_price
    //        amount = amount + supplier.purc_quantity

    //      }


    //    })



    //    linedata.push({ month: month, supplier: itemName, amount: amount, total: total })

    //  }






    //})

    //let lineColumnArray: any = []

    //lineColumnArray.push("month")

    //unique.forEach((item) => {
    //  lineColumnArray.push(item)



    //})

    //console.log(lineColumnArray)



  }


  getPurchasePie() {
    console.log(this.purchasesData)
   

    function onlyUnique(value : any, index: any, self : any) {
      return self.indexOf(value) === index;
    }

    let itemIDS = this.purchasesData.map((purchase) => {
      return purchase.purc_itemID
    })

    let unique = itemIDS.filter(onlyUnique)



    let piedata = [{}]

    unique.forEach((uniqSup) => {
      let exsuppliers = this.purchasesData.filter((supplier, index) => {
        return supplier.purc_itemID === uniqSup
      })

      let total = 0
      let amount = 0
      let itemName = ""

      exsuppliers.forEach((supplier) => {
        itemName = supplier.purc_itemName
        total = total + supplier.purc_price
        amount = amount + supplier.purc_quantity
      })

      piedata.push({ supplier: itemName , amount: amount, total: total })

    })

    

    


    //this.purc3Data = linedata.map((data: any, index: any) => {

    //  if (index = 0) {
    //    return
    //  }


    //  return [data.supplier, data.total]

    //})

    //console.log(this.purc3Data)

    this.purcData = piedata.map((data: any) => {
      return [data.supplier, data.total]
    });

    this.purc2Data = piedata.map((data: any) => {
      return [data.supplier, data.amount]
    });

  }

  purcOptions = {
  };
  width = 550
  height = 400


  purcTitle = 'Pie Chart of Sales by Supplier in terms of purchase cost'
  purcChartType : any = "PieChart"
  purcData : any[] = [];
  purcColumnNames = ['Supplier', 'Percentage']  

  purc2Title = 'Pie Chart of Sales by Supplier in terms of purchase volume'
  purc2ChartType: any = "PieChart"
  purc2Data: any[] = [];
  purc2ColumnNames = ['Supplier', 'Percentage']

  purc3Title = 'Pie Chart of Sales by Supplier in terms of purchase volume'
  purc3ChartType: any = "PieChart"
  purc3Data: any[] = [];
  purc3ColumnNames = ['Supplier', 'Percentage']

  makeChart() {




  }  

}

