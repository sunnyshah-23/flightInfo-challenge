import { Component, Input, Output,EventEmitter, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FlightInfo } from '../../FlightInfo';
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass, NgIf, NgStyle } from '@angular/common';
@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [FormsModule,NgIf,NgClass,NgStyle],
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css'
})
export class AddFlightComponent {
  airline:string='';
  arrivalDate:string='';
  arrivalTime:string='';
  flightNumber:string='';
  numOfGuests:number=1;
  comments:string='';
  userMsg:string='';
  showCustomError?:boolean;
  hasError?:boolean;
  inValidDate?:boolean=false;
  inValidNumGuests?:boolean=false;

  @Input() flightInfoSuccess:boolean|undefined;
  @Input() name:string|null='';
  @Output() Details:EventEmitter<FlightInfo>=new EventEmitter();
  
  @ViewChild('airlineInput') airlineInput!:ElementRef;
  @ViewChild('arrDate') arrDate!:ElementRef;
  @ViewChild('arrTime') arrTime!:ElementRef;
  @ViewChild('fNumber') fNumber!:ElementRef;
  @ViewChild('numGuests') numGuests!:ElementRef;



  ngOnChanges(changes: SimpleChanges): void {
    if(this.flightInfoSuccess){
      this.userMsg = 'Thank you for sharing the flight details, our sales team will soon reach out to you';
      this.showCustomError=true;
    }else if(this.flightInfoSuccess===false){
      this.userMsg = 'Please fill all the details!';
      this.showCustomError=false;
    }
  }

  onSubmit(){
    this.removeCustomError();

    let flightInfo:FlightInfo={
      airline:this.airline,
      arrivalDate:this.arrivalDate,
      arrivalTime:this.arrivalTime,
      flightNumber:this.flightNumber,
      numOfGuests:this.numOfGuests,
    }

    if(this.comments){
      flightInfo.comments = this.comments; 
    }
    this.validateFields();
   
    if(!this.hasError){
      this.Details.emit(flightInfo);
      this.airline='';
      this.arrivalDate='';
      this.arrivalTime='';
      this.flightNumber=''
      this.numOfGuests=1;
      this.comments='';
    }
   
  }

  validateFields(){
    if(!this.airline){
      this.addErrorBordder(this.airlineInput);
    }

    if(!this.arrivalDate){
      this.addErrorBordder(this.arrDate);
    }

    if(this.arrivalDate){
      let date=new Date(this.arrivalDate);
      if(isNaN(date.getTime())){
        this.addErrorBordder(this.arrDate);
        this.inValidDate=true;
      }
    }
    
    if(!this.arrivalTime){
      this.addErrorBordder(this.arrTime);
    }
    if(!this.flightNumber){
      this.addErrorBordder(this.fNumber);
    }
    if(!this.numOfGuests || this.numOfGuests<1){
      this.addErrorBordder(this.numGuests);
      if(this.numOfGuests<1){
        this.inValidNumGuests=true;
      }
    }
  }
  addErrorBordder(element:ElementRef){
    element.nativeElement.style.border='2px solid red';
    this.hasError=true;
    this.userMsg = 'Please fill all the details!';
    this.showCustomError=false;
  }

  removeCustomError(){
    let fields:ElementRef[]=[this.airlineInput,this.arrDate,this.arrTime,this.fNumber,this.numGuests];
    fields.forEach(field=>{
      field.nativeElement.style.border = '';
    })
    this.hasError=false;
    this.userMsg = 'Thank you for sharing the flight details, our sales team will soon reach out to you';
    this.showCustomError=true;
    this.inValidNumGuests=false;
    this.inValidDate=false;
  }
}
