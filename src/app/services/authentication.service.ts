import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import {interval} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app"; // Import firebase/compat/app for compatibility
import Persistence = firebase.auth.Auth.Persistence;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any ;
  ready = false
  constructor(private afAuth: AngularFireAuth,private firestore : AngularFirestore,) {

    this.initialize().then(_=>{
      this.ready = true;
      console.log(this.ready)
    })
  }
  async initialize() {
    await this.afAuth.setPersistence(Persistence.LOCAL).then(_ => {

    });
    this.afAuth.authState.subscribe((user) => {
      this.userData = user;
    });
  }
  async  googleLogin(){
    const result = await this.afAuth.signInWithPopup(new GoogleAuthProvider());
    this.userData = result.user;
    return this.userData;
  }
  isLoggedIn(): boolean {
    return !!this.userData; // Check if user is logged in
  }
  async SignOut(): Promise<boolean> {

    try {
      await this.afAuth.signOut();
      return true // Clear user data
    } catch (error) {
      console.error(error);
      return false
    }
  }

}
