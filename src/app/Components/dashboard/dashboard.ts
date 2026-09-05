import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth-service';
import { IUserProfile } from '../../ClassesAndInterfaces/IUserProfile';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  authService = inject(AuthService);
  userProfile: IUserProfile = {} as IUserProfile;

  ngOnInit(): void {
    this.authService.GetUserProfile().subscribe({
      next: res => {
        this.userProfile.UserId = res.UserId;
        this.userProfile.UserName = res.UserName;
        this.userProfile.IsAdmin =res.IsAdmin;
        this.userProfile.DateFrom = res.DateFrom;
        this.userProfile.DateTo = res.DateTo;
        this.userProfile.companyId = res.companyId;
      }
    });
  } // ngOnInit...
} // class...
