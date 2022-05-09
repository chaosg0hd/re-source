import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddItemComponent>,
    private httpClient: HttpClient,
    //private formGroup: FormGroup
  ) { }

  ngOnInit(): void {
    this.countData();
  }
  inventoryForm!: FormGroup;
  body: any = {}; //invdata: any = {}
  name: any;
  description: any;
  quantity: any;
  imageUrl = 'http://localhost:3000/uploads/inventory';
  image: any;
  price: any;
  isArchive = 0;

  upload: any;

  // name: String,
  // description: String, 
  // quantity: Number,
  // price: Number,
  // imageUrl: String,
  // isArchive: Number,

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  counter: any

  countData() {
    this.dataService.getAllItem('inventories').subscribe((data : any) => {
      this.counter = data.length + 1;
    })
  }
  
  addItem() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('quantity', this.quantity);
    formData.append('file', this.image);
    formData.append('price', this.price);
    formData.append('number', this.counter);
    
    this.httpClient.post<any>(environment.BASE_URL+ 'inventories', formData).subscribe((data: any) => {
      console.log(data);
    });
    
    Swal.fire(
      'Item Added!',
      '',
      'success'
    )
    this.dialogRef.close();
  }

}
