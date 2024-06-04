// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { UiService } from '../service/ui.service';  // Make sure to import UiService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private uiService: UiService  // Inject UiService
  ) { }

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.uiService.success('Login successful');
      this.router.navigate(['/task-list']);
    } catch (error) {
      this.uiService.wrong('Login failed , try again!');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  navigateToForgotPassword() {
    console.log('aaaaaaaaaaa');
    
    this.router.navigate(['/forgot-password']);
  }
}
