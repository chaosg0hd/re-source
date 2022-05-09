import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-saless',
  templateUrl: './view-saless.component.html',
  styleUrls: ['./view-saless.component.scss']
})
export class ViewSalessComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
      private dialogRef: MatDialogRef<ViewSalessComponent>
  ) { }

  salesEdit: any = {}

  number: any
  salesSupp: any
  salesDesc: any
  salesPrice: any
  salesBy: any
  salesDate: any
  salesQty: any
  _id: any
  salesIsArchive: any

  ngOnInit(): void {
    this.number = this.data.number
    this.salesSupp = this.data.sales_supplier
    this.salesDesc = this.data.sales_desc
    this.salesPrice = this.data.sales_amount
    this.salesBy = this.data.sales_by
    this._id = this.data._id
    this.salesIsArchive = this.data.isArchive
    this.salesDate = this.data.sales_date
  }

  onNoClick() : void {
    this.dialogRef.close()
  }

  updateSales() {
    this.salesEdit.rev_date = this.salesDate
    this.salesEdit.rev_supplier = this.salesSupp
    this.salesEdit.rev_desc = this.salesDesc
    this.salesEdit.rev_by = this.salesBy
    this.salesEdit.rev_price = this.salesPrice
    this.salesEdit.rev_quantity = this.salesQty

    this.dataService.updateItem('sales', this._id, this.salesEdit).subscribe((data: any) => {
      console.log(data)
      Swal.fire(
        'Item Updated!',
        '',
        'success'
      )
      this.onNoClick();
    })
  }

  archiveSales() {
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
        this.dataService.archiveItem('sales', this._id, { "isArchive": 1 }).subscribe((data: any) => {
          console.log(data);
        });
        this.onNoClick()
      }
    })
  }

  restoreSales() {
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
        this.dataService.archiveItem('sales', this._id, { "isArchive": 0 }).subscribe((data: any) => {
          console.log(data);
        });
        this.onNoClick()
      }
    })
  }
}


