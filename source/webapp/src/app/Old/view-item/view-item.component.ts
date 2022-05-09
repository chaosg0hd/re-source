import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/dataservice.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<ViewItemComponent>,
    private httpClient: HttpClient
  ) { }

  itemEdit: any = {}

  number: any;
  itemId: any;
  item_Id: any;
  imageUrl: any;
  itemName: any;
  itemDesc: any;
  
  itemQty: any;
  itemPrice: any;
  itemIsArchive: any;
  image: any
  
  sellQty: any;

  ngOnInit(): void {
    this.itemId = this.data._id

    this.imageUrl= this.data.imageUrl;
    this.number = this.data.number
    this.itemName = this.data.name
    this.itemDesc = this.data.description
    this.itemQty = this.data.quantity
    this.itemPrice= this.data.price
    this.itemIsArchive = this.data.isArchive
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  updateItem() {
    const formData = new FormData();
    formData.append('id', this.itemId);
    formData.append('name', this.itemName);
    formData.append('description', this.itemDesc);
    formData.append('quantity', this.itemQty);
    formData.append('file', this.image);
    formData.append('price', this.itemPrice);
    
    //const url = environment.BASE_URL +'inventories/update'
    this.httpClient.post<any>(environment.BASE_URL + 'inventories/update', formData).subscribe((data: any) => {
        console.log(data);
      })
    }

  archiveItem() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,archive it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Archived!',
            'Your file has been archived.',
            'success'
          )
          //console.log(i);
          //this.itemId = this.;
          this.dataService.archiveItem('inventories', this.itemId, {"isArchive": 1}).subscribe((data: any) => {
            console.log(data);
          });
        }
      })
      this.dialogRef.close();
    }

  restoreItem() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, restore it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Item Restored!',
          'Your file has been restored.',
          'success'
        )
        //console.log(i);
        //this.itemId = this.;
        this.dataService.archiveItem('inventories', this.itemId, {"isArchive": 0}).subscribe((data: any) => {
          console.log(data);
        });
      }
    })
    this.dialogRef.close();
  }

  //sell item

  salesPayload: any = {}
  salesCounter: any
  getSalesCounter () {
    this.dataService.getAllItem('sales').subscribe((data: any) => {
      this.salesCounter = data.length + 1
      console.log(data.length)
    })
  }

  sellItem() {
    this.salesPayload.sales_quantity = this.sellQty
    this.salesPayload.sales_price = this.itemPrice
    this.salesPayload.sales_by = ''
    this.salesPayload.sales_supplier = ''
    this.salesPayload.sales_date = Date.now()
    this.salesPayload.number = this.salesCounter

    this.dataService.createItem('sales', this.salesPayload).subscribe((data : any) => {
      console.log(data)
    })

    let newQty = this.itemQty - this.sellQty

    this.dataService.archiveItem('inventories', this.itemId, {'quantity': newQty}).subscribe((data: any) => {
      console.log(data)
    })
  }
  
}
