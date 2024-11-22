import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss']
})
export class SuccessPageComponent implements OnInit {
  quote: string = 'The only limit to our realization of tomorrow is our doubts of today.';
  writer: string = 'Franklin D. Roosevelt';

  constructor(private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.quote = navigation.extras.state['quote'];
      this.writer = navigation.extras.state['writer'];
    }
  }

  ngOnInit(): void {}

  fetchAnotherQuote(): void {
    const enM = localStorage.getItem('enM');
    const enI = localStorage.getItem('enI');
    const apiUrl = 'http://localhost:3000/your-endpoint';
    const payload = { enM: enM, enI: enI };

    this.http.post<{ quote: string, writer: string }>(apiUrl, payload).subscribe(
      response => {
        this.quote = response.quote;
        this.writer = response.writer;
      },
      error => {
        console.error('Error fetching quote:', error);
      }
    );
  }
}
