import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/shared/models/products';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  products: Products[] = [];

  constructor(private productService: ProductService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.queryParams.subscribe({
    //   next: (params: Params) => {
    //     console.log(params);
    //   }
    // });

    this.route.queryParamMap.subscribe({
      next: (paramMap: ParamMap) => {
        let categoryId = paramMap.get('category');
        let min = paramMap.get('min');
        let max = paramMap.get('max');
        this.collectProducts({category: categoryId, min, max});
      }
    });
  }

  collectProducts(params){
    this.productService.getAllProducts(params).subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.error.message);
      }
    })
  }

}
