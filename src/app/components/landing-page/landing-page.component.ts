import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  welcomeMessage: string = 'This app is protected by advanced security measures to prevent unauthorized copying or extraction of content.';
  queryParams: { [key: string]: string } = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    console.log(window.location.href);
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
      this.updateLocalStorage(params);
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

  makeApiCall(params: { [key: string]: string }): void {
    const apiUrl = `https://your-api-endpoint.com?param1=${params['param1']}&param2=${params['param2']}`;
    setTimeout(() => {
      this.http.get(apiUrl).subscribe(
        response => {
          localStorage.setItem('authorized', 'true');
          this.router.navigate(['/success-page']);
        },
        error => {
          this.router.navigate(['/error-page']);
        }
      );
    }, 5000);
  }
}
