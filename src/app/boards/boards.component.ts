import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../../Services/profile.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.css'
})
export class BoardsComponent implements OnInit {

  isSidebarExpanded = true;
  constructor(private authService: ProfileService) { }
  user: any;
  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }


  logout(): void {
    this.authService.logout();
  }



}
