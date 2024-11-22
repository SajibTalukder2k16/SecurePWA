import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthorized = this.checkAuthorization();
    if (!isAuthorized) {
      this.router.navigate(['/']);
    }
    return isAuthorized;
  }

  checkAuthorization(): boolean {
    // Implement your authorization logic here
    // For example, check if a specific token or flag is present in localStorage
    return !!localStorage.getItem('authorized');
  }
}
