import { Injectable } from '@angular/core';
import { Products } from 'src/app/shared/models/products';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = {};
  private cartObservable$: BehaviorSubject<Object>

  constructor() { 
    // !this.isCartExists() ? localStorage.setItem('cart', JSON.stringify(this.cart)) : "";
    if(!this.isCartExists()){
      localStorage.setItem('cart', JSON.stringify(this.cart));
    } else{
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    this.cartObservable$ = new BehaviorSubject(this.cart);
  }

  get cartObservable(){
    return this.cartObservable$;
  }

  getQuantity(product: Products){
    return this.cart[product._id] ? +this.cart[product._id] : 0;
  }

  setQuantity(product: Products, quantity: number){
    if(quantity <= 0){
      delete this.cart[product._id];
    } else{
      this.cart[product._id] = quantity;
    }
    this.cartObservable$.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  isCartExists(){
    if(localStorage.getItem('cart')){
      return true;
    } else{
      return false;
    }
  }

  addToCart(product: Products){
    let quantity = this.cart[product._id];
    if(quantity){
      this.cart[product._id] = (+quantity) + 1;
    } else{
      this.cart[product._id] = 1;
    }
    this.cartObservable$.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart(){
    localStorage.removeItem('cart');
    this.cartObservable$.next({});
  }
}
