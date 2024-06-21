import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartService } from '../../core/services/chart.service';

@Component({
  selector: 'app-monthly-revenue',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './monthly-revenue.component.html',
  styleUrl: './monthly-revenue.component.scss'
})
export class MonthlyRevenueComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(
    private $chartSerice:ChartService
  ){}
  
  ngOnInit(): void {
    this.getMonthlySales()
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Revenue' }
  ];

  getMonthlySales() {
  this.$chartSerice.monthlyRevenue().subscribe((res)=>{
    this.barChartLabels = res.data.months;
    this.barChartData[0].data = res.data.revenue
  })
  }
}
