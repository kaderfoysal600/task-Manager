// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Login Error: ", error);
      throw error; // Rethrow the error to be handled in the component
    }
  }

  async register(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Registration Error: ", error);
      throw error; // Rethrow the error to be handled in the component
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error("Logout Error: ", error);
      throw error; // Rethrow the error to be handled in the component
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error("Password Reset Error: ", error);
      throw error; // Rethrow the error to be handled in the component
    }
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }
}
