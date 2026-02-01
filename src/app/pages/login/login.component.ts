import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.Component.html'
})
export class loginComponent {

  isLogin = true;

  loginObj = {
    email: '',
    password: ''
  };

  registerObj = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  register() {
    this.http.post('http://localhost:3000/users', this.registerObj)
      .subscribe(() => {
        alert('Registration successful');
        this.toggleForm();
      });
  }

  login() {
    this.http.get<any[]>('http://localhost:3000/users')
      .subscribe(users => {
        const user = users.find(u =>
          u.email === this.loginObj.email &&
          u.password === this.loginObj.password
        );

        if (user) {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigateByUrl('/dashboard');
          alert('Login successful');
        } else {
          alert('Invalid credentials');
        }
      });
  }
}