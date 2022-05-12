export interface ConnStatus{  
  content: JSON;
  message: string;
  status: any;
}


export interface Announcement{
  announcement_title: string,
  announcement_content: string,

  announcement_end_date: Date,

  isArchive: number,
  created_at: Date,
  updated_at: Date

}

export interface Employees{

  number: number,
  emp_id: string,
  lname: string,
  fname: string,
  mname: string,
  extname: string,
  start_Date: Date,
  birth_Date: Date,
  address: string,
  position: string,
  department: string,
  rate: string,
  rate_Type: string,
  role: string,
  password: string,
  isArchive: number,
  imgUrl: string,
  created_at: Date,
  updated_at: Date

}

export interface Time {
  _id: string,
  emp_id: string,
  createdAt: Date,
}


export interface Attendance{
  number: number;
  _id: string;
  emp_id: string;
  name: string;
  attendance_date: string;
  attendance_seconds: number;
}

export interface TaskBoard {

  _id: string,

  task_id: string,

  number: string,
  project: string,
  progress: number,
  value: number,
  name: string,
  content: string,
  end_date: Date,
  master: string,
  slave: any[],
  taskBoard_employees: any[],

  task_by: string,

  isArchive: number,
  created_at: Date,
  updated_at: Date


}

export interface Inventories {
  
  number: number,
  _id: string,
  inv_id: string,
  name: string,
  category: string,
  description: string,
  quantity: number,
  price: number,
  imageUrl: string,
  supplier: string,
  min_amount: number,

  isArchive: number,
  created_at: Date,
  updated_at: Date

}

export interface Payroll {

  number: Number,
  payr_date: Date,
  payr_suplier: { type: String, default: 'Company' },

  isValid: Number,
  isArchive: Number,

  created_at: Date,
  updated_at: Date

}








