
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-petty-cash',
  templateUrl: './add-petty-cash.component.html',
  styleUrls: ['./add-petty-cash.component.scss']
})
export class AddPettyCashComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddPettyCashComponent>
  ) { }

  ngOnInit(): void {
    //this.dialogRef.updateSize('100%','50%');
  }

  petCashData: any = {};
  petCashAmount: any;
  petCashDate: any;

  petCashPayload: any;

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPettyCash(){ 
    this.petCashData.pet_amount = this.petCashAmount;
    this.petCashData.pet_date = this.petCashDate;
    this.petCashData.isArchive = 0;
    this.dataService.createItem('pettycash', this.petCashData).subscribe(( data: any) => {
      Swal.fire(
        'Item Added!',
        '',
        'success'
      )
      console.log(data)
      this.dialogRef.close();
    });
 
  }
  
}
