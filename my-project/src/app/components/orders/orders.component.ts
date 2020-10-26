import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderForm } from './user-order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public user
  public cart
  public messageOrder
  public orderModel = new OrderForm('', '', '', '');
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.myUser$.subscribe((res) => {
      this.user = res
    })

  }

  saveOrder() {
    this.cart = this.user.productInCart
    this.cartService.saveOrderOnDb(this.orderModel, this.cart).subscribe((res: any) => {
      this.messageOrder=res.message
      return res
    })
  }

  returnCity() {
    console.log(this.user)
    this.orderModel.city = this.user.user.city
  }

  returnStreet() {
    this.orderModel.street = this.user.user.street
  }
}
