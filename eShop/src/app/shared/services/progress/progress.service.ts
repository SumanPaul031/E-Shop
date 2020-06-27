import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private loaderObservable$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() { }

  get loaderObservable(){
    return this.loaderObservable$;
  }

  hide(){
    this.loaderObservable$.next(false);
  }

  show(){
    this.loaderObservable$.next(true);
  }
}
