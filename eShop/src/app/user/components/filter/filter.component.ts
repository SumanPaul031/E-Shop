import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/shared/models/category';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  categories: Category[] = [];
  minimum: number[] = [];
  maximum: any[] = [];
  category = "";
  categoryId = "";
  min = "";
  max = "";

  constructor(private categoryService: CategoryService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (paramMap: ParamMap) => {
        this.categoryId = paramMap.get('category');
        this.min = paramMap.get('min');
        this.max = paramMap.get('max');
      }
    });

    if(this.max){
      Array(10).fill('').forEach((e, index) => {
        this.maximum.push(+this.max + ((index) * 100))
      });
    }

    Array(10).fill('').forEach((e, index) => {
      this.minimum.push((index+1)*100);
    })
    this.collectAllCategory();
  }

  collectAllCategory(){
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.error.message);
      }
    })
  }

  categorySelected(category_id: string){
    this.category = category_id;
    this.router.navigate([''], {
      queryParams: {
        'category': category_id
      }
    });
  }

  setMaxValue(minValue: number){
    this.maximum = [];
    Array(10).fill('').forEach((e, index) => {
      this.maximum.push(+minValue + ((index + 1) * 100))
    });
    this.maximum.push(this.maximum[this.maximum.length - 1] + "+");
  }

  filter(minValue, maxValue){
    if(this.category != ''){
      let queryParams = {
        'category': this.category
      }
      if(!isNaN(minValue)){
        queryParams['min'] = minValue;
      }
      if(!isNaN(maxValue)){
        queryParams['max'] = maxValue;
      }
  
      this.router.navigate([''], {
        queryParams
      });
    } else if(this.category == '' && this.categoryId != ''){
      let queryParams = {
        'category': this.categoryId
      }
      if(!isNaN(minValue)){
        queryParams['min'] = minValue;
      }
      if(!isNaN(maxValue)){
        queryParams['max'] = maxValue;
      }
  
      this.router.navigate([''], {
        queryParams
      });
    } else{
      let queryParams = {
        'category': this.category
      }
      if(!isNaN(minValue)){
        queryParams['min'] = minValue;
      }
      if(!isNaN(maxValue)){
        queryParams['max'] = maxValue;
      }
  
      this.router.navigate([''], {
        queryParams
      });
    }
  }

  reset(){
    // this.categoryId = "";
    this.router.navigate([''], {
      queryParams: {}
    });
  }

}
