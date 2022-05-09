import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-revenues',
  templateUrl: './add-revenues.component.html',
  styleUrls: ['./add-revenues.component.scss']
})
export class AddRevenuesComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddRevenuesComponent>
  ) { }

  ngOnInit(): void {
    this.countData();
  }

  countdata: any;

  revenuesData: any = {};
  revAmount: any;
  revBy: any;
  revDate: any;
  revDesc: any;

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  addRevenues() {
    this.revenuesData.rev_amount = this.revAmount;
    this.revenuesData.rev_by =  this.revBy;
    this.revenuesData.rev_date = this.revDate;
    this.revenuesData.rev_desc = this.revDesc;
    this.revenuesData.isArchive = 0;
    this.revenuesData.number = this.countdata++;
    console.log(this.revenuesData);
    this.dataService.createItem('revenues', this.revenuesData).subscribe(( data: any) => {
      Swal.fire(
        'Item Added!',
        '',
        'success'
      )
      this.dialogRef.close();
      console.log(data)
    });
  }

  countData(){
    this.dataService.getAllItem('revenues').subscribe((data: any) => {
      console.log(data);
      this.countdata = data.length;
      console.log(this.countdata);
    })
  }


}
