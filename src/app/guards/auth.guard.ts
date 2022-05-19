import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { map, tap } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private user: UserService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.user.renovarToken().pipe(
      map(({ ok }) => {
        if (!ok) {
          this.router.navigateByUrl('/auth/login');
        }
        return ok;
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.user.renovarToken().pipe(
      map(({ ok }) => {
        if (!ok) {
          this.router.navigateByUrl('/auth/login');
        }
        return ok;
      })
    );
  }
}
