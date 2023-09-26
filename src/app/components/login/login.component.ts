import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router // Inject Router for navigation
  ) {}

  Login(): void {
    this.authService.login(this.username, this.password).subscribe(
      success => {
        if (success) {
          console.log('Login successful!'); // Log successful login
          this.router.navigate(['/home']); // Navigate to the home page or another route on successful login
        } else {
          console.log('Login failed!'); // Log failed login

          this.errorMessage = 'Login failed!';
        }
      },
      error => {
        console.error('Login error:', error); // Log any errors during login
        this.errorMessage = 'An error occurred during login.'; // Set errorMessage on error
      }
    );
  }
}
