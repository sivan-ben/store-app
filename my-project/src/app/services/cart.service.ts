import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})


export class CartService {
  public addToCartUrl = "http://localhost:3000/product/addToCart"
  public getCartUrl = "http://localhost:3000/product/getCart"
  public deleteUrl = "http://localhost:3000/product/deleteProduct"
  public addOrderUrl = "http://localhost:3000/product/addToOrder"
  public totalPrice = new Subject()
  price$ = this.totalPrice.asObservable()
  public cartSourse = new Subject();
  myCart$ = this.cartSourse.asObservable()
  public userDeatails = new Subject();
  myUser$ = this.userDeatails.asObservable()
  constructor(private httpClient: HttpClient) {

  }

  updateCart(cart) {
    let result = 0;
    for (let index = 0; index < cart.length; index++) {
      result = result + cart[index].price;
    }
    this.totalPrice.next(result)
    this.cartSourse.next(cart)
    this.userDeatails.next(cart)
  }



  addToTheCart(product, data) {
    const size = data.sizeSelected
    return this.httpClient.post(this.addToCartUrl, { product, size }).pipe(map((res: any) => {
      this.updateCart(res.productInCart)
      this.userDeatails.next(res.productInCart)
      return res
    }))
  }

  deleteProduct(product) {
    return this.httpClient.post(this.deleteUrl, product).pipe(map((res: any) => {
      this.updateCart(res.productInCart)
      return res
    }))
  }

  getCartUser() {
    return this.httpClient.get(this.getCartUrl).pipe(map((res: any) => {
      this.userDeatails.next(res)
      this.updateCart(res)
      return res
    }))
  }

  saveOrderOnDb(order, cart) {
    return this.httpClient.post(this.addOrderUrl, { order, cart }).pipe(map((res: any) => {
      this.updateCart(res.productInCart)
      return res
    }))
  }

}
