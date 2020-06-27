import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Category } from 'src/app/shared/models/category';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin-new-product',
  templateUrl: './admin-new-product.component.html',
  styleUrls: ['./admin-new-product.component.css']
})
export class AdminNewProductComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  categorySubscription: Subscription;

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
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

  saveCategory(categoryForm: HTMLFormElement){
    let title =(<HTMLInputElement>categoryForm.elements.namedItem('title')).value;
    this.categoryService.saveCategory({title}).subscribe({
      next: (category: Category) => {
        this.categories.push(category);
        this.toastr.success('Category Created', 'Success');
        categoryForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        if(error.error.error.message.includes('Auth Failed')){
          this.userService.logout();
        } else{
          this.toastr.error(error.error.error.message, 'Failure');
        }
      }
    })
  }
  
  saveProduct(productForm: HTMLFormElement){
    let name =(<HTMLInputElement>productForm.elements.namedItem('name')).value;
    let price =(<HTMLInputElement>productForm.elements.namedItem('price')).value;
    let category =(<HTMLSelectElement>productForm.elements.namedItem('category')).value;
    let productImage =(<HTMLInputElement>productForm.elements.namedItem('productImage')).files[0];

    let data = new FormData();
    data.append('name', name);
    data.append('price', price);
    data.append('category', category);
    data.append('productImage', productImage);

    this.productService.saveProduct(data).subscribe({
      next: (product) => {
        this.toastr.success('Product Created', 'Success');
        productForm.reset();
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
