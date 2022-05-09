import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    private httpClient: HttpClient,
    //private formGroup: FormGroup
  ) { }

  ngOnInit(): void {
  }

  taskBoardForm!: FormGroup;
  //body: any = {}; //invdata: any = {}
  taskName: any;
  taskContent: any;
  imageUrl = 'http://localhost:3000/uploads/taskboard';
  image: any;
  number: any;
  isArchive = 0;

  upload: any;

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


  addTask() {
    this.countData();
    const formData = new FormData();
    formData.append('taskBoard_name', this.taskName);
    formData.append('taskBoard_content', this.taskContent);
    formData.append('file', this.image);
    formData.append('number', this.counter);
    //formData.append('isArchive', 0);

    const url = 'http://localhost:3000/taskboard/'
    this.httpClient.post<any>(url, formData).subscribe((data: any) => {
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


//   constructor(

//   ) { }

//   ngOnInit(): void {
//     this.countData();
//   }
//   inventoryForm!: FormGroup;
//   body: any = {}; //invdata: any = {}
//   name: any;
//   description: any;
//   quantity: any;
//   imageUrl = 'http://localhost:3000/uploads/inventory';
//   image: any;
//   price: any;
//   isArchive = 0;

//   upload: any;

//   // name: String,
//   // description: String,
//   // quantity: Number,
//   // price: Number,
//   // imageUrl: String,
//   // isArchive: Number,

//
//  

//   counter: any

//   countData() {
//     this.dataService.getAllItem('inventories').subscribe((data : any) => {
//       this.counter = data.length + 1;
//     })
//   }

//   addItem() {
//     

// }
