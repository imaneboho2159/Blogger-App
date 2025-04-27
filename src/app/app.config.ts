import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBzd5-466OmDSPeu9DBlVLdyHeZdlmi2KA",
  authDomain: "blogapp-d9286.firebaseapp.com",
  projectId: "blogapp-d9286",
  storageBucket: "blogapp-d9286.firebasestorage.app",
  messagingSenderId: "758521102738",
  appId: "1:758521102738:web:b5e7772dae31480eea414b",
  measurementId: "G-FNTXYNGM5L"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};