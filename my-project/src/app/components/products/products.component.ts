import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public categorys = ['pants', 'shirts', 'shoes', 'swimsuit', 'accessories']
  public products
  public cardForm
  constructor(private ProductsService: ProductsService, private CartService: CartService, private formBuilder: FormBuilder) {
    this.cardForm = this.formBuilder.group({
      sizeSelected: ""
    })
  }

  ngOnInit(): void {
    this.ProductsService.myProducts$.subscribe((result) => { this.products = result })
    this.ProductsService.myProducts$.subscribe((res) => { this.products = res })

  }


  addToCart(product) {
    this.CartService.addToTheCart(product, this.cardForm.value).subscribe((res: any) => {
      return res
    })
  }


}


