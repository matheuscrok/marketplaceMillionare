import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  cart: any[] = [];
  numberOfProducts = new BehaviorSubject(0);
  products = this.cart;

  addProduct(product: any) {
    let item = this.products.find((p) => p.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      this.products.push({ ...product, quantity: 1 });
    }
    this.numberOfProducts.next(this.getNumberOfProducts());
  }

  getNumberOfProducts() {
    return this.cart.length;
  }

  getProductsInCart() {
    return this.cart;
  }
  removeProduct(product: any) {
    let item = this.products.find((p) => p.id === product.id);
    if (item) {
      item.quantity -= 1;
      if (item.quantity === 0) {
        this.products.splice(this.products.indexOf(item), 1);
      }
    }
    this.numberOfProducts.next(this.getNumberOfProducts());
    //refresh cart
    this.products = this.cart;
  }
}
