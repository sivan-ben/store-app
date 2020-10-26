import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  public categorys = ['pants', 'shirts', 'shoes', 'swimsuit', 'accessories']
  public products
  public searchForm
  constructor(private ProductsService: ProductsService, private cartService: CartService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: ""
    })
  }

  ngOnInit() {
   
  }

  search() {
    console.log("search function")
    this.ProductsService.searchProduct(this.searchForm.value).subscribe((res: any) => {
      return res
    })
    this.searchForm.reset()
  }

  logOut() {
    localStorage.removeItem('token')
  }

  goToCategory(categoryName) {
    this.ProductsService.getCategory(categoryName).subscribe((res: any) => {
      this.products = res
      return res
    })
  }
}
