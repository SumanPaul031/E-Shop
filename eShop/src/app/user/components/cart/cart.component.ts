import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { Products } from 'src/app/shared/models/products';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { observable, forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderInfo, ProductInfo, OrderService } from 'src/app/shared/services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface CartItem{
  product: Products;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cart;
  cartItems: CartItem[] = [];
  total = 0;
  cartSubscription: Subscription;
  modalRef: BsModalRef;

  constructor(private cartService: CartService, private productService: ProductService, private modalService: BsModalService, private orderService: OrderService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.subscribeCart();
  }

  ngOnDestroy(): void{
    this.cartSubscription.unsubscribe();
  }

  subscribeCart(){
    let total = 0;
    this.cartSubscription = this.cartService.cartObservable.subscribe({
      next: (cart) => {
        let observables = [];
        total = 0;
        if(Object.keys(cart).length == 0){
          this.cartItems = [];
        }
        for(let id in cart){
          observables.push(this.productService.getProductById(id).pipe(map(product => {
            total += (product.price * cart[id]);
            let item: CartItem = {
              product: product,
              quantity: cart[id]
            }
            return item;
          })));
        }
        forkJoin(observables).subscribe({
          next: (result: CartItem[]) => {
            this.total = total;
            this.cartItems = result;           
          }
        })
      }
    });
  }

  //Open Modal
  openModal(form){
    this.modalRef = this.modalService.show(form, {
      animated: true,
      class: 'modal-lg'
    });
  }

  checkOut(event: Event, form: HTMLFormElement){
    event.preventDefault();
    let firstName = (<HTMLInputElement>form.elements.namedItem('firstName')).value;
    let lastName = (<HTMLInputElement>form.elements.namedItem('lastName')).value;
    let address = (<HTMLInputElement>form.elements.namedItem('address')).value;

    let orderInfo: OrderInfo;
    let productInfos: ProductInfo[] = [];
    this.cartItems.forEach(e => {
      productInfos.push({
        price: e.product.price,
        productId: e.product._id,
        quantity: e.quantity
      })
    });

    orderInfo = {
      address,
      firstName,
      lastName,
      products: productInfos
    }

    this.orderService.placeOrder(orderInfo).subscribe({
      next: (result) => {
        this.modalRef.hide();
        this.cartService.clearCart();
        this.router.navigate(['orders']);
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.error.message, 'Failure');
      }
    })

    return false;
  }

}
