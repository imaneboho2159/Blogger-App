import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PostService, Post } from '../../services/post.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list.component.html',
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private postService: PostService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    console.log('PostListComponent initialized'); // Debugging
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    console.log('Starting loadPosts'); // Debugging
    this.isLoading = true;
    this.postService.getPosts().subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
        this.errorMessage = null;
        console.log('Posts loaded:', posts); // Debugging
      },
      error: (error: Error) => {
        this.errorMessage = 'Failed to load posts. Please try again or contact support.';
        this.isLoading = false;
        console.error('Error in getPosts:', error); // Debugging
      },
    });
  }

  viewPost(id: string | undefined) {
    if (id) {
      this.router.navigate(['/posts', id]);
      console.log('Navigating to post:', id); // Debugging
    }
  }

  editPost(id: string | undefined) {
    if (id) {
      this.router.navigate(['/edit', id]);
      console.log('Navigating to edit post:', id); // Debugging
    }
  }

  async deletePost(id: string | undefined) {
    if (id && confirm('Are you sure you want to delete this post?')) {
      try {
        await this.postService.deletePost(id);
        this.loadPosts();
        console.log('Post deleted, reloading posts'); // Debugging
      } catch (error) {
        this.errorMessage = 'Failed to delete post.';
        console.error('Error deleting post:', error);
      }
    }
  }

  sanitizeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}