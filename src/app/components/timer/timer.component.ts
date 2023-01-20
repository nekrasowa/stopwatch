import { Component, OnDestroy } from '@angular/core';
import { buffer, map, debounceTime, filter, takeUntil } from 'rxjs/operators';
import { Observable, Subscription, interval, Subject } from 'rxjs';
import { toFormat } from './toFormat';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
})
export class TimerComponent {
  timer: Observable<string>;
  subscription: Subscription;
  startSeconds: number = 0;
  currSeconds: number = 0;
  isDisabledStart: boolean = false

  timerValue: string = '00:00';

  clickBtn$ = new Subject<Event>();

  doubleClick$ = this.clickBtn$
    .pipe(
      buffer(this.clickBtn$.pipe(debounceTime(500))),
      map((list) => {
        return list.length;
      }),
      filter((x) => x === 2)
    )
    .subscribe((res) => {
      this.waitTimer();
    });

  startTimer(): void {
    this.timer = interval(1000).pipe(
      map((v) => {
        this.currSeconds = this.startSeconds + v;
        const timerFormat = toFormat(this.currSeconds);

        return timerFormat;
      })
    );
  
    this.subscription = this.timer.subscribe((res) => {
      this.timerValue = res;
    });
    this.isDisabledStart = true;
  }

  waitTimer(): void {
    this.subscription.unsubscribe();
    this.startSeconds = this.currSeconds;
    this.isDisabledStart = false
  }

  stopTimer(): void {
    this.subscription.unsubscribe();
    this.startSeconds = 0;
    this.currSeconds = 0;
    this.timerValue = '00:00';
    this.isDisabledStart = false
  }

  resetTimer(): void {
    this.stopTimer();
    this.startTimer();
  }

  getColor(): string { 
    if(this.isDisabledStart) {
      return '#83bb64c9'

    }
    return 'green'
  }
}
