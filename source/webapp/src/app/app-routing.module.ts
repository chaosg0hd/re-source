import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrComponent } from './pages/hr/hr.component';
import { InterfaceComponent } from './interface/interface.component';
import { HomeComponent } from './pages/home/home.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { LoginComponent } from './login/login/login.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
/*import { GalleryComponent } from './pages/test/test/gallery/gallery.component';*/
import { TaskboardComponent } from './pages/taskboard/taskboard.component';
import { BundyComponent } from './bundy/bundy.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'login', component: LoginComponent
  },

  {
    path: 'bundy', component: BundyComponent, canActivate:[AuthGuard]
  },

  //{
  //  path: 'test', component: IntefaceComponent, children:
  //    [
  //      { path: '', component: TestComponent },
  //    ]
  //},

  {
    path: 'home', component: InterfaceComponent, children:
      [
        { path: '', component: HomeComponent, canActivate:[AuthGuard] },
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
  //{
  //  path: 'gallery',
  //  component: GalleryComponent,
  //  data: { title: 'List of Sales' }
  //},
  // {
  //   path: 'gallery-details/:id',
  //   component: GalleryDetailsComponent,
  //   data: { title: 'Sales Details' }
  // },
  // { path: '',
  //   redirectTo: '/gallery',
  //   pathMatch: 'full'
  // }


]




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
