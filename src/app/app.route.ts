import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'staff',
    loadComponent: () =>
      import('./components/staff/staff-list/staff.component').then(
        (c) => c.StaffComponent
      ),
  },
  {
    path: 'patients',
    loadComponent: () =>
      import('./components/patients/patients-list/patients.component').then(
        (c) => c.PatientsComponent
      ),
  },
  {
    path: 'appointments',
    loadComponent: () =>
      import(
        './components/appointments/appointments-calendar/appointments.component'
      ).then((c) => c.AppointmentsComponent),
  },

  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
