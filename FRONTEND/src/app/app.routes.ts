import { Routes } from '@angular/router';
import { Login } from './pages/login/login.component';
import { Register } from './pages/register/register.component';
import { Dashboard } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
];
