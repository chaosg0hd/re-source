const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({

  emp_number: Number,
  emp_id: String,
  emp_lname: String,
  emp_fname: String,
  emp_mname: String,
  emp_extname: String,
  emp_start_date: Date,
  emp_birth_date: Date,
  emp_address: String,
  emp_position: String,
  emp_role: { type: String, default: "sales_clerk" },
  emp_contactNum: String,
  emp_email: String,
  emp_otp: String,
//change to false
  emp_isVerified: { type: Boolean, default: true },

  emp_imageb64: String,

  emp_imgUrl: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
  },

  emp_password: String,

  isArchive: {
    type: Number,
    default: 0
  },

  created_at: Date,
  updated_at: Date
});

EmployeeSchema.pre("save", function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
