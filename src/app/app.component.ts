import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from './services/post.service.ts.service';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { LoginComponent } from './pages/login/login.component';
import { PostDetailComponent } from "./pages/post-detail/post-detail.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, PostFormComponent, LoginComponent, PostListComponent, PostDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blog-app';
}
