import { JsonPipe } from '@angular/common';
import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { intialValue } from '../ngrx-store/counter.reducer';

@Component({
  selector: 'app-signal',
  imports: [FormsModule, JsonPipe],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css'
})
export class SignalComponent {
  //Signal topic 
  //basic signal creation or set
  //Update and read signal value
  //Effect
  //input and output signal
  //viewchild as signal
  //to signal

  firstName: string = "signal";
  course = signal("Angular");
  courseName = signal<string>("Angular");
  CityList = signal<string[]>(["KA", 'TS', 'AP']);
  courseDetails = computed(() => this.course() + " " + this.courseName());

  newCity: string = "";

  empObj = signal<any>({ empId: 101, empName: "", empSal: '', empDept: "", empCity: "", empCountry: "" });

  //computed signal
  FName = signal("");
  MName = signal("");
  LName = signal("");
  FullName = computed(() => this.FName() + " " + this.MName() + " " + this.LName());

  // @input() dataFromParent: string = "";
  //@output() dataToParent = new EventEmitter<string>();

  //input and output signal
  dataFromParent = input<string>();
  dataToParent = output<string>();

  // @viewChild('childNameText') childNameViewChild!: ElementRef;
  cildNameViewChild = viewChild<ElementRef<HTMLInputElement>>('childNameText');

  constructor(private http: HttpClient) {
    this.firstName = "Angular 20";
    console.log(this.firstName);


    this.cildNameViewChild()?.nativeElement

    console.log(this.courseName());
    setTimeout(() => {
      this.courseName.set("Angular 20");
      console.log(this.courseName());
    }, 3000);

    console.log(this.courseDetails());

    //effect signal
    //it will display like form control valuechange
    effect(() => {
      console.log("Course Name: " + this.courseName());
    })

    //input and output signal
    // this.dataFromParent = "Data from parent component";
    // this.dataToParent.emit("Data from child component");

    //viewchild as signal
    // this.childNameViewChild.nativeElement.value = "Angular 20";

    //tosignal subscribe like  syncpipe
    //normal subscribe
    const result = this.http.get("").subscribe(res => {

    });
    //to signal
    const result1 = toSignal(this.http.get(""), { initialValue: [] }) || signal(null);

  }

  //Update and read signal value
  UpdateCity() {
    this.CityList.update(OldList => ([...OldList, this.newCity]))
  }

  changeEmpIdValue(event: any) {
    const value = event.target.value;
    this.empObj.update(oldEmpObj => ({ ...oldEmpObj, empId: value }));
  }

  changeFormValue(keyName: string, event: any) {
    const value = event.target.value;
    this.empObj.update(oldEmpObj => ({ ...oldEmpObj, [keyName]: value }));
  }

  changeFName(event: any) {
    const value = event.target.value;
    this.FName.set(value);
  }

  changeMName(event: any) {
    const value = event.target.value;
    this.MName.set(value);
  }

  changeLName(event: any) {
    const value = event.target.value;
    this.LName.set(value);
  }

}
