import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentsFormComponent } from '../appointments-form/appointments-form.component';
import { AppointmentsService } from 'src/app/services/appointments/appointments.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, MatDialogModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MatDatepickerModule],
})
export class AppointmentsComponent {
  appointmentsService = inject(AppointmentsService);
  public dialog = inject(MatDialog);

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
  };

  appointments: any = this.appointmentsService.appointmentsWritableSignal();

  openAppointmentsDialog() {
    this.dialog.open(AppointmentsFormComponent, {
      height: '350px',
      width: '600px',
    });
  }
}
