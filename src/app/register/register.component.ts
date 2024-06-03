// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.email, this.password);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
