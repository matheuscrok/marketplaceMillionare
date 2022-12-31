import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Product } from 'src/product';
import { CartService } from '../cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('cartModal', { static: true }) cartModal!: ElementRef;

  constructor(
    private cartService: CartService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private productDetails: ProductDetailsComponent
  ) {}

  ngOnInit(): void {}
  @ViewChild('cartButton', { static: true }) cartButton!: ElementRef;

  products: Product[] = [
    new Product(
      1,
      'Product 1',
      'Description 1',
      100,
      'https://picsum.photos/200/300',
      ['1']
    ),
    new Product(
      2,
      'Product 2',
      'Description 2',
      200,
      'https://picsum.photos/200/300',
      ['2']
    ),
  ];
  selectedProduct: any = new Product(0, '', '', 0, '', ['']);

  showDetails = false;

  addToCart(product: any) {
    this.cartService.addProduct(product);
    this.cd.detectChanges();
  }
  openDetails(id: any) {
    this.selectedProduct = this.products.find((product) => product.id === id);
    this.showDetails = true;
  }
  closeDetails() {
    this.showDetails = false;
  }

  openCart() {
    if (this.products.length === 0) {
      window.location.reload();
    } else {
      history.pushState(null, '', '/cart');
      this.products = this.cartService.getProductsInCart();
    }
  }

  closeCart() {
    let modal = document.getElementById('cartModal');
    modal?.classList.remove('show');
  }
  //remove to cart
  removeToCart(product: any) {
    this.cartService.removeProduct(product);
    this.cd.detectChanges();
  }

  getNumberOfProducts = () => this.cartService.getNumberOfProducts();
}
