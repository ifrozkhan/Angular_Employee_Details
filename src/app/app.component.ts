import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel } from './model/Employee';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Angular_CRUD';
  employeeList: EmployeeModel[] =[];
empobj: EmployeeModel = new EmployeeModel();
employeeForm: FormGroup= new FormGroup({});
message: string ='';
  http =inject(HttpClient);
  constructor(){
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
cityList =['Hyderabad', 'Banglore', 'Chennnai'];
stateList =['Telangana', 'Andhra pradesh'];
 getUser(){
  this.http.get<EmployeeModel[]>("http://localhost:3000/EmployeeList").subscribe((res: EmployeeModel[])=>{
      this.employeeList =res;
  })
 }
onSave( form: any){
  debugger;
  this.http.post<EmployeeModel[]>("http://localhost:3000/EmployeeList",this.empobj).subscribe((res: any)=> {
   this.getUser(); this.onReset(form);
   this.showMessage('Data save successfully')
  })
}
onEdit(id: number){
  this.http.get<EmployeeModel>("http://localhost:3000/EmployeeList/"+id).subscribe((res: EmployeeModel) =>{
    this.empobj =res;
  })
}
onUpdate(form: any){
  this.http.put("http://localhost:3000/EmployeeList/"+this.empobj.id, this.empobj).subscribe((res: any)=>{
    this.getUser();
    this.onReset(form);
    this.showMessage('Data updated successfully')
  })
}
onDelete(id: number){
  const result =confirm("Are you sure want to delete");
  if(result){
    this.http.delete<EmployeeModel>("http://localhost:3000/EmployeeList/"+id).subscribe((res:EmployeeModel)=> {
      this.getUser();
      const result = alert("Data deleted Successfully");
    })
  }
}
onReset(form: any){
  this.empobj = new EmployeeModel();
  form.reset();
  this.showMessage('Data reseted successfully');
  //   this.empobj ={
//     id: undefined, empId: 0, name : "", city : "", state : "", emailId : "", contactNO : "", address : "", pincode : ""
//   };
}
showMessage(msg: string){
  this.message =msg;
  setTimeout(()=> {
    this.message ='';
  }, 3000)
  }


}