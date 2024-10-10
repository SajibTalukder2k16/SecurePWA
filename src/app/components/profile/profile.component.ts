import { Component } from '@angular/core';
import {APIService} from "../../service/api-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: any;

  constructor(private apiService: APIService, private router: Router) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.apiService.getProfile().subscribe(
      (response) => {
        this.user = response.user;  // Adjust based on your API response
      },
      (error) => {
        console.error('Profile loading error', error);
        // Handle unauthorized access, maybe redirect to login
        this.router.navigate(['/login']);
      }
    );
  }

  onLogout() {
    this.apiService.logout().subscribe(
      (response) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout error', error);
      }
    );
  }
}
