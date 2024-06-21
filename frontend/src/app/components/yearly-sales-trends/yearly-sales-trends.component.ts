import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartService } from '../../core/services/chart.service';

@Component({
  selector: 'app-yearly-sales-trends',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './yearly-sales-trends.component.html',
  styleUrl: './yearly-sales-trends.component.scss'
})
export class YearlySalesTrendsComponent implements OnInit{
  public lineChartOptions = {
    responsive: true
  };

  constructor(
    private $chartSerice:ChartService
  ){}
  
  ngOnInit(): void {
    this.yearlySales()
  };

  public lineChartLabels = ['2016', '2017', '2018', '2019', '2020', '2021'];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartData = [
    { data: [], label: 'Sales' }
  ];

  yearlySales(){
    this.$chartSerice.yearlySales().subscribe((res)=>{
      this.lineChartLabels = res.data.years;
      this.lineChartData[0].data = res.data.sales
    })
  }
}
