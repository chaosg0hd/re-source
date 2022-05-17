
export interface Announcement{

  _id: string,
  anno_title: string,
  anno_content: string,
  anno_start_date: Date,
  anno_end_date: Date,

  isArchive: number,

  created_at: Date,
  updated_at: Date

}

export interface Attendance{

  _id: string,
  atten_number: number,
  atten_emp_id: string,
  atten_emp_name: string,
  atten_date: Date,
  atten_seconds: number,
  atten_status: string,

  isArchive: number,

  created_at: Date,
  updated_at: Date
}

export interface Employee{

  _id: string,
  emp_number: number,
  emp_id: string,
  emp_lname: string,
  emp_fname: string,
  emp_mname: string,
  emp_extname: string,
  emp_start_date: Date,
  emp_birth_date: Date,
  emp_address: string,
  emp_position: string,
  emp_department: string,
  emp_rate: string,
  emp_rate_type: string,
  emp_role: string,

  emp_imgUrl: string,

  emp_password: string,

  isArchive: number,

  created_at: Date,
  updated_at: Date

}

export interface File{

  _id: string,
  gal_url: string,
  gal_name: string,
  gal_description: string,

  gal_uploaded_date: Date

  isArchive: number,

  created_at: Date,
  updated_at: Date
}

export interface Gallery{

  _id: string,
  gal_url: string,
  gal_name: string,
  gal_description: string,

  gal_uploaded_date: Date,

  isArchive: number,

  created_at: Date,
  updated_at: Date
}

export interface Inventory{

  _id: string,
  inv_id: string,
  inv_name: string,
  inv_category: string,
  inv_brand: string,
  inv_description: string,
  inv_quantity: number,
  inv_price: number,
  inv_imageUrl: string,
  inv_supplier: string,
  inv_min_amount: number,

  isArchive: {
    type: number, default: 0
  },

  created_at: Date,
  updated_at: Date

}


export interface Expense {

  _id: string,
  exp_number: number,
  exp_date: Date,
  exp_ref: string,
  exp_name: string,
  exp_desc: string,
  exp_supplier: string,
  exp_amount: number,
  exp_by: string,

  isArchive: number,

  created_at: Date,
  updated_at: Date
}

export interface Payroll{

  _id: string,
  pay_number: number,
  pay_date: Date,
  pay_ref: string,
  pay_name: string,
  pay_desc: string,
  pay_supplier: string,
  pay_amount: number,
  pay_by: string,

  isArchive: number,

  created_at: Date,
  updated_at: Date
}

export interface Petty_Cash {

  _id: string,
  pet_number: number,
  pet_date: Date,
  pet_ref: string,
  pet_name: string,
  pet_desc: string,
  pet_supplier: string,
  pet_amount: number,
  pet_by: string,

  isArchive: number,

  created_at: Date,
  updated_at: Date
}


export interface Purchase {

  _id: string,
  purc_number: number,
  purc_itemID: string,
  purc_itemName: string,
  purc_supplier: string,
  purc_price: number,
  purc_quantity: number,
  purc_by: string,

  isArchive: number,

  created_at: Date,
  updated_at: Date
}

export interface Revenue {

  _id: string,
  rev_number: number,
  rev_date: Date,
  rev_ref: string,
  rev_name: string,
  rev_desc: string,
  rev_supplier: string,
  rev_amount: number,
  rev_by: string,

  isArchive: number,

  created_at: Date,
  updated_at: Date
}

export interface Sale {

  _id: string,
  rev_number: number,
  rev_date: Date,
  rev_ref: string,
  rev_name: string,
  rev_desc: string,
  rev_supplier: string,
  rev_amount: number,
  rev_by: string,

  isArchive: number,

  created_at: Date,
  updated_at: Date
}


export interface Task_Board {

  _id: string,
  task_id: String,
  task_number: string,
  task_project: string,
  task_progress: number,
  task_type: string,
  task_value: number,
  task_name: string,
  task_content: string,
  task_end_date: Date,
  task_start_date: Date,
  task_emp_id: any[],
  task_by: string,

  isArchive: number,

  created_at: Date,
  updated_at: Date
}


export interface Time {

  _id: string,
  emp_id: string,
  createdAt: Date,
}

export interface Supplier {
    supp_id: string,
    supp_number: number,
    //sale_ref: String,
    supp_name: string,
    //sale_desc: String,
    supp_contactNum: string,
    supp_contactPerson: string,

    isArchive: number,

    created_at: Date,
    updated_at: Date
}











