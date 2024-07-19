import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() name:string|null='';
  subscription?:Subscription;

  constructor(private auth:AuthService,private uiService:UiService){
  }

  logout(){
    this.auth.logout();
  }
}
