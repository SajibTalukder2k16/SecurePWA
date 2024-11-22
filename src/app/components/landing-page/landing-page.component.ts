import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  quote: string;
  writer: string;
  [key: string]: any; // To allow other properties if needed
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit {

  welcomeMessage: string = 'This app is protected by advanced security measures to prevent unauthorized copying or extraction of content.';
  queryParams: { [key: string]: string } = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    console.log(window.location.href);
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
      this.updateLocalStorage(params);
      this.processSecurePWA(params['SecurePWA']);
      this.makeApiCall(params);
    });
  }

  updateLocalStorage(params: { [key: string]: string }): void {
    Object.keys(params).forEach(key => {
      localStorage.setItem(key, params[key]);
    });
  }

  displayWelcomeMessage(): void {
    const name = localStorage.getItem('name');
    if (name) {
      this.welcomeMessage = `Hello, ${name}!`;
    }
  }

  processSecurePWA(securePWA: string): void {
    if (securePWA) {
      const [beforePWA, afterPWA] = securePWA.split('@PWA');
      console.log('Before @PWA:', beforePWA);
      console.log('After @PWA:', afterPWA);
      localStorage.setItem('enM', beforePWA);
      localStorage.setItem('enI', afterPWA);
      // You can store these values or use them as needed
    }
  }

  makeApiCall(params: { [key: string]: string }): void {
    const enM = localStorage.getItem('enM');
    const enI = localStorage.getItem('enI');
    const apiUrl = 'http://localhost:3000/your-endpoint';
    const payload = {
      enM: enM,
      enI: enI
    };
    setTimeout(() => {
      this.http.post<ApiResponse>(apiUrl, payload).subscribe(
        response => {
          localStorage.setItem('authorized', 'true');
          this.router.navigate(['/success-page'], { state: { quote: response.quote, writer: response.writer } });
        },
        error => {
          const errorMessage = error.error.message || 'An unexpected error occurred.';
          this.router.navigate(['/error-page'], { state: { errorMessage: errorMessage } });
        }
      );
    }, 8000);
  }
}
