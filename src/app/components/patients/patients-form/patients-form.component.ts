import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { Staff } from 'src/app/models/staff';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patients-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  templateUrl: './patients-form.component.html',
  styleUrl: './patients-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientsFormComponent {
  patientsForm: any = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    lastAppointmentDate: new FormControl('', Validators.required),
  });

  isEdit = this.patientsService.isEdit();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Staff,
    private _snackbar: MatSnackBar,
    private patientsService: PatientsService
  ) {}

  ngOnInit() {
    this.isEdit ? this.patientsForm.setValue(this.data) : '';
  }

  submitPatientsForm() {
    if (this.patientsForm.valid && !this.isEdit) {
      this.patientsService.addPatient(this.patientsForm.value).subscribe();
      this.patientsService.getPatients();
      this._snackbar.open('Successfully added a new Patient', 'Ok', {
        verticalPosition: 'top',
        duration: 3000,
      });
    } else if (this.patientsForm.valid && this.isEdit) {
      this.patientsService
        .updatePatient(
          this.patientsService.editPatientID(),
          this.patientsForm.value
        )
        .subscribe();
      this._snackbar.open('Successfully edited an existing Patient', 'Ok', {
        verticalPosition: 'top',
        duration: 3000,
      });
    }
  }
}
