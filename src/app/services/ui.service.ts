import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UiService {

  private name?:string|null='';
  private authError?:any;
  private nameSubject= new BehaviorSubject<string|null>(null);
  private authErroSubject= new BehaviorSubject<any>(null);

  constructor() { }

  saveName(displayName:string|null):void{
    this.name=displayName;
    this.nameSubject.next(this.name);
  }


  setError(error:any):void{
    this.authError=error;
    this.authErroSubject.next(this.authError);
    
  }
  getName():Observable<string|null>{
    return this.nameSubject.asObservable();
  }

  getAuthError():Observable<string>{
    return this.authErroSubject.asObservable();
  }
}
