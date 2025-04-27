import { QuestionComponent } from './pages/question/question.component';
import { UserComponent } from './pages/user/user.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: '',
    component: LayoutComponent, // Layout chính của ứng dụng
    children: [
      {
        path: '',
        redirectTo: 'ui-component',
        pathMatch: 'full',
      },
      {
        path: 'user',
        component: UserComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'question',
        component: QuestionComponent,
      },
    ],
  },
];
