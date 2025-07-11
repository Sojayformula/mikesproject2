import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckboxService {

  constructor() { }

  //   private typingStatusMap = new BehaviorSubject<Record<string, boolean>>({});

  // typingStatus$ = this.typingStatusMap.asObservable();

  // setTypingStatus(step: string, isTyping: boolean) {
  //   const currentStatus = this.typingStatusMap.value;
  //   this.typingStatusMap.next({
  //     ...currentStatus,
  //     [step]: isTyping,
  //   });
  // }

  // getTypingStatus(step: string): boolean {
  //   return this.typingStatusMap.value[step] || false;
  // }
  // private fieldStatusMap = new BehaviorSubject<Record<string, boolean>>({});
  // private formComplete = new BehaviorSubject<boolean>(false);

  // fieldStatus$ = this.fieldStatusMap.asObservable();
  // formComplete$ = this.formComplete.asObservable();

  // setTypingStatus(fieldName: string, isFilled: boolean) {
  //   const currentStatus = this.fieldStatusMap.value;
  //   const updatedStatus = {
  //     ...currentStatus,
  //     [fieldName]: isFilled,
  //   };

  //   this.fieldStatusMap.next(updatedStatus);
  //   const allFilled = Object.values(updatedStatus).every(val => val === true);
  //   this.formComplete.next(allFilled);
  // }

  // resetStatuses() {
  //   this.fieldStatusMap.next({});
  //   this.formComplete.next(false);
  // }

  // isFormComplete(): boolean {
  //   return this.formComplete.value;
  // }
   private typingStatusMap = new BehaviorSubject<Record<string, boolean>>({});
  typingStatus$ = this.typingStatusMap.asObservable();

  // Update typing/completion status for a specific step
  setTypingStatus(step: string, isComplete: boolean) {
    const currentStatus = this.typingStatusMap.value;
    this.typingStatusMap.next({
      ...currentStatus,
      [step]: isComplete,
    });
  }

  // Retrieve whether a specific step is marked complete
  getTypingStatus(step: string): boolean {
    return this.typingStatusMap.value[step] || false;
  }

  // Optional: Reset all statuses (e.g. when switching mode or user)
  resetAll() {
    this.typingStatusMap.next({});
  }
}