import { Routes } from '@angular/router';
import { authGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {
    path: 'posts',
    loadComponent: () =>
      import('./posts/posts.component').then((c) => c.PostsComponent),
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('./post/post.component').then((c) => c.PostComponent),
  },
  {
    path: 'create',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./create/create.component').then((c) => c.CreateComponent),
  },
];
export default routes;
