import { Component, Output } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AddFlightComponent } from "../add-flight/add-flight.component";
import { FlightInfo } from '../../FlightInfo';
import { FlightService } from '../../services/flight.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, AddFlightComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router,private flightService:FlightService) {}
  name='';
  flightInfoSuccess:boolean|undefined;

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login'])
    }

    this.name=this.authService.getName();
  }

  addFlightInfo(flightInfo: FlightInfo): void {
    this.flightService.sendFlightInfo(flightInfo, this.name).subscribe({
      next: (res) => {
        this.flightInfoSuccess = res;
      },
      error: (err: HttpErrorResponse) => {
        this.flightInfoSuccess = false;
      }
    });
  }
}
