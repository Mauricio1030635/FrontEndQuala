import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/User';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private router: Router) { }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/auth/login']);
  }

  getUser(): any | User {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
