import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { StaffComponent } from './components/staff/staff-list/staff.component';
import { HttpClientModule } from '@angular/common/http';
import { PatientsComponent } from './components/patients/patients-list/patients.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NavComponent } from './components/nav/nav.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    CommonModule,
    RouterLink,
    StaffComponent,
    HttpClientModule,
    PatientsComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    NavComponent,
    MatProgressSpinnerModule,
  ],
  providers: [DatePipe],
})
export class AppComponent {
  title = 'healthcare-system';
}
