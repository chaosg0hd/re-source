import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-expenses',
  templateUrl: './edit-expenses.component.html',
  styleUrls: ['./edit-expenses.component.scss']
})
export class EditExpensesComponent implements OnInit {

 
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<EditExpensesComponent>

  ) { }

  editItem: any;

  expId: any;
  expAmount: any;
  expDesc: any;
  expDate: any;
  expBy: any;

  updatePushItem: any = {};
  id: any;

  ngOnInit(): void {
    this.editItem = this.data
    this.expId =  this.editItem._id;
    this.expAmount = this.editItem.exp_amount
    this.expDesc = this.editItem.exp_desc
    this.expDate = this.editItem.exp_date
    this.expBy = this.editItem.exp_by
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateItem(){
    this.id =  this.expId;
    this.updatePushItem.exp_amount = this.expAmount;
    this.updatePushItem.exp_by = this.expBy;
    this.updatePushItem.exp_desc = this.expDesc;
    this.updatePushItem.exp_date = this.expDate;

    console.log(this.updatePushItem.name);
    //console.log('clicked')
    this.dataService.updateItem('expenses', this.id, this.updatePushItem).subscribe((data: any) => {
      Swal.fire(
        'Item Updated!',
        '',
        'success'
      )
      this.dialogRef.close();
    });
  }

}
