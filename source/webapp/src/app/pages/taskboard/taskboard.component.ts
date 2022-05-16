import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType, Row } from 'angular-google-charts';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LibraryService } from 'src/app/services/library/library.service';
import Swal from 'sweetalert2';
import { Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Announcement, Employee, Task_Board, Inventory, Attendance, Time } from 'src/app/services/data/data.model';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})
export class TaskboardComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private dialog : MatDialog,
    private httpClient: HttpClient,
    private libraryService: LibraryService
  ) { }

  

  @ViewChild('taskNewDialog', { static: true }) taskNewDialog!: TemplateRef<any>;

  @ViewChild('taskProjectNewDialog', { static: true }) taskProjectNewDialog!: TemplateRef<any>;

  @ViewChild('fileUploadNewDialog', { static: true }) fileUploadNewDialog!: TemplateRef<any>;

  openDialogNewProject() {
    var input = {}
    this.dialog.open(this.taskProjectNewDialog, { data: input });
  }

  openDialogNewTask(project: any) {

    console.log(project)
    var input = {task_project : project}
    this.dialog.open(this.taskNewDialog, { data: input });
  }

  //openDialogSubTask(input : any) {
  //  this.dialog.open(this.taskSlaveNewDialog, { data: input });
  //}

  fileUpload() {
    var input = {}
    this.dialog.open(this.fileUploadNewDialog, { data: input });
  }


  ngOnInit(): void {
    this.loadOnLoop();
  }

  //OOP
  isLoaded: boolean = false;

  async loadOnLoop() {

    //Event Loop Starts Here    
    this.checkIfMobile();

    this.loadTab(this.activeTab);
    /*this.getStatus();*/

    this.isLoaded = true;
    this.isLoadedTab = true;

    await this.delay(60000);
    this.reloadLoop();


    //Event Loop End Here
  }

  //LoadTabData

  isLoadedTab = false;
  activeTab = 0

  async loadTab(event: any) {


    let tab = 0
    /*this.activeTab = event.index*/

    if (typeof event == 'object') {
      tab = event.index
      this.activeTab = tab
    }
    else {
      tab = this.activeTab
    }


    switch (tab) {
      case 0:

        this.isLoadedTab = false;
        this.getTasks()

        

        await this.delay(1000);
        this.isLoadedTab = true;


        break;

      case 1:

        this.isLoadedTab = false;

        

        await this.delay(1000);
        this.isLoadedTab = true;

        break;

      case 2:

        this.isLoadedTab = false;

        

        await this.delay(1000);
        this.isLoadedTab = true;

        break;

      default:
    }
  }

  reloadLoop() {
    this.loadOnLoop()
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Check if Mobile

  isMobile!: boolean

  checkIfMobile() {
    this.isMobile = this.libraryService.getIsMobile()
  }


  employeesPayload: any;
  employeesData: Employee[] = [];
  employeesDataSource = new MatTableDataSource(this.employeesData);
  employeesDisplayedColumns = ['name', 'number', 'emp_id', 'age', 'address', 'position', 'department', 'rate', 'rate_type', 'role', 'status', 'actions'];

  getEmployees() {

    this.dataService.get('employees/get')
      .subscribe((data) => {

        console.log(data)

        this.employeesPayload = data
        this.employeesData = this.employeesPayload.data
        this.employeesDataSource.data = this.employeesData

        //if (this.isToggleArchive == false) {
        //  let array: any[] = [];
        //  this.employeesData.map((data) => { if (data.isArchive != 1) { array.push(data) } })
        //  this.employeesData = array
        //  console.log(array)
        //}
        //else {
        //  this.employeesData = this.employeesPayload.data

        //}

        
        //this.employeesDataSource.paginator = this.empPaginator
        //this.employeesDataSource.sort = this.empSort;
      });
  }



  tasksPayload: any
  tasksData: Task_Board[] = []
  tasksDataSource = new MatTableDataSource(this.tasksData)
  projectsArray: any[] = []

  isToggleArchive = false



  getTasks() {

    this.dataService.get('task_boards/get')
      .subscribe((data) => {

        console.log(data)

        this.tasksPayload = data;
        this.tasksData = this.tasksPayload.data;
        this.tasksDataSource.data = this.tasksData

        this.sortProjects()

        

        //if (this.isToggleArchive == false) {
        //  let array: any[] = [];
        //  this.tasksData.map((data) => { if (data.isArchive != 1) { array.push(data) } })
        //  this.tasksData = array
        //  console.log(array)
        //}
        //else {
        //  this.tasksData = this.tasksPayload.data

        //}

        /*this.tasksData = this.tasksPayload.data*/
        
        //this.tasksDataSource.paginator = this.taskPaginator
        //this.tasksDataSource.sort = this.taskSort;
      });
  }

  sortProjects() {

    let projects_array: any[] = []
    let unsorted_array: any[] = []

    if (projects_array.length == 0) {
      projects_array.push(this.tasksDataSource.data[0].task_project)
    }

    function checkIfUnq(task: any) {
      let hasMatch = false
      projects_array.map((project) => {
        if (task == project) {
          hasMatch = true
        }
        else {

        }
        

      })
      return hasMatch
    }

    this.tasksDataSource.data.map((task) => {      

      projects_array.map((project) => {        

        if (checkIfUnq(task.task_project) == false) {
          projects_array.push(task.task_project)

        }

      })

    })    

    this.projectsArray = projects_array

    console.log(this.projectsArray)

    this.tasksDataSource.data.map((array, index) => {

      if (array.task_project == "" || array.task_project == undefined) {

        projects_array.push(array)        

      }
      else {

        unsorted_array.push(array)

      }
    })

  }






  //sortProjects() {

  //  let array: any[] = []
  //  let projects_array: Task_Board[] = []
  //  let unsorted_array: Task_Board[] = []
  //  let sorted_array: Task_Board[] = []

  //  unsorted_array = this.tasksDataSource.data

  //  function getTasks(masterID: any) {

  //    let slavearray: any = []

  //    unsorted_array.map((array) => {
  //      if (array.task_master == masterID) {
  //        slavearray.push(array)
  //      }

  //    })
  //    return (slavearray)
  //  }
       


  //  let new_array: any[] = []

  //  unsorted_array.map((array, index) => {
      
  //    if (array.task_master == "" || array.task_master == undefined) {

  //      projects_array.push(array)        

  //    }
  //    else {

  //      new_array.push(array)
        
  //    }
  //  })

  //  console.log(new_array)
  //  unsorted_array = new_array

  //  projects_array.map((project) => {

  //    project.task_slave = []
  //    project.task_slave = getTasks(project._id)

  //    project.task_slave.map((slave) => {

  //      slave.task_slave = []
  //      slave.task_slave = getTasks(slave._id)
        
  //      slave.task_slave.map((nextslave : any) => {

  //        nextslave.task_slave = []
  //        nextslave.task_slave = getTasks(nextslave._id)

  //      })

  //    })


     
  //  })





  //  this.tasksDataSource.data = projects_array

  //  console.log(unsorted_array)
  //  console.log(projects_array)
    




  //}

  

  //addSlaveTask(input: any) {

    

  //  input.master = input._id
  //  delete input._id

  //  //console.log(project, master)

  //  //let input = { project : project, master : master}

  //  console.log(input)

  //  this.dataService.post('taskboard/new', { data: input }).subscribe((data) => {
  //    console.log(data)

  //  })

  //}

  newProject(input: any) {

    this.dataService.post('task_boards/new', { data: input }).subscribe((data) => {
      console.log(data)

    })

  }

  newTask(input: any) {

    this.dataService.post('task_boards/new', { data: input }).subscribe((data) => {
      console.log(data)

    })

  }

  editTask(input: any) {

    this.dataService.patch('task_boards/edit', { data: input }).subscribe((data) => {
      console.log(data)
    })

  }

  archiveTask(input: any) {

    input.isArchive = 1;

    this.dataService.patch('taskboard/edit', { data: input }).subscribe((data) => {
      console.log(data)
    })

  }

  ////file upload
  //image: any
  //selectImage(event: any) {
  //  if (event.target.files.length > 0) {
  //    const file = event.target.files[0];
  //    this.image = file;
  //  }
  //}

  //newFile(input: any) {
  //  const fileData = new FormData();
  //  fileData.append('file', this.image)
  //  console.log(this.image)
  //  this.httpClient.post<any>('http://localhost:3000/api/uploads/', fileData).subscribe((data: any) => {
  //    console.log(data)

  //    this.getEmployees()
      
  //  })
  //}



  //addTask() {
  //  const dialogRef = this.dialog.open(AddTaskComponent, {
  //    height: '75%',
  //    width: '100%'
  //  });

  //  dialogRef.afterClosed().subscribe(() => this.getAllTaskBoard())
  //}

  //viewTask(data: any) {
  //  const dialogRef = this.dialog.open(ViewTaskComponent, {
  //    height: '75%',
  //    width: '100%',
  //    data: data
      
  //  })
  //  console.log(data)
  //  dialogRef.afterClosed().subscribe(()=> this.getAllTaskBoard())
  //}

}
