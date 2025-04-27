import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'post-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'post-list', component: PostListComponent },
  { path: 'post-form', component: PostFormComponent },
  { path: 'edit/:id', component: PostFormComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'home', component: PostCardComponent },
];