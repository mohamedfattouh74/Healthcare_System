import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { StaffService } from 'src/app/services/staff/staff.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { StaffFormComponent } from '../staff-form/staff-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgxPaginationModule,

    MatSnackBarModule,
  ],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  staffService = inject(StaffService);
  staff: any = signal([]);

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}
  ngOnInit() {
    this.staffService.getDoctors();
    this.staff = this.staffService.staff;
  }
  openStaffDialog(): void {
    this.staffService.isEdit.set(false);
    const dialogRef = this.dialog.open(StaffFormComponent, {
      height: '400px',
      width: '600px',
    });
  }

  openStaffDialogForEdit(doctorID: any): void {
    this.staffService.isEdit.set(true);
    this.staffService.getDoctorByID(doctorID).subscribe((res: any) => {
      const dialogRef = this.dialog.open(StaffFormComponent, {
        height: '400px',
        width: '600px',
        data: {
          name: res.name,
          age: res.age,
          department: res.department,
          startingDate: res.startingDate,
        },
      });
      this.staffService.editDoctorID.set(doctorID);
    });
  }

  deleteDoctorByID(doctorID: any) {
    this.staffService.deleteDoctor(doctorID).subscribe();
    this._snackBar.open('Successfully deleted an existing Staff', 'Ok', {
      verticalPosition: 'top',
      duration: 3000,
    });
  }
  onPageChange(event: any) {
    this.page = event;
  }
}
