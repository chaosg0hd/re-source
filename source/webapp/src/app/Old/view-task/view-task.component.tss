import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data/dataservice.service';
import Swal from 'sweetalert2';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dataService: DataService,
    private dialogRef: MatDialogRef<ViewTaskComponent>
  ) { }

  taskBoardEdit: any = {}
  taskName: any
  taskContent: any
  _id: any
  number: any
  taskIsArchive: any

  ngOnInit(): void {
    this.taskName = this.data.taskBoard_name
    this.taskContent = this.data.taskBoard_content
    this._id = this.data._id
    this.number = this.data.number
    this.taskIsArchive = this.data.isArchive
    console.log(this.taskIsArchive);
  }

  onNoClick(){
    this.dialogRef.close();
  }

  updateTask() {
    this.taskBoardEdit.taskBoard_name = this.taskName
    this.taskBoardEdit.taskBoard_content = this.taskContent

    this.dataService.updateItem('taskboard', this._id, this.taskBoardEdit).subscribe((data : any) => {
      Swal.fire(
        'Task Updated!',
        '',
        'success'
      )
      console.log(data)
      this.onNoClick()
    })
  }

  archiveTask() {
    this.dataService.archiveItem('taskboard', this._id, {"isArchive": 1}).subscribe((data : any) => {
      Swal.fire(
        'Task Archived',
        '',
        'success'
      )
      this.onNoClick()
      console.log(data)
    })
  }

  restoreTask() {
    this.dataService.archiveItem('taskboard', this._id, {"isArchive": 0}).subscribe((data : any) => {
      Swal.fire(
        'Task Restored',
        '',
        'success'
      )
      this.onNoClick()
      console.log(data)
    })
  }

}
