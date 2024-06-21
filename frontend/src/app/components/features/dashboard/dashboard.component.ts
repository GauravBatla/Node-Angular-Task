import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SalesByCategoryComponent } from '../../sales-by-category/sales-by-category.component';
import { MonthlyRevenueComponent } from '../../monthly-revenue/monthly-revenue.component';
import { YearlySalesTrendsComponent } from '../../yearly-sales-trends/yearly-sales-trends.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective,
    SalesByCategoryComponent,
    MonthlyRevenueComponent,
    YearlySalesTrendsComponent,
    MatToolbarModule,
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit  {
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  ngOnInit(): void {
  }
  
}
