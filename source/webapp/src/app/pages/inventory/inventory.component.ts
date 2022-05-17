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
    private libraryService: LibraryService
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

  @ViewChild('invAddInvoiceDialog', { static: true }) invAddInvoiceDialog!: TemplateRef<any>;

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

        this.getPurchasePie()

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
        Swal.fire('Item Added!', '', 'success')

      })
  }



  //sales
  addSale(input: any) {




    let saleData: any = {}

    
    saleData.purc_itemID = input._id
    saleData.sale_itemName = input.inv_name
    saleData.sale_supplier = input.inv_supplier
    saleData.sale_price = input.sale_quantity * input.sale_price
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

    console.log()
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



  toggleArchive() {

    if (this.isToggleArchive) {
      this.isToggleArchive = false
    }
    else {
      this.isToggleArchive = true
    }

    this.getInventories()
  }











  ///GRAAAPHS


  getPurchasePie() {
    console.log(this.purchasesDataSource.data)

    function onlyUnique(value : any, index: any, self : any) {
      return self.indexOf(value) === index;
    }

   
    

     // ['a', 1, 2, '1']

    let suppliers = this.purchasesDataSource.data.map((purchase) => {
      return purchase.purc_itemID
    })

    let unique = suppliers.filter(onlyUnique)

    console.log(unique)
    console.log(suppliers)


  }


  title = 'Pie Chart of Sales by Supplier'
  chartType : any = "PieChart"
  data = [
    ['Firefox', 45.0],
    ['IE', 26.8],
    ['Chrome', 12.8],
    ['Safari', 8.5],
    ['Opera', 6.2],
    ['Others', 0.7]
  ];
  columnNames = ['Browser', 'Percentage']
  options = {
  };
  width = 550
  height = 400

  makeChart() {




  }



  












  

}

