import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Observer, Subscription } from 'rxjs';
import { retry, map, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  public intervaloSubs!: Subscription;
  constructor() {
    const obsever: Observer<any> = {
      next: (valor) => console.log('subs:', valor),
      error: (error) => console.warn('error', error),
      complete: () => {
        console.info('se completo el Obs$');
      },
    };
    // this.retornaObservable().pipe(retry(2)).subscribe(obsever);
    this.intervaloSubs = this.retornaIntervalo()
      .pipe(map((resp) => resp + 1))
      .subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervaloSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(100).pipe(
      // take(10),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 2) {
          i = 0;
          observer.error('fallo el obs$');
        }
      }, 1000);
    });
    return obs$;
  }
}
