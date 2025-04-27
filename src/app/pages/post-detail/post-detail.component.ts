import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PostService, Post } from '../../services/post.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  isLoading = true;
  errorMessage: string | null = null;
  defaultImage = 'assets/placeholder-image.jpg'; // Define fallback image path

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    console.log('PostDetailComponent initialized'); // Debugging
  }

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'Invalid post ID';
      this.isLoading = false;
      console.error('No post ID provided'); // Debugging
      return;
    }

    console.log('Fetching post with ID:', id); // Debugging
    this.isLoading = true;
    this.postService.getPost(id).subscribe({
      next: (post: Post) => {
        this.post = post;
        this.isLoading = false;
        this.errorMessage = null;
        console.log('Post loaded:', post); // Debugging
      },
      error: (error: Error) => {
        this.errorMessage = error.message || 'Failed to load post details';
        this.isLoading = false;
        this.post = null;
        console.error('Error fetching post:', error); // Debugging
      },
    });
  }

  sanitizeImageUrl(url: string | undefined): SafeUrl {
    const imageUrl = url || this.defaultImage;
    console.log('Sanitizing image URL:', imageUrl); // Debugging
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}