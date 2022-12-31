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
  @ViewChild('cartButton', { static: true }) cartButton!: ElementRef;

  constructor(
    private cartService: CartService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private productDetails: ProductDetailsComponent
  ) {}

  ngOnInit(): void {}

  products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 200,
      image: 'https://picsum.photos/200/300',
      colors: ['1']
    },
    {
     id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      image: 'https://picsum.photos/200/300',
      colors: ['2']
},
  ];
    
 selectedProduct:Product = new Product(0, '', '', 0, '', ['']);
  showDetails = false;

  addToCart(product: any) {
    this.cartService.addProduct(product);
    this.cd.detectChanges();
  }
  
  openDetails(id: Product['id']) {
    this.products.find((product) => {
      if (product.id === id) {
        this.selectedProduct = product;
      }
    });
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
