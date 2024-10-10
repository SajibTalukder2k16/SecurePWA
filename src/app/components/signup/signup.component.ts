import { Component } from '@angular/core';
import {APIService} from "../../service/api-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  hide = true;

  constructor(private apiService: APIService, private router: Router) {}

  onSignup() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const signupData = { email: this.email, password: this.password };
    this.apiService.signup(signupData).subscribe(
      (response) => {
        // Save token or handle response
        localStorage.setItem('token', response.token);
        // Navigate to home on successful signup
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Signup error', error);
      }
    );
  }
}
