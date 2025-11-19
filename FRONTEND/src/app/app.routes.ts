import { Routes } from '@angular/router';
import { Login } from './pages/login/login.component';
import { Register } from './pages/register/register.component';
import { Dashboard } from './pages/dashboard/dashboard.component';
import { LandingPage } from './pages/landing/landing-page.component';
import { AppLayout } from './layout/app-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', component: LandingPage },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'dashboard', component: Dashboard }
    ]
  }
];