

import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc, deleteDoc, docData } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';


export interface Post {
  id?: string;
  title: string;
  category: string;
  content: string;
  image: string;
  
}

@Injectable({ providedIn: 'root' })
export class PostService {
  private postsRef = collection(this.firestore, 'posts');

  constructor(private firestore: Firestore) {}

  getPosts(): Observable<Post[]> {
    return collectionData(this.postsRef, { idField: 'id' }) as Observable<Post[]>;
  }

  getPost(id: string): Observable<Post> {
    const postDoc = doc(this.firestore, `posts/${id}`);
    return docData(postDoc, { idField: 'id' }) as Observable<Post>;
  }

  createPost(post: Post) {
    return addDoc(this.postsRef, { ...post, createdAt: new Date() });
  }

  updatePost(post: Post) {
    const postDoc = doc(this.firestore, `posts/${post.id}`);
    return setDoc(postDoc, post);
  }

  deletePost(id: string) {
    const postDoc = doc(this.firestore, `posts/${id}`);
    return deleteDoc(postDoc);
  }
}
