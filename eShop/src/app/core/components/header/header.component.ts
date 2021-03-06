import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  numberOfItems: number = 0;
  isLoggedIn: boolean;
  isAdmin$;
  isAdminUrl: boolean = false;

  constructor(private cartService: CartService, private userService: UserService, private router: Router) { 
    router.events.subscribe({
      next: (event) => {
        if(event instanceof NavigationStart){
          let url = (<NavigationStart>event).url;
          this.isAdminUrl = url.includes('/admin');
        }
      }
    })
  }

  ngOnInit(): void {
    this.cartService.cartObservable.subscribe({
      next: (cart) => {
        this.numberOfItems = Object.keys(cart).length;
        console.log(Object.keys(cart).length);
      }
    });

    this.userService.loginObservable.subscribe({
      next: () => {
        let token = this.userService.getToken();
        if(token != ""){
          this.checkAdmin();
          this.isLoggedIn = true;
        } else{
          this.isLoggedIn = false;
        }
      }
    })
  }

  checkAdmin(){
    // this.userService.isAdmin().subscribe({
    //   next: (isAdmin) => {
    //     this.isAdmin = isAdmin;
    //   }
    // })

    this.isAdmin$ = this.userService.isAdmin();
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['login']);
  }

}
