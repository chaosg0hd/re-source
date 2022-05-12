import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';

import { DataService } from 'src/app/services/data/data.service';
import { ConnStatus, Announcement, Employees, TaskBoard, Inventories, Attendance, Time } from 'src/app/services/data/data.model';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recursive',
  templateUrl: './recursive.component.html',
  styleUrls: ['./recursive.component.scss']
})
export class RecursiveComponent implements OnInit {

  @Input() input : any

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
  ) { }

  @ViewChild('taskslaveNewDialog', { static: true }) taskslaveNewDialog!: TemplateRef<any>;

  openDialogSubTask(input: any) {
    this.dialog.open(this.taskslaveNewDialog, { data: input });
  }


  inputData: TaskBoard[] = [];
  /*inputDataSource : any[] = []*/

  ngOnInit(): void {

    this.inputData = this.input
  }


  addSlaveTask(input: any) {


    console.log(input)
    input.master = input._id
    delete input._id

    //console.log(project, master)

    //let input = { project : project, master : master}

    console.log(input)

    this.dataService.post('taskboard/new', { data: input }).subscribe((data) => {
      console.log(data)

    })

  }

}
