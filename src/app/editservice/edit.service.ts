import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor() { }


   private actionSource = new Subject<'edit' | 'save' | 'cancel'>();
  action$ = this.actionSource.asObservable();

  trigger(action: 'edit' | 'save' | 'cancel') {
    this.actionSource.next(action);
  }


}

  //  public editModeSubject = new BehaviorSubject<boolean>(false);
  // editMode$ = this.editModeSubject.asObservable();

  // enableEdit() {
  //   this.editModeSubject.next(true);
  // }

  // disableEdit() {
  //   this.editModeSubject.next(false);
  // }


  // setEditMode(value: boolean) {
  //   this.editModeSubject.next(value);
  // }

  //   triggerSave() {
  //   this.saveSubject.next();
  //   this.setEditMode(false); // optionally exit edit mode after save
  // }





  //  public editModeSubject = new BehaviorSubject<boolean>(false);
  // editMode$ = this.editModeSubject.asObservable();

  // // Subject to trigger save
  // public saveSubject = new Subject<void>();
  // save$ = this.saveSubject.asObservable();

  // enableEdit() {
  //   this.editModeSubject.next(true);
  // }

  // disableEdit() {
  //   this.editModeSubject.next(false);
  // }
 

  // setEditMode(value: boolean) {
  //   this.editModeSubject.next(value);
  // }

  // // Call this to trigger save
  // triggerSave() {
  //   this.saveSubject.next();
  //   this.setEditMode(false); // optionally exit edit mode after save
  // }



