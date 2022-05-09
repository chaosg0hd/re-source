import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-saless',
  templateUrl: './add-saless.component.html',
  styleUrls: ['./add-saless.component.scss']
})
export class AddSalessComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddSalessComponent>,
  ) { }

  countdata: any;

  salesData: any = {};
  salesAmount: any;
  salesBy: any;
  salesDate: any;
  salesDesc: any;

  ngOnInit(): void {
    this.countData();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  countData(){
    this.dataService.getAllItem('sales').subscribe((data: any) => {
      console.log(data);
      this.countdata = data.length;
      console.log(this.countdata);
    })
  }

  addSales() {
    this.salesData.sales_amount = this.salesAmount;
    this.salesData.sales_by =  this.salesBy;
    this.salesData.sales_date = this.salesDate;
    this.salesData.sales_desc = this.salesDesc;
    this.salesData.isArchive = 0;
    this.salesData.number = this.countdata + 1;
    console.log(this.salesData);
    this.dataService.createItem('sales', this.salesData).subscribe(( data: any) => {
      Swal.fire(
        'Item Added!',
        '',
        'success'
      )
      this.dialogRef.close();
      console.log(data)
    });
  }

}
