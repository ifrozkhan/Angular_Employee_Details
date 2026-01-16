import { Component, inject, NgModule, OnInit } from '@angular/core';
import { EmployeeDetailsModel } from '../../model/Employee';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {

  employeeDetailsList: EmployeeDetailsModel[] = [];
  empDetailsobj: EmployeeDetailsModel = new EmployeeDetailsModel();
  employeeDetailsForm: FormGroup = new FormGroup({});
  message: string = '';
  genderList = ['male', 'Female'];
  title = 'API Employee Details';
  http = inject(HttpClient);
  isSave = true;
  userForm!: FormGroup;
  searchcontrol: FormControl = new FormControl('');

  constructor(private fb: FormBuilder) {

    this.userForm = this.fb.group({
      empId: ['',Validators.required,Validators.pattern(/^\d+$/)],
      name: ['', Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      type: ['', Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required, Validators.pattern(/^\S(.+)$/)]
    });
  }

  ngOnInit(): void {
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    this.http.get("https://localhost:7199/api/Employee_Details").subscribe((res: any) => {
      this.employeeDetailsList = res;
    }
    )
  }

  onSave(userForm: any) {
    if (this.userForm.valid) {
      this.http.post<EmployeeDetailsModel[]>("https://localhost:7199/api/Employee_Details", this.empDetailsobj).subscribe((res: any) => {
      this.getEmployeeDetails(); this.onReset(userForm);
      this.message='Data save successfully';
      this.userForm.reset();
    }, err => {
      console.error(err);
      this.showMessage('Error saving data');
    })
      return;
    }
   
  }

  onEdit(id: number) {
    this.isSave = false;
    this.http.get<EmployeeDetailsModel>("https://localhost:7199/api/Employee_Details/" + id).subscribe((res: any) => {
      debugger;
      this.empDetailsobj = res;
    })
  }

  onUpdate(userForm: NgForm) {
    if (!userForm || !userForm.valid) {
      this.showMessage('Please fill all required fields');
      return;
    }
    this.http.put("https://localhost:7199/api/Employee_Details/" + this.empDetailsobj.emp_ID, this.empDetailsobj).subscribe((res: any) => {
      debugger;
      this.getEmployeeDetails();
      this.isSave = true;
      this.onReset(userForm);
      this.showMessage('Data updated successfully')
    }, err => {
      console.error(err);
      this.showMessage('Error updating data');
    })
  }

  onDelete(id: number) {
    const result = confirm("Are you sure want to delete");
    if (result) {
      this.http.delete<EmployeeDetailsModel>("https://localhost:7199/api/Employee_Details/" + id).subscribe((res: EmployeeDetailsModel) => {
        this.getEmployeeDetails();
        const result = alert("Data deleted Successfully");
      })
    }
  }
  onReset(userForm: NgForm) {
    this.empDetailsobj = new EmployeeDetailsModel();
    this.isSave = true;
    if (userForm) userForm.resetForm();
    this.showMessage('Data reseted successfully');
    //   this.empobj ={
    //     id: undefined, empId: 0, name : "", city : "", state : "", emailId : "", contactNO : "", address : "", pincode : ""
    //   };
  }
  showMessage(msg: string){
    try{
      this.message = (typeof msg === 'object') ? JSON.stringify(msg) : (msg as string);
    }catch(e){
      this.message = String(msg);
    }
    setTimeout(()=> {
      this.message ='';
    }, 3000)
  }
}
