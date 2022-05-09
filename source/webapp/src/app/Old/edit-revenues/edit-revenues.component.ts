import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-revenues',
  templateUrl: './edit-revenues.component.html',
  styleUrls: ['./edit-revenues.component.scss']
})
export class EditRevenuesComponent implements OnInit {

  
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<EditRevenuesComponent>

  ) { }

  editItem: any;

  revId: any;
  revAmount: any;
  revDesc: any;
  revDate: any;
  revBy: any;

  updatePushItem: any = {};
  id: any;

  ngOnInit(): void {
    this.editItem = this.data
    this.revId =  this.editItem._id;
    this.revAmount = this.editItem.rev_amount
    this.revDesc = this.editItem.rev_desc
    this.revDate = this.editItem.rev_date
    this.revBy = this.editItem.rev_by
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getItem(){
    this.id = this.editItem._id;
    //this.getItem().subscribe((data: any)=> {});
  }

  updateItem(){
    console.log(this.revId);
    this.id =  this.revId;
    this.updatePushItem.rev_amount = this.revAmount;
    this.updatePushItem.rev_by = this.revBy;
    this.updatePushItem.rev_desc = this.revDesc;
    this.updatePushItem.rev_date = this.revDate;

    console.log(this.updatePushItem.name);
    //console.log('clicked')
    this.dataService.updateItem('revenues', this.id, this.updatePushItem).subscribe((data: any) => {
      Swal.fire(
        'Item Updated!',
        '',
        'success'
      )
      this.dialogRef.close();
    });
  }

}
