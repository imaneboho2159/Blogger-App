import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc, deleteDoc, collectionData, addDoc, query } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { getDocs } from '@angular/fire/firestore';

export interface Post {
  id?: string;
  title: string;
  category: string;
  content: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsCollection;

  constructor(private firestore: Firestore) {
    this.postsCollection = collection(firestore, 'posts');
    console.log('PostService initialized'); // Debugging
  }

  // Get all posts
  getPosts(): Observable<Post[]> {
    console.log('Fetching posts from Firestore'); // Debugging
    return from(getDocs(this.postsCollection)).pipe(
      map(snapshot => {
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
        console.log('Raw posts from Firestore:', posts); // Debugging
        return posts;
      }),
      catchError(error => {
        console.error('Error fetching posts:', error);
        return throwError(() => new Error(`Failed to fetch posts: ${error.message}`));
      })
    );
  }

  // Get a single post by ID
  getPost(id: string): Observable<Post> {
    const postDoc = doc(this.firestore, `posts/${id}`);
    return from(getDoc(postDoc)).pipe(
      map(docSnapshot => {
        if (!docSnapshot.exists()) {
          throw new Error(`Post with ID ${id} not found`);
        }
        return { id: docSnapshot.id, ...docSnapshot.data() } as Post;
      }),
      catchError(error => throwError(() => new Error(`Failed to fetch post: ${error.message}`)))
    );
  }

  // Create a new post
  async createPost(post: Post): Promise<string> {
    try {
      if (!post.title || !post.content) {
        throw new Error('Title and content are required');
      }
      const docRef = await addDoc(this.postsCollection, post);
      console.log('Post created with ID:', docRef.id); // Debugging
      return docRef.id;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Update an existing post
  async updatePost(id: string, post: Partial<Post>): Promise<void> {
    try {
      const postRef = doc(this.firestore, `posts/${id}`);
      await setDoc(postRef, post, { merge: true });
      console.log('Post updated:', id); // Debugging
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  // Delete a post by ID
  async deletePost(id: string): Promise<void> {
    try {
      const postRef = doc(this.firestore, `posts/${id}`);
      await deleteDoc(postRef);
      console.log('Post deleted:', id); // Debugging
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
}