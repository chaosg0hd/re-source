import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-purchase-finance',
  templateUrl: './view-purchase-finance.component.html',
  styleUrls: ['./view-purchase-finance.component.scss']
})
export class ViewPurchaseFinanceComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<ViewPurchaseFinanceComponent>
  ) { }

  purcEdit: any = {}

  number: any
  purcSupp: any
  purcDesc: any
  purcPrice: any
  purcBy: any
  purcDate: any
  purcQty: any
  _id: any
  purcIsArchive: any
  
  ngOnInit(): void {
    this.number =  this.data.number
    this.purcSupp =  this.data.purc_supplier
    this.purcDesc =  this.data.purc_desc
    this.purcPrice =  this.data.purc_amount
    this.purcBy = this.data.purc_by
    this._id =  this.data._id
    this.purcIsArchive =  this.data.isArchive
    this.purcDate = this.data.purc_date
  }

  onNoClick() : void {
    this.dialogRef.close()
  }

  updatePurchase() {
    this.purcEdit.rev_date = this.purcDate
    this.purcEdit.rev_supplier = this.purcSupp
    this.purcEdit.rev_desc = this.purcDesc
    this.purcEdit.rev_by = this.purcBy
    this.purcEdit.rev_price = this.purcPrice
    this.purcEdit.rev_quantity = this.purcQty

    this.dataService.updateItem('purchase', this._id, this.purcEdit).subscribe((data : any) => {
      console.log(data)
      Swal.fire(
        'Item Updated!',
        '',
        'success'
      )
      this.onNoClick();
    })
  }

  archivePurchase() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, archive it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Archived!',
          'Your file has been archived.',
          'success'
        )
        this.dataService.archiveItem('purchase', this._id, { "isArchive": 1 }).subscribe((data: any) => {
          console.log(data);
        });
        this.onNoClick()
      }
    })
  }

  restorePurchase() {
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
          'Restored!',
          'Your file has been archived.',
          'success'
        )
        this.dataService.archiveItem('purchase', this._id, { "isArchive": 0 }).subscribe((data: any) => {
          console.log(data);
        });
        this.onNoClick()
      }
    })
  }
}

