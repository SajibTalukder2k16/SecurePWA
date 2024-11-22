import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./components/profile/profile.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {HomeComponent} from "./components/home/home.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {SuccessPageComponent} from "./components/success-page/success-page.component";
import {ErrorPageComponent} from "./components/error-page/error-page.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'home', component: HomeComponent },  // Ensure this line is present
  // { path: 'profile', component: ProfileComponent },
  { path: '', component: LandingPageComponent },
  { path: 'success-page', component: SuccessPageComponent, canActivate: [AuthGuard] },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
