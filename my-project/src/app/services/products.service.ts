import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public categoryUrl = "http://localhost:3000/product/getCategory";
  public searchUrl = "http://localhost:3000/product/searchProduct";
  public products = new Subject();
  myProducts$ = this.products.asObservable()
  constructor(private httpClient: HttpClient) {

  }

  getCategory(categoryName) {
    return this.httpClient.get(`${this.categoryUrl}/${categoryName}`).pipe(map((res: any) => {
      this.products.next(res)
      return res
    }))
  }

  searchProduct(searchProduct) {
    const searchParam = searchProduct.search
    return this.httpClient.get(`${this.searchUrl}/${searchParam}`).pipe(map((res: any) => {
      this.products.next(res)
      return res
    }))
  }

}
