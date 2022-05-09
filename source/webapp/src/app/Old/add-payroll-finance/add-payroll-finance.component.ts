import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-payroll-finance',
  templateUrl: './add-payroll-finance.component.html',
  styleUrls: ['./add-payroll-finance.component.scss']
})
export class AddPayrollFinanceComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddPayrollFinanceComponent>
  ) { }

  ngOnInit(): void {
    this.countData();
  }

  countdata: any;

  payrollData: any = {};
  payrollAmount: any;
  payrollBy: any;
  payrollDate: any;
  payrollDesc: any;

  onNoClick(): void {
    this.dialogRef.close();
  }

  countData() {
    this.dataService.getAllItem('payroll').subscribe((data : any) => {
      this.countdata =  data.length;
    })
  }

  addPayroll = async () : Promise <void> => {
    try {
      this.payrollData.purc_amount = this.payrollAmount;
      this.payrollData.purc_by =  this.payrollBy;
      this.payrollData.purc_date = this.payrollDate;
      this.payrollData.purc_desc = this.payrollDesc;
      this.payrollData.number = this.countdata + 1;
      this.payrollData.isArchive = 0;
      
      await this.dataService.createItemss('expenses', this.payrollData);
        Swal.fire(
          'Item Added!',
          '',
          'success'
        )
        this.dialogRef.close();
    } catch (error) {
      console.log(error)
    }

  }
}
