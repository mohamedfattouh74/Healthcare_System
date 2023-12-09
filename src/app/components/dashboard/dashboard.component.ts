import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { StaffService } from 'src/app/services/staff/staff.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    NgChartsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  staffService = inject(StaffService);
  patientsService = inject(PatientsService);
  dashboardService = inject(DashboardService);

  staffCount = this.staffService.staffCount;
  patientsCount = this.patientsService.patientsCount;

  upcomingAppointments: any;
  public revenueChartOptions: any;
  public revenueChartLabels: String[] = [];
  public revenueChartData: any = [];
  public revenueChartType: ChartType = 'doughnut';

  public rebookingRateChartType: ChartType = 'bar';
  public rebookingRateChartOptions: any;
  public rebookingRateChartData: any;
  public rebookingRateChartLabels: string[] = [];

  constructor() {
    this.initializeRevenueChart();
    this.initializeRebookingRateChart();
    this.getUpcomingAppointments();
  }

  ngOnInit() {
    this.initializeRevenueChart();
    this.staffService.getDoctors();
    this.patientsService.getPatients();
  }

  initializeRevenueChart() {
    this.revenueChartOptions = {
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
      cutout: 95,
      borderWidth: 0,
    };
    this.dashboardService.getTotalRevenue().subscribe((res) => {
      this.revenueChartLabels = Object.keys(res);
      this.revenueChartData = [
        {
          data: Object.values(res),
          backgroundColor: ['#333063', '#616754'],
        },
      ];
    });
  }

  initializeRebookingRateChart() {
    this.rebookingRateChartOptions = {
      responsive: true,
      plugins: { legend: { display: false } },
    };
    this.dashboardService.getRebookingRate().subscribe((res) => {
      this.rebookingRateChartLabels = Object.keys(res);
      this.rebookingRateChartData = [
        {
          data: Object.values(res),
          barPercentage: 0.5,
          backgroundColor: '#333063',
          hoverBackgroundColor: '#616754',
        },
      ];
    });
  }

  getUpcomingAppointments() {
    this.upcomingAppointments = this.dashboardService
      .getUpcomingAppointments()
      .subscribe((res) => {
        this.upcomingAppointments = res;
      });
  }
}
