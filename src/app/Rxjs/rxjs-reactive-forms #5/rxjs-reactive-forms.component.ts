import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { combineLatest, debounceTime } from 'rxjs';


@Component({
  selector: 'app-rxjs-reactive-forms',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './rxjs-reactive-forms.component.html',
  styleUrl: './rxjs-reactive-forms.component.css'
})
export class RxjsReactiveFormsComponent implements OnInit {
  //Topic: Rxjs Reactive Forms
  //Form control
  //Status change
  //combine
  //debounceTime

  userForm!: FormGroup;
  passwordMissmatch: boolean = false;
  searchResults: string[] = [];

  //individual form control
  searchcontrol: FormControl = new FormControl('');

  constructor(private fb: FormBuilder) {

    //Dependent form controls
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      subscribe: [false],
      email: [''],
      password: [''],
      confirmPassword: [''],
      age: ['']
    });
  }

  ngOnInit() {

    //Reactive form value changes for specific form control
    // this.userForm.controls['name'].valueChanges.subscribe(value => {
    //   // debugger;
    // })

    //Reactive form value changes for individual form control
    this.searchcontrol.valueChanges.subscribe(value => {
      // debugger;
    })

    // entire form
    this.userForm.valueChanges.subscribe(value => {
      // debugger;
    })

    //disable textbox intial
    this.userForm.controls['confirmPassword'].disable();

    // Add validator with conditional check
    this.userForm.controls['password'].valueChanges.subscribe(value => {
      if (value != "") {
        this.userForm.controls['confirmPassword'].addValidators([Validators.required]);
        this.userForm.controls['confirmPassword'].enable();
      }
    })

    //check validation status
    this.userForm.statusChanges.subscribe(res => {
      // debugger;
    })

    //combine the multiple observable inputs
    combineLatest([
      this.userForm.controls['password'].valueChanges,
      this.userForm.controls['confirmPassword'].valueChanges
    ]).subscribe(([pwd, confirmPWD]) => {
      this.passwordMissmatch = pwd && confirmPWD && pwd != confirmPWD;
    })

    //Debounce operator to Api call after 1 seconds
    this.searchcontrol.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((search: string) => {
      console.log("debounceTime after 1 sec" + search);
    })
  }
  onSubmit() {

  }
}
