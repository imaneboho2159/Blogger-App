import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service.ts.service'; 

interface Post {
  id?: string;
  title: string;
  category: string;
  content: string;
  image?: string;
}

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [PostService],  
  template: `
    <div class="relative flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div class="absolute w-[350px] h-[400px] bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl transform rotate-6 -translate-y-6 -translate-x-6 shadow-lg"></div>
      <div class="relative z-10 bg-white w-full max-w-xl p-6 sm:p-8 rounded-3xl shadow-2xl">
        <h2 class="text-2xl font-bold mb-6 text-center">{{ editing ? 'Edit' : 'Create' }} Post</h2>
        <form (ngSubmit)="submitPost()" class="space-y-5">
          <div class="relative">
            <input [(ngModel)]="post.title" name="title" placeholder=" " class="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1 focus:outline-none focus:border-blue-500" required />
            <label class="absolute left-0 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500">Title</label>
          </div>
          <div class="relative">
            <input [(ngModel)]="post.category" name="category" placeholder=" " class="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1 focus:outline-none focus:border-blue-500" required />
            <label class="absolute left-0 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500">Category</label>
          </div>
          <div class="relative">
            <input [(ngModel)]="post.image" name="image" placeholder=" " class="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1 focus:outline-none focus:border-blue-500" required />
            <label class="absolute left-0 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500">Image URL</label>
          </div>
          <div class="relative">
            <textarea [(ngModel)]="post.content" name="content" placeholder=" " class="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1 focus:outline-none focus:border-blue-500 h-32 resize-none" required></textarea>
            <label class="absolute left-0 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500">Content</label>
          </div>
          <div class="text-center">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">{{ editing ? 'Update' : 'Create' }} Post</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class PostFormComponent implements OnInit {
  post: Post = {
    title: '',
    category: '',
    content: '',
    image: ''
  };
  editing = false;
  postId: string | null = null;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('id');
      if (this.postId) {
        this.editing = true;
       // this.loadPost();
      }
    });
  }

  // // Fetch the post to edit
  // loadPost() {
  //   if (this.postId) {
  //     this.postService.getPost(this.postId).subscribe((post) => {
  //       this.post = post;
  //     });
  //   }
  // }

  // Handle form submission (create or update post)
  submitPost() {
    if (this.editing) {
      if (this.post.id) {
        this.postService.updatePost(this.postId!, { ...this.post, image: this.post.image || '' }).then(() => this.router.navigateByUrl('/'));
      }
    } else {
      this.postService.createPost({ ...this.post, image: this.post.image || '' }).then(() => this.router.navigateByUrl('/'));
    }
  }
}
