import { Injectable } from '@angular/core';
import { HttpCommonService } from '../http/http-common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private httpService: HttpCommonService
  ) {}

  addProduct(data:any) {
    return this.httpService.postCall("/admin/product/add", data);
  };

  list(page:number,limit:number) {
    return this.httpService.getCall(`/admin/product/list?page=${page}&limit=${limit}`);
  };

  categorylist(){
    return this.httpService.getCall("/admin/product/categories-list");
  };

  vendorList(){
    return this.httpService.getCall("/admin/product/vendor-list");
  };

  updateProduct(id:string, data:any){
    return this.httpService.patchCall("/admin/product/update/"+id,data);
  };


  deleteProduct(id:string){
    return this.httpService.deleteCall("/admin/product/delete",id);
  }
}
