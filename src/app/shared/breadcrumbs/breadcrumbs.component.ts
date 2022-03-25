import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { pluck, take, filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo!: string;
  public tituloSub$!: Subscription;

  constructor(private router: Router) {
    this.tituloSub$ = this.getArgumentosRuta();
  }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

  getArgumentosRuta() {
    return (
      this.router.events
        // .pipe(take(1), pluck('snapshot', 'data', 'titulo'))
        .pipe(
          filter(
            (event): event is ActivationEnd => event instanceof ActivationEnd
          ),
          filter((event: ActivationEnd) =>
            event.snapshot.firstChild === null ? true : false
          ),
          map((event: ActivationEnd) => {
            return event.snapshot.data;
          })
        )
        .subscribe(({ titulo }) => {
          this.titulo = titulo;
          document.title = titulo;
        })
    );
  }
}
