export class EmployeeModel {
    id: any;
    empId: any;
    name: string;
    city: string;
    state: string;
    emailId: string;
    contactNO: string;
    address: string;
    pincode: string;
constructor() {
    this.id = undefined; 
    this.empId = null;
    this.name = "";
    this.city = "";
    this.state = "";
    this.emailId = "";
    this.contactNO = "";
    this.address = "";
    this.pincode = "";
}
}

export class EmployeeDetailsModel {
    emp_ID: any;
    emp_Name: string;
    type: string;
    gender: string;
    dob: string;
    address: string;
constructor() {
    this.emp_ID = "";
    this.emp_Name = "";
    this.type = "";
    this.gender = "";
    this.dob = "";
    this.address = "";
}
}