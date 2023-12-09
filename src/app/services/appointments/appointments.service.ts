import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Appointment } from 'src/app/models/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  baseUrl = 'http://localhost:3000/appointments';
  http = inject(HttpClient);

  private appointments$ = this.http.get<Appointment[]>(this.baseUrl);
  appointments: any = toSignal(this.appointments$, { initialValue: [] });
  appointmentsWritableSignal = signal(this.appointments);

  addAppointment(appointment: Appointment) {
    this.appointmentsWritableSignal.update((appointments) => [
      ...appointments(),
      appointment,
    ]);
    console.log(this.appointmentsWritableSignal());

    return this.http.post(this.baseUrl, appointment);
  }
}
