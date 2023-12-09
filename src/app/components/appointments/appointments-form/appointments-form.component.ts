import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AppointmentsService } from 'src/app/services/appointments/appointments.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointments-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    DatePipe,
  ],
  templateUrl: './appointments-form.component.html',
  styleUrl: './appointments-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class AppointmentsFormComponent {
  appointmentsService = inject(AppointmentsService);
  private datePipe = inject(DatePipe);

  appointmentsForm: any = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });

  submitAppointmentsForm() {
    if (this.appointmentsForm.valid) {
      this.appointmentsForm.value.date = this.datePipe.transform(
        this.appointmentsForm.value.date,
        'yyyy-MM-dd'
      );
      this.appointmentsService
        .addAppointment(this.appointmentsForm.value)
        .subscribe();
      location.reload();
    }
  }
}
