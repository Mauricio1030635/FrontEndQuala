import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BoardsComponent } from './boards.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent,
    canActivate: [authGuard],
    children: [
      { path: 'main', component: MainComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'main', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
