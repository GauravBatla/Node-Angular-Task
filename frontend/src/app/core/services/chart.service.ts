import { Injectable } from '@angular/core';
import { HttpCommonService } from '../http/http-common.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(
    private httpService: HttpCommonService
  ) { }


  monthlyRevenue() {
    return this.httpService.getCall("/admin/chart/monthly-revenue");
  };

  salesByCategory() {
    return this.httpService.getCall("/admin/chart/sales-by-category");
  };

  yearlySales() {
    return this.httpService.getCall("/admin/chart/yearly-sales");
  };
}
