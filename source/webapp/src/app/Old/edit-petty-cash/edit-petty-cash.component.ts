import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-petty-cash',
  templateUrl: './edit-petty-cash.component.html',
  styleUrls: ['./edit-petty-cash.component.scss']
})
export class EditPettyCashComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<EditPettyCashComponent>

  ) { }

  editItem: any;

  petId: any;
  petAmount: any;
  petDate: any;

  updatePushItem: any = {};
  id: any;

  ngOnInit(): void {
    this.editItem = this.data
    this.petId =  this.editItem._id;
    this.petAmount = this.editItem.pet_amount
    this.petDate = this.editItem.pet_date
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDate(event: Event): void {
    this.petDate.date = event;
  }

  updateItem(){
    this.id =  this.petId;
    this.updatePushItem.pet_amount = this.petAmount;
    this.updatePushItem.pet_date = this.petDate;
    this.dataService.updateItem('pettycash', this.id, this.updatePushItem).subscribe((data: any) => {
      Swal.fire(
        'Item Updated!',
        '',
        'success'
      )
      this.dialogRef.close();
    });
  }

}
