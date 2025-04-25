import { inject, Injectable } from '@angular/core';
import { Auth } from "@angular/fire/auth";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuth = inject(Auth)

  register(email: string, username: string, password: string): Observable<void>{
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(reponse => updateProfile(reponse.user, {displayName: username}),
  );

  return from(promise);
  }
}
