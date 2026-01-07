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