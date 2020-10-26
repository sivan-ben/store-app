import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  public validUserId: Boolean
  public idUrl = "http://localhost:3000/ckeckId";
  public saveUrl = "http://localhost:3000/register";
  public loginUrl = "http://localhost:3000/login";
 
  constructor(private httpClient: HttpClient, private cartService: CartService) {
    this.validUserId = false
  }

  stepOneValidetors(data) {
    return this.httpClient.post(this.idUrl, { data }).pipe(map((res: any) => {
      return res
    }))
  }
  saveUserOnDb(data) {
    return this.httpClient.post(this.saveUrl, { data }).pipe(map((res: any) => {
      return res
    }))
  }

  getUser(user) {
    return this.httpClient.post(this.loginUrl, user).pipe(map((res: any) => {
      this.cartService.updateCart(res.result.cart)
      return res
    }))
  }

  ifTokenExsist() {
    return !!localStorage.getItem('token')
  }

  sendToken() {
    return localStorage.getItem('token')
  }

}

