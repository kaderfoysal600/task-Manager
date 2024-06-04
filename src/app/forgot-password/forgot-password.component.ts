// src/app/components/forgot-password/forgot-password.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  error: string = '';

  constructor(private authService: AuthService) { }

  async resetPassword() {
    try {
      await this.authService.resetPassword(this.email);
      this.message = 'A password reset link has been sent to your email.';
      this.error = '';
    } catch (error) {
      this.error = error.message;
      this.message = '';
    }
  }
}
