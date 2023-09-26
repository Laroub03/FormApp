import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  username = '';
  password = '';
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) { }

  Register(): void {
    this.authService.register(this.username, this.password).subscribe(
      () => {
        this.successMessage = 'Registration successful';
        this.errorMessage = '';
      },
      error => {
        console.error('Registration failed', error);
        this.successMessage = '';
        this.errorMessage = 'Registration failed';
      }
    );
  }
}
