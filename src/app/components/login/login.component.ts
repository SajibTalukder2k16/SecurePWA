import { Component } from '@angular/core';
import {APIService} from "../../service/api-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hide = true;

  constructor(private apiService: APIService, private router: Router) {}

  onLogin() {
    const credentials = { email: this.email, password: this.password };
    this.apiService.login(credentials).subscribe(
      (response) => {
        // Navigate to home on successful login
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
}
