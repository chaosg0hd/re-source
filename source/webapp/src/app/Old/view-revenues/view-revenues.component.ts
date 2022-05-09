import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-revenues',
  templateUrl: './view-revenues.component.html',
  styleUrls: ['./view-revenues.component.scss']
})
export class ViewRevenuesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<ViewRevenuesComponent>
  ) { }
  revEdit: any = {}


  number: any
  revSupp: any
  revDesc: any
  revAmount: any
  revBy: any
  revDate: any
  _id: any
  revIsArchive: any
  
  ngOnInit(): void {
    this.number =  this.data.number
    this.revSupp =  this.data.rev_supplier
    this.revDesc =  this.data.rev_desc
    this.revAmount =  this.data.rev_amount
    this.revBy = this.data.rev_by
    this._id =  this.data._id
    this.revIsArchive =  this.data.isArchive
    this.revDate = this.data.rev_date
  }

  onNoClick() : void {
    this.dialogRef.close()
  }

  updateRevenue() {
    this.revEdit.rev_date = this.revDate
    this.revEdit.rev_supplier = this.revSupp
    this.revEdit.rev_desc = this.revDesc
    this.revEdit.rev_by = this.revBy
    this.revEdit.rev_amount = this.revAmount

    this.dataService.updateItem('revenues', this._id, this.revEdit).subscribe((data : any) => {
      console.log(data)
      Swal.fire(
        'Item Updated!',
        '',
        'success'
      )
      this.onNoClick();
    })
  }

  archiveRevenue() {
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
        this.dataService.archiveItem('revenue', this._id, { "isArchive": 1 }).subscribe((data: any) => {
          console.log(data);
        });
        this.onNoClick()
      }
    })
  }

  restoreRevenue() {
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
