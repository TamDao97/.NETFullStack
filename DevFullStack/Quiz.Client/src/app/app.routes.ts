import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  //   {
  //     path: 'login',
  //     component: LoginComponent,
  //   },
  {
    path: '',
    component: LayoutComponent, // Layout chính của ứng dụng
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
];
