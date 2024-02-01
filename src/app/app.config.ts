import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNzIcons } from './icons-provider';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

registerLocaleData(en);
const firebaseConfig = {
  apiKey: "AIzaSyAliT81Bg0JpyMjh89I8NLbWI3OrCxBLGI",
  authDomain: "location-app-106a1.firebaseapp.com",
  projectId: "location-app-106a1",
  storageBucket: "location-app-106a1.appspot.com",
  messagingSenderId: "419253088307",
  appId: "1:419253088307:web:1a66da72e2b281b2ce7346"
};

export const appConfig: ApplicationConfig = {
  providers: [ importProvidersFrom(FormsModule,[
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,

  ]) ,provideRouter(routes), provideNzIcons(), provideNzI18n(en_US), importProvidersFrom(FormsModule), importProvidersFrom(HttpClientModule), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"location-app-106a1","appId":"1:419253088307:web:1a66da72e2b281b2ce7346","storageBucket":"location-app-106a1.appspot.com","apiKey":"AIzaSyAliT81Bg0JpyMjh89I8NLbWI3OrCxBLGI","authDomain":"location-app-106a1.firebaseapp.com","messagingSenderId":"419253088307"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
