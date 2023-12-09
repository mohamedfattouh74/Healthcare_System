import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { PatientsFormComponent } from '../patients-form/patients-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatDialogTitle,
    MatSnackBarModule,
  ],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientsComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  patients: any = signal([]);
  patientsService = inject(PatientsService);
  constructor(public dialog: MatDialog, private _snackbar: MatSnackBar) {}
  ngOnInit() {
    this.patientsService.getPatients();
    this.patients = this.patientsService.patients;
  }

  openPatientDialog(): void {
    this.patientsService.isEdit.set(false);
    const dialogRef = this.dialog.open(PatientsFormComponent, {
      height: '380px',
      width: '600px',
    });
  }

  openPatientDialogForEdit(patientID: any): void {
    this.patientsService.isEdit.set(true);
    this.patientsService.getPatientByID(patientID).subscribe((res: any) => {
      const dialogRef = this.dialog.open(PatientsFormComponent, {
        height: '380px',
        width: '600px',
        data: {
          name: res.name,
          age: res.age,
          email: res.email,
          lastAppointmentDate: res.lastAppointmentDate,
        },
      });
      this.patientsService.editPatientID.set(patientID);
    });
  }
  deletePatientByID(patientID: any) {
    this.patientsService.deletePatient(patientID).subscribe();
    this._snackbar.open('Successfully deleted an existing Patient', 'Ok', {
      verticalPosition: 'top',
      duration: 3000,
    });
  }
  onPageChange(event: any) {
    this.page = event;
  }
}
