import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Staff } from '../../models/staff';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  baseUrl = 'http://localhost:3000/doctors';
  http = inject(HttpClient);

  isEdit = signal(false);
  editDoctorID = signal(0);
  staff: any = signal([]);
  staffCount: any = computed(() => this.staff().length);

  getDoctors() {
    return this.http.get<Staff[]>(this.baseUrl).subscribe((res: any) => {
      this.staff.set(res);
    });
  }
  addDoctor(doctor: any) {
    this.staff.update((staff: Staff[]) => [doctor, ...staff]);
    return this.http.post(this.baseUrl, doctor);
  }
  getDoctorByID(doctorID: any) {
    return this.http.get(this.baseUrl + `/${doctorID}`);
  }

  updateDoctor(doctorID: any, doctor: Staff) {
    let updatedDoctors = this.staff().map((staff: Staff) => {
      if (doctorID == staff.id) {
        return { ...doctor, id: doctorID };
      }
      return staff;
    });
    this.staff.set(updatedDoctors);
    return this.http.put(this.baseUrl + `/${doctorID}`, doctor);
  }

  deleteDoctor(doctorID: any) {
    this.staff.update((staff: Staff[]) =>
      this.staff().filter((doctor: Staff) => doctor.id != doctorID)
    );
    return this.http.delete(this.baseUrl + `/${doctorID}`);
  }
}
