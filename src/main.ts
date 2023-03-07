import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2MOvj0toVlEO1hiyZUvZFakhXO3EMxFs",
  authDomain: "festival-front-21c76.firebaseapp.com",
  projectId: "festival-front-21c76",
  storageBucket: "festival-front-21c76.appspot.com",
  messagingSenderId: "314860160554",
  appId: "1:314860160554:web:b13273effd75492375a553",
  measurementId: "G-FVN7ZF253W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
