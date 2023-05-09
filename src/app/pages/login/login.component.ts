import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { UserLoginInfo } from 'src/app/interfaces/login-info';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  router = inject(Router);
  loginService = inject(LoginService);

  user: UserLoginInfo = {
    email: '',
    password: '',
  };

  login() {
    this.loginService
      .login(this.user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert(error.message);
          throw error;
        })
      )
      .subscribe((result) => {
        localStorage.setItem('token', result.user.token);
        this.router.navigateByUrl('/');
      });
  }
}
