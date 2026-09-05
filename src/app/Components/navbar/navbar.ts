import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  us = inject(AuthService);
  router = inject(Router);

  LogoutUser()
  {
    this.us.LogOut().subscribe({
      next: res => {
        this.router.navigateByUrl('');
      }
    });
  } // LogoutUser...
} // class...
