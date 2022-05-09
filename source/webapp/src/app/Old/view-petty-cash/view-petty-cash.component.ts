import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-petty-cash',
  templateUrl: './view-petty-cash.component.html',
  styleUrls: ['./view-petty-cash.component.scss']
})
export class ViewPettyCashComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<ViewPettyCashComponent>
  ) { }

  // number: Number,
  //   id: String,
  //   pet_date: Date,
  //   pet_desc: String,
  //   pet_amount: Number,
  //   pet_by: String,
    
  //   isArchive: Number,
  //   created_at: Date,
  //   updated_at: Date

  petEdit: any = {}

  number: any
  petDesc: any
  petAmount: any
  petBy: any
  petDate: any
  _id: any
  petIsArchive: any
  
  ngOnInit(): void {
    this.number =  this.data.number
    this.petDesc =  this.data.pet_desc
    this.petAmount =  this.data.pet_amount
    this.petBy = this.data.pet_by
    this._id =  this.data._id
    this.petIsArchive =  this.data.isArchive
    this.petDate = this.data.pet_date
  }

  onNoClick() : void {
    this.dialogRef.close()
  }

  updatePettyCash() {
    this.petEdit.exp_date = this.petDate
    this.petEdit.exp_desc = this.petDesc
    this.petEdit.exp_by = this.petBy
    this.petEdit.exp_amount = this.petAmount

    this.dataService.updateItem('pettycash', this._id, this.petEdit).subscribe((data : any) => {
      console.log(data)
      Swal.fire(
        'Item Updated!',
        '',
        'success'
      )
      this.onNoClick();
    })
  }

  archivePettyCash() {
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
        this.dataService.archiveItem('pettycash', this._id, { "isArchive": 1 }).subscribe((data: any) => {
          console.log(data);
        });
        this.onNoClick()
      }
    })
  }

  restorePettyCash() {
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
        this.dataService.archiveItem('pettycash', this._id, { "isArchive": 0 }).subscribe((data: any) => {
          console.log(data);
        });
        this.onNoClick()
      }
    })
  }
}

