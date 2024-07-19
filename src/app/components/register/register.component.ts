import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name:string='';
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

  register(){
    if(this.name==''){
      this.uiService.setError({code:'auth/no-name'});
      return;
    }
    if(this.email==''){
      this.uiService.setError({code:'auth/no-email'});
      return;
    }
    if(this.password==''){
      this.uiService.setError({code:'auth/no-password'});
      return;
    }

    this.auth.register(this.name,this.email,this.password);
    this.name='';
    this.email='';
    this.password='';
  }

}
