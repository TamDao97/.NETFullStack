import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ExaminfoComponent } from './pages/examinfo/examinfo.component';
import { ExamdetailComponent } from './pages/examdetail/examdetail.component';
import { ExamresultComponent } from './pages/examresult/examresult.component';
import { LoginComponent } from './pages/auth/login/login.component';


export const routes: Routes = [
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
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'examinfo/:id',
        component: ExaminfoComponent,
      },
      {
        path: 'examdetail/:id',
        component: ExamdetailComponent,
      },
      {
        path: 'examresult/:id',
        component: ExamresultComponent,
      }
    ],
  },
];
