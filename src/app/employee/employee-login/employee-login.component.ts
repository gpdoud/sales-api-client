import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent {

  pageTitle = "Employee Login";
  email: string = "";
  password: string = "";
  message: string = "";

  constructor(
    private emplSvc: EmployeeService,
    private router: Router
  ) {}

  login(): void {
    this.message = "";
    this.emplSvc.login(this.email, this.password).subscribe({
      next: (res) => {
        console.debug("Login Successful!");
        this.router.navigateByUrl("/employee/list");
      },
      error: (err) => {
        if(err.status === 404) {
          this.message = "Email/Password not found!"
        } else {
          console.error(err);
        }
      }
    })
  }

  ngOnInit(): void {
  }
}
