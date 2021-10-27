import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private auth: AuthenticationService, private router: Router) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (this.auth.getToken()) {
			if (this.auth.getUser()) {
				return this.checkUser(state.url, this.auth.getUser());
			} else {
				// return this.auth.fetchUser()
				// 	.pipe(map(data => {
				// 		return this.checkUser(state.url, this.auth.getUser());
				// 	}));
				return true;
			}
		} else {
			this.router.navigate(['login']);
			return true;
		}
	}
	checkUser(url, user) {
		if (user.role != 'standard') {
			return true;
		} else {
			url = url.split('?')[0];
			if (this.auth.getAcceptedRoutes().indexOf(url) > -1) {
				return true;
			} else {
				this.router.navigate(['error']);
				return true;
			}
		}
	}

}
