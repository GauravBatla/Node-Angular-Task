import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartService } from '../../core/services/chart.service';

@Component({
  selector: 'app-sales-by-category',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './sales-by-category.component.html',
  styleUrl: './sales-by-category.component.scss'
})
export class SalesByCategoryComponent implements OnInit{
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(
    private $chartSerice:ChartService
  ){}
  
  ngOnInit(): void {
    this.getSalesByCat()
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'Sales' }
  ];

  getSalesByCat(){
    this.$chartSerice.salesByCategory().subscribe((res)=>{
      this.barChartLabels = res.data.categories;
      this.barChartData[0].data = res.data.sales
    })
  }

}
