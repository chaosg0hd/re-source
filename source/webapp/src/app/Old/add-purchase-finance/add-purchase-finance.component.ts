import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-purchase-finance',
  templateUrl: './add-purchase-finance.component.html',
  styleUrls: ['./add-purchase-finance.component.scss']
})
export class AddPurchaseFinanceComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddPurchaseFinanceComponent>,
  ) { }

  countdata: any;

  purchaseData: any = {};
  purchasePrice: any;
  purchaseBy: any;
  purchaseDate: any;
  purchaseDesc: any;
  purchaseSupplier: any;
  purchaseQuantity: any;

  ngOnInit(): void {
    this.countData();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  countData(){
    this.dataService.getAllItem('purchases').subscribe((data: any) => {
      console.log(data);
      this.countdata = data.length;
      console.log(this.countdata);
    })
  }

  addPurchase() {
        this.purchaseData.purc_amount = this.purchasePrice;
        this.purchaseData.purc_by =  this.purchaseBy;
        this.purchaseData.purc_date = this.purchaseDate;
        this.purchaseData.purc_desc = this.purchaseDesc;
        this.purchaseData.purc_supplier = this.purchaseSupplier;
        this.purchaseData.purc_quantity = this.purchaseQuantity;
        this.purchaseData.isArchive = 0;
        this.purchaseData.number = this.countdata + 1;
        console.log(this.purchaseData);
        this.dataService.createItem('purchases', this.purchaseData).subscribe(( data: any) => {
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
