import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { Products } from 'src/app/shared/models/products';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Products[] = [];
  categorySubscription: Subscription;
  categories: Category[] = [];
  selectedProduct: Products;
  modalRef: BsModalRef;

  constructor(private productService: ProductService, private toastr: ToastrService, private modalService: BsModalService, private categoryService: CategoryService, private userService: UserService) { }

  ngOnInit(): void {
    this.collectAllProducts();
    this.collectAllCategories();
  }

  ngOnDestroy(): void{
    this.categorySubscription.unsubscribe();
  }

  collectAllCategories(){
    this.categorySubscription = this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    })
  }

  collectAllProducts(){
    this.productService.getAllProducts({}).subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.error.message, 'Failure');
      }
    })
  }

  openModal(formModal, product: Products){
    this.selectedProduct = product;
    this.modalRef = this.modalService.show(formModal);
  }

  updateProduct(productForm: HTMLFormElement){
    let name =(<HTMLInputElement>productForm.elements.namedItem('name')).value;
    let price =(<HTMLInputElement>productForm.elements.namedItem('price')).value;
    let category =(<HTMLSelectElement>productForm.elements.namedItem('category')).value;
    // let productImage =(<HTMLInputElement>productForm.elements.namedItem('productImage')).files[0];

    let data = {
      name, price, category
    }

    // let data = new FormData();
    // data.append('name', name);
    // data.append('price', price);
    // data.append('category', category);
    // data.append('productImage', productImage);

    this.productService.updateProduct(data, this.selectedProduct._id).subscribe({
      next: (product) => {
        this.selectedProduct.name = name;
        this.selectedProduct.price = +price;
        this.categories.find((el, i, arr) => {
          if(el._id == category){
            this.selectedProduct.category = el;
          }
        });
        this.toastr.success('Product Updated', 'Success');
        this.modalRef.hide();
      },
      error: (error: HttpErrorResponse) => {
        if(error.error.error.message.includes('Auth Failed')){
          this.userService.logout();
        } else{
          this.toastr.error(error.error.error.message, 'Failure');
        }
      }
    });
  }

}
