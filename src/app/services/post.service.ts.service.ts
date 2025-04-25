import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc, deleteDoc, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

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
    this.postsCollection = collection(firestore, 'blogger'); 
  }

  // Get all posts
  getPosts(): Observable<Post[]> {
    return collectionData(this.postsCollection, { idField: 'id' }) as Observable<Post[]>;
  }

  // Get a single post by ID
  getPost(id: string): Observable<Post> {
    const postDoc = doc(this.firestore, `posts/${id}`);
    const postPromise = getDoc(postDoc).then(docSnapshot => {
      const postData = docSnapshot.data();
      return { id: docSnapshot.id, ...postData } as Post;
    });
    return from(postPromise);
  }

  // Create a new post
  createPost(post: Post): Promise<void> {
    const postRef = doc(this.firestore, 'posts', post.title);  // Using title as document ID
    return setDoc(postRef, post); // Adding the new post to Firestore
  }

  // Update an existing post
  updatePost(id: string, post: Post): Promise<void> {
    const postRef = doc(this.firestore, `posts/${id}`);
    return setDoc(postRef, post); // Update the post in Firestore by its ID
  }

  // Delete a post by ID
  deletePost(id: string): Promise<void> {
    const postRef = doc(this.firestore, `posts/${id}`);
    return deleteDoc(postRef); // Delete the post from Firestore
  }
}
