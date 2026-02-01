import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel } from '../../model/Employee';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MasterService } from '../../service/master';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Appstore } from '../../ngrx-store/counter.reducer';
@Component({
  selector: 'home',
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Angular_Employee_Details';
  employeeList: EmployeeModel[] = [];
  empobj: EmployeeModel = new EmployeeModel();
  employeeForm: FormGroup = new FormGroup({});
  message: string = '';
  http = inject(HttpClient);
  

  constructor() {
    // this.createForm();
  }
  ngOnInit(): void {
    this.getUser();
  }
  // createForm(){
  //   this.employeeForm = new FormGroup ({
  //     empId: new FormControl(this.empobj.empId),
  //     name: new FormControl(this.empobj.name),
  //     emailId: new FormControl(this.empobj.empId),
  //     ContactNo: new FormControl(this.empobj.contactNO),
  //     city: new FormControl(this.empobj.city),
  //     state: new FormControl(this.empobj.state),
  //     pincode: new FormControl(this.empobj.pincode),
  //     address: new FormControl(this.empobj.address)
  //   });
  // }
  cityList = ['Hyderabad', 'Banglore', 'Chennnai'];
  stateList = ['Telangana', 'Andhra pradesh'];
  getUser() {
    this.http.get<EmployeeModel[]>("http://localhost:3000/EmployeeList").subscribe((res: EmployeeModel[]) => {
      this.employeeList = res;
    })
  }
  onSave(form: NgForm) {
    if (!form || !form.valid) {
      this.showMessage('Please fill all required fields');
      return;
    }
    debugger;
    this.http.post<EmployeeModel[]>("http://localhost:3000/EmployeeList", this.empobj).subscribe((res: any) => {
      this.getUser(); this.onReset(form);
      this.showMessage('Data save successfully')
    }, err => {
      console.error(err);
      this.showMessage('Error saving data');
    })
  }
  onEdit(id: number) {
    this.http.get<EmployeeModel>("http://localhost:3000/EmployeeList/" + id).subscribe((res: EmployeeModel) => {
      this.empobj = res;
    })
  }
  onUpdate(form: NgForm) {
    if (!form || !form.valid) {
      this.showMessage('Please fill all required fields');
      return;
    }
    this.http.put("http://localhost:3000/EmployeeList/" + this.empobj.id, this.empobj).subscribe((res: any) => {
      this.getUser();
      this.onReset(form);
      this.showMessage('Data updated successfully')
    }, err => {
      console.error(err);
      this.showMessage('Error updating data');
    })
  }
  onDelete(id: number) {
    const result = confirm("Are you sure want to delete");
    if (result) {
      this.http.delete<EmployeeModel>("http://localhost:3000/EmployeeList/" + id).subscribe((res: EmployeeModel) => {
        this.getUser();
        const result = alert("Data deleted Successfully");
      })
    }
  }
  onReset(form: NgForm) {
    this.empobj = new EmployeeModel();
    if (form) form.resetForm();
    this.showMessage('Data reseted successfully');
    //   this.empobj ={
    //     id: undefined, empId: 0, name : "", city : "", state : "", emailId : "", contactNO : "", address : "", pincode : ""
    //   };
  }
  showMessage(msg: string) {
    try {
      this.message = (typeof msg === 'object') ? JSON.stringify(msg) : (msg as string);
    } catch (e) {
      this.message = String(msg);
    }
    setTimeout(() => {
      this.message = '';
    }, 3000)
  }

  // https://localhost:7199/api/Employee_Full_Details
}
