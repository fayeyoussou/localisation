import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  isLogin = false;
  userName = ''
  get userIcon (): 'user-add' | 'user-delete' {
    return this.isLogin ? 'user-delete' : 'user-add'
  }
  constructor(private authService : AuthenticationService) {
  }
  async login (){
    if(this.isLogin){
      await this.authService.SignOut()
    } else {
      let user = await this.authService.googleLogin();
      console.log(user)
      this.userName = user.displayName
    }
    this.isLogin = this.authService.isLoggedIn();


  }
}
