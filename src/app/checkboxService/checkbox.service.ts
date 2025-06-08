import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckboxService {

  constructor() { }

  //   private typingStatus = new BehaviorSubject<{ [key: string]: boolean }>({});

  // typingStatus$ = this.typingStatus.asObservable();

  // setTypingStatus(step: string, isTyping: boolean) {
  //   const current = this.typingStatus.value;
  //   this.typingStatus.next({ ...current, [step]: isTyping });
  // }

    private typingStatusMap = new BehaviorSubject<Record<string, boolean>>({});

  typingStatus$ = this.typingStatusMap.asObservable();

  setTypingStatus(step: string, isTyping: boolean) {
    const currentStatus = this.typingStatusMap.value;
    this.typingStatusMap.next({
      ...currentStatus,
      [step]: isTyping,
    });
  }

  getTypingStatus(step: string): boolean {
    return this.typingStatusMap.value[step] || false;
  }
}
