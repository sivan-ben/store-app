import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public mySidebar: number
  public productOnCart
  public totalPriceProduct:number
  constructor( private router: Router, private cartService: CartService) {
    this.mySidebar = 1

  }
  ngOnInit(): void {
    this.cartService.getCartUser().subscribe()
    this.cartService.myCart$.subscribe((cart) => { this.productOnCart = cart })
    this.cartService.price$.subscribe((result:number) => { this.totalPriceProduct = result })
  }

  goBuy() {
    this.router.navigate(['orders']);
  }


  delete(product) {
    this.cartService.deleteProduct(product).subscribe((res: any) => {
      return res
    })

  }

}


