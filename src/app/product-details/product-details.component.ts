import { Component, Injectable, Input, NgModule, OnInit } from '@angular/core';
import { Product } from 'src/product';
import { ChangeDetectorRef } from '@angular/core';
import { CartService } from '../cart/cart.service';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})

export class ProductDetailsComponent implements OnInit {
  @Input() product: Product = new Product(0, '', '', 0, '', ['']);
  constructor(
    private cartService: CartService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  addToCart(product: any) {
    this.cartService.addProduct(product);
    this.cd.detectChanges();
  }
  
}
