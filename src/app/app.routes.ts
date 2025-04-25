import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PostService } from './services/post.service.ts.service';
import { NgModule } from '@angular/core';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'edit/:id', component: PostFormComponent },
  { path: 'home', component: PostCardComponent },
  { path: 'post-list', component: PostListComponent },
{ path: 'post-form', component: PostFormComponent },


];
