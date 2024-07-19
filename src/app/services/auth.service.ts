import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { UiService } from './ui.service';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth,private router:Router,private uiService:UiService) {}

  login(email:string,password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(async(response)=>{
      const token=await response.user?.getIdToken();
      token && localStorage.setItem('token',token);
      if(response.user){
        let name=response.user.displayName || '';
        localStorage.setItem('name',name);
      }
      this.uiService.setError('');
      this.router.navigate(['/home']);
    },err=>{
      this.uiService.setError(err);
    })
  }


  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(async(response)=>{
      const token= await response.user?.getIdToken();
      token && localStorage.setItem('token',token);
      if(response.user){
        let name=response.user.displayName || '';
        localStorage.setItem('name',name);
      }
      this.uiService.setError('');
      this.router.navigate(['/home']);
    },err=>{
      this.uiService.setError(err);
    })
  }

  register(name:string,email:string,password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(async(response)=>{
      this.uiService.setError('');
      await response.user?.updateProfile({
        displayName:name
      })
      this.router.navigate(['/login']);
    }).catch(err=>{
      this.uiService.setError(err);
    })
  }

  getCustomErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/no-email':
        return 'Please enter your email'

      case 'auth/no-name':
        return 'Please enter your name'

      case 'auth/no-password':
        return 'Please enter your password'

      case 'auth/invalid-email':
        return 'The email address is badly formatted.';

      case 'auth/user-not-found':
        return 'No user found with this email address.';

      case 'auth/weak-password':
        return 'Password should be atleast 6 characters long';

      case 'auth/email-already-in-use':
        return 'The email address is already in use by another account.';

      case 'auth/invalid-credential':
        return 'Entered email or password is incorrect.';

      case 'auth/too-many-requests':
        return 'Somthing went wrong'

      default:
        return '';
    }
  }

  isLoggedIn():boolean{
    if(localStorage.getItem('token')) return true;
    return false;
  }

  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      this.router.navigate(['/login']);
    },err=>{
      alert(err.message);
    })
  }

  getName():string{
    const name= localStorage.getItem('name');
    return name !== null ? name : '';
  }
}
