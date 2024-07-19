import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf, NgStyle } from '@angular/common';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgStyle,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string='';
  password:string='';
  error:string='';
  subscription?:Subscription;

  constructor(private auth:AuthService,private uiService:UiService,private router:Router){
    this.subscription=this.uiService.getAuthError().subscribe(value=>{this.error=this.auth.getCustomErrorMessage(value)});
  }
  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/home'])
    }
  }

  login(){
    if(this.email==''){
      this.uiService.setError({code:'auth/no-email'});
      return;
    }
    if(this.password==''){
      this.uiService.setError({code:'auth/no-password'});
      return;
    }

    this.auth.login(this.email,this.password);
    this.email='';
    this.password='';
  }

  signInWithGoogle(){
    this.auth.googleSignIn();
  }
}
