import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.scss']
})
export class ViewExpensesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<ViewExpensesComponent>
  ) { }

  expEdit: any = {}

  number: any
  expSupp: any
  expDesc: any
  expAmount: any
  expBy: any
  expDate: any
  _id: any
  expIsArchive: any
  
  ngOnInit(): void {
    this.number =  this.data.number
    this.expSupp =  this.data.exp_supplier
    this.expDesc =  this.data.exp_desc
    this.expAmount =  this.data.exp_amount
    this.expBy = this.data.exp_by
    this._id =  this.data._id
    this.expIsArchive =  this.data.isArchive
    this.expDate = this.data.exp_date
  }

  onNoClick() : void {
    this.dialogRef.close()
  }

  updateExpense() {
    this.expEdit.exp_date
    this.expEdit.exp_supplier
    this.expEdit.exp_desc
    this.expEdit.exp_by
    this.expEdit.exp_amount

    this.dataService.updateItem('expenses', this._id, this.expEdit).subscribe((data : any) => {
      console.log(data)
      Swal.fire(
        'Item Updated!',
        '',
        'success'
      )
      this.onNoClick();
    })
  }

  archiveExpense() {
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
        this.dataService.archiveItem('expenses', this._id, { "isArchive": 1 }).subscribe((data: any) => {
          console.log(data);
        });
        this.onNoClick()
      }
    })
  }

  restoreExpense() {
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
        this.dataService.archiveItem('expenses', this._id, { "isArchive": 0 }).subscribe((data: any) => {
          console.log(data);
        });
        this.onNoClick()
      }
    })
  }
}
