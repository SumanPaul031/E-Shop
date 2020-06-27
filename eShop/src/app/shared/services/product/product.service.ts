import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { Products } from 'src/app/shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productURL = `/api/products`;

  constructor(private http: HttpClient, private userService: UserService) { }

  getAllProducts(params){
    let query = new URLSearchParams();
    if(params['category']){
      query.append('category', params['category']);
    }
    if(params['min']){
      query.append('min', params['min']);
    }
    if(params['max']){
      query.append('max', params['max']);
    }
    return this.http.get(`${this.productURL}?${query.toString()}`).pipe(
      map((result: { count: number, products: Products[]}) => {
        return result.products;
      })
    );
  }

  getProductById(id: string){
    return this.http.get(`${this.productURL}/${id}`).pipe(
      map((result) => {
        return <Products>result;
      })
    );
  }

  saveProduct(data: FormData){
    return this.http.post(this.productURL, data).pipe(
      map((result: { message: string, product: Products }) => {
        return <Products>result.product;
      })
    );
  }

  updateProduct(data, id){
    return this.http.patch(`${this.productURL}/${id}`, data);
  }
}
