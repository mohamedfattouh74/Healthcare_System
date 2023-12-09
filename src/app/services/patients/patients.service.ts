import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Patient } from 'src/app/models/patients';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  baseUrl = 'http://localhost:3000/patients';
  http = inject(HttpClient);

  isEdit = signal(false);
  editPatientID = signal(0);
  patients: any = signal([]);
  patientsCount: any = computed(() => this.patients().length);

  getPatients() {
    return this.http.get<Patient[]>(this.baseUrl).subscribe((res: any) => {
      this.patients.set(res);
    });
  }
  addPatient(patient: any) {
    this.patients.update((patient: Patient[]) => [patient, ...patient]);
    return this.http.post(this.baseUrl, patient);
  }
  getPatientByID(patientID: any) {
    return this.http.get(this.baseUrl + `/${patientID}`);
  }

  updatePatient(patientID: any, patient: Patient) {
    let updatedPatients = this.patients().map((pat: Patient) => {
      if (patientID == pat.id) {
        return { ...patient, id: patientID };
      }
      return pat;
    });
    this.patients.set(updatedPatients);
    return this.http.put(this.baseUrl + `/${patientID}`, patient);
  }

  deletePatient(patientID: any) {
    this.patients.update((patient: Patient[]) =>
      this.patients().filter((patient: Patient) => patient.id != patientID)
    );
    return this.http.delete(this.baseUrl + `/${patientID}`);
  }
}
