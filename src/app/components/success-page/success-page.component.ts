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
    const apiUrl = 'http://localhost:5001/getQuote';
    const payload = { enM: enM, enI: enI, reSubmit: true, };

    this.http.post<{ quote: string, writer: string }>(apiUrl, payload).subscribe(
      response => {
        this.quote = response.quote;
        this.writer = response.writer;
      },
      error => {
        console.error('Error fetching quote:', error);
        var errorMessage = error.error.message || 'An unexpected error occurred.';
        console.log("Error: ", error.error.error);
        const data = error.error.error;
        var retry_time = error.error.retry_after

        // Remove the "Error: " prefix and trim any extra spaces
        const extractedData = data.replace("Error:  ", "").trim();

        if(extractedData === "Expired") {
          errorMessage = "Please close your app from background and open it again.";
        }
        else if(extractedData === "Access limit reached") {
          errorMessage = "You have reached your limit with this device. Please try after " + retry_time;
        }
        else if(extractedData === "Invalid Data" || extractedData === "Already Existing Data") {
          errorMessage = "You are using our system from a different app. Please install original app and try again";
        }

        this.router.navigate(['/error-page'], { state: { errorMessage: errorMessage } });
      }
    );
  }
}
