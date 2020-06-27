import { Component, OnInit } from '@angular/core';
import { Credentials } from 'src/app/shared/models/credentials';
import { UserService } from 'src/app/shared/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: HTMLFormElement;
  returnUrl: string;

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.returnUrl = paramMap.get('returnUrl');
    })
  }

  login(event: Event){
    event.preventDefault();
    this.form = <HTMLFormElement>event.target;
    let email = (<HTMLInputElement>this.form.elements.namedItem('email')).value;
    let password = (<HTMLInputElement>this.form.elements.namedItem('password')).value;

    let credentials: Credentials = {
      email, password
    };

    this.userService.login(credentials).subscribe({
      next: (result) => {
        let url = this.returnUrl ? this.returnUrl : '/'; 
        this.toastr.success(result.message, 'Success');
        this.router.navigateByUrl(url);
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.error.message, 'Failure');
      }
    })
  }

}
