import { Injectable } from '@angular/core';
import { HttpCommonService } from '../http/http-common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private httpService: HttpCommonService
  ) {}

  login(data:any) {
    return this.httpService.postCall("/admin/auth/login", data);
  }
}
