import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../../Services/profile.service';
import { User } from '../../../Models/User';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  private authService = inject(ProfileService)

  totalTasks: number = 0;
  completedTasks: number = 0;


  user!: User;
  ngOnInit(): void {
    this.user = this.authService.getUser();

  }




}
