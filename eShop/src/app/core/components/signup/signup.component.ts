import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user/user.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  disable: boolean;

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  matchPasswword(event: Event, password: HTMLInputElement){
    let confirm = (<HTMLInputElement>event.target).value;
    if((confirm !== '') && (password.value !== '') && (confirm != password.value)){
      this.disable = true;
    } else{
      this.disable = false;
    }
  }

  signup(event: Event){
    event.preventDefault();
    let form = <HTMLFormElement>event.target;
    let name = (<HTMLInputElement>form.elements.namedItem('name')).value;
    let email = (<HTMLInputElement>form.elements.namedItem('email')).value;
    let phone = (<HTMLInputElement>form.elements.namedItem('phone')).value;
    let password = (<HTMLInputElement>form.elements.namedItem('password')).value;
    let user: User = {
      name, 
      email,
      password,
      phone
    };

    this.userService.signup(user).subscribe({
      next: (result) => {
        this.toastr.success(result.message, 'Success');
        form.reset();
        this.router.navigate(['login']);
      }, 
      error: (err: HttpErrorResponse) => {
        // console.log(err.error.error.message);
        this.toastr.error(err.error.error.message, 'Failure');
      }
    })
  }
}
