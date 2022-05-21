import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrComponent } from './pages/hr/hr.component';
import { InterfaceComponent } from './interface/interface.component';
import { HomeComponent } from './pages/home/home.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { LoginComponent } from './login/login/login.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { TaskboardComponent } from './pages/taskboard/taskboard.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { BundyComponent } from './bundy/bundy.component';
import { AuthGuard } from './services/auth/auth.guard';
import { ProfileComponent } from './profile/profile.component'

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login', component: LoginComponent
  },

  {
    path: 'bundy', component: BundyComponent, canActivate:[AuthGuard]
  },

  {
    path: 'home', component: InterfaceComponent, children:
      [
        { path: '', component: HomeComponent, canActivate:[AuthGuard] },
      ]
  },
  {
    path: 'profile', component: InterfaceComponent, children:
      [
        { path: '', component: ProfileComponent, canActivate:[AuthGuard] },
      ]
  },

  {
    path: 'hr', component: InterfaceComponent, children:
      [
        { path: '', component: HrComponent, canActivate:[AuthGuard] },
      ]
  },

  {
    path: 'finance', component: InterfaceComponent, children:
      [
        { path: '', component: FinanceComponent, canActivate:[AuthGuard]},
      ]
  },

  {
    path: 'inventory', component: InterfaceComponent, children:
      [
        { path: '', component: InventoryComponent, canActivate:[AuthGuard] },
      ]
  },

  {
    path: 'taskboard', component: InterfaceComponent, children:
      [
        { path: '', component: TaskboardComponent, canActivate:[AuthGuard] },
      ]
  },

  {
    path: 'gallery', component: InterfaceComponent, children:
      [
        { path: '', component: GalleryComponent, canActivate: [AuthGuard] },
      ]
  },


]




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
