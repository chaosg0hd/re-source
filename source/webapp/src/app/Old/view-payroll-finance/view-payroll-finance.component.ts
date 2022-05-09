import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-payroll-finance',
  templateUrl: './view-payroll-finance.component.html',
  styleUrls: ['./view-payroll-finance.component.scss']
})
export class ViewPayrollFinanceComponent implements OnInit {


  constructor(    
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<ViewPayrollFinanceComponent>
  ) { }

  payrEdit: any = {}

  number: any
  payrDesc: any
  payrAmount: any
  payrBy: any
  payrDate: any
  _id: any
  payrIsArchive: any
  
  ngOnInit(): void {
    this.number =  this.data.number
    this.payrDesc =  this.data.payr_desc
    this.payrAmount =  this.data.payr_amount
    this.payrBy = this.data.payr_by
    this._id =  this.data._id
    this.payrIsArchive =  this.data.isArchive
    this.payrDate = this.data.payr_date
  }

  onNoClick() : void {
    this.dialogRef.close()
  }

  updatePayroll() {
    this.payrEdit.payr_date = this.payrDate
    this.payrEdit.payr_desc = this.payrDesc
    this.payrEdit.payr_by = this.payrBy
    this.payrEdit.payr_amount = this.payrAmount

    this.dataService.updateItem('payroll', this._id, this.payrEdit).subscribe((data : any) => {
      console.log(data)
      Swal.fire(
        'Item Updated!',
        '',
        'success'
      )
      this.onNoClick();
    })
  }

  archivePayroll() {
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
        this.dataService.archiveItem('payroll', this._id, { "isArchive": 1 }).subscribe((data: any) => {
          console.log(data);
        });
        this.onNoClick()
      }
    })
  }

  restorePayroll() {
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
        this.dataService.archiveItem('payroll', this._id, { "isArchive": 0 }).subscribe((data: any) => {
          console.log(data);
        });
        this.onNoClick()
      }
    })
  }
}


