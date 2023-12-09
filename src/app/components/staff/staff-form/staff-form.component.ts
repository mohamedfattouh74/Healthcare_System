import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { StaffService } from 'src/app/services/staff/staff.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DepartmentsService } from 'src/app/services/departments/departments.service';
import { Staff } from 'src/app/models/staff';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-staff-form',
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
  templateUrl: './staff-form.component.html',
  styleUrl: './staff-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffFormComponent {
  isEdit = this.staffService.isEdit();
  departments = this.departmentService.departments;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Staff,
    private _snackBar: MatSnackBar,
    private staffService: StaffService,
    private departmentService: DepartmentsService
  ) {}

  staffForm: any = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    startingDate: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.isEdit ? this.staffForm.setValue(this.data) : '';
  }
  submitStaffForm() {
    if (this.staffForm.valid && !this.isEdit) {
      this.staffService.addDoctor(this.staffForm.value).subscribe();
      this.staffService.getDoctors();
      this._snackBar.open('Successfully added a new Staff', 'Ok', {
        verticalPosition: 'top',
        duration: 3000,
      });
    } else if (this.staffForm.valid && this.isEdit) {
      this.staffService
        .updateDoctor(this.staffService.editDoctorID(), this.staffForm.value)
        .subscribe();
      this._snackBar.open('Successfully edited an existing Staff', 'Ok', {
        verticalPosition: 'top',
        duration: 3000,
      });
    }
  }
}
