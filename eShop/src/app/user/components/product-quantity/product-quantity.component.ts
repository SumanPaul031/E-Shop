import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { Products } from 'src/app/shared/models/products';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Products;
  quantity: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartObservable.subscribe({
      next: (cart) => {
        this.quantity = this.cartService.getQuantity(this.product); 
      }
    });
  }

  Decrease(){
    this.quantity--;
    this.cartService.setQuantity(this.product, this.quantity);
  }

  Increase(){
    this.quantity++;
    this.cartService.setQuantity(this.product, this.quantity);
  }
}
