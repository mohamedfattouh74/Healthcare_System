import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  baseUrl = 'http://localhost:3000/departments';
  http = inject(HttpClient);

  private departments$ = this.http.get<string[]>(this.baseUrl);
  departments = toSignal(this.departments$, { initialValue: [] });
}
