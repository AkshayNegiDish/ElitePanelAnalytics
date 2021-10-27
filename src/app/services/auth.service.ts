import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })

export class AuthenticationService {
	currentUser: any;
	acceptedRoutes = [];
	permissions = [];
	constructor(private http: HttpClient, private router: Router) {}

	login(value) {
		return this.http.post<any>('/api/v1/analytics/user/auth', value)
			.pipe(map(user => {
				console.log("user", user);
				if (user && user.data.token) {
					this.setToken(user.data.token);
				}
				return user;
			}));
	}

	setToken(token) {
		window.localStorage.setItem('appzone-dashboard-token', token);
	}

	getToken() {
		return window.localStorage.getItem('appzone-dashboard-token');
	}

	getUser() {
		return this.currentUser;
	}

	setAcceptedRoutes(arr) {
		this.acceptedRoutes = arr;
	}

	getAcceptedRoutes() {
		return this.acceptedRoutes;
	}

	fetchPermissions(user) {
		console.log("user +++++++++++++++++++++++++", user);
		var allpermissions = user.allpermissions;
		if (user.role == 'standard') {
			for (var i = 0; i < allpermissions.length; i++) {
				if (allpermissions[i].children) {
					var arr = [];
					for (var j = 0; j < allpermissions[i]['children'].length; j++) {
						if (user.permissions.indexOf(allpermissions[i]['children'][j].key) > -1) {
							arr.push(allpermissions[i]['children'][j]);
							this.acceptedRoutes.push('/' + allpermissions[i].key + '/' + allpermissions[i]['children'][j].key);
						}
					}
					if (arr.length > 0) {
						var temp = allpermissions[i];
						temp.children = arr;
						this.permissions.push(temp);
					}
				} else {
					if (user.permissions.indexOf(allpermissions[i].key) > -1) {
						this.permissions.push(allpermissions[i]);
						this.acceptedRoutes.push('/' + allpermissions[i].key);
					}
				}
			}
			this.acceptedRoutes = this.acceptedRoutes.concat(['/home', '/error']);
		} else {
			this.permissions = allpermissions;
		}
	}

	getPermissions() {
		return this.permissions;
	}

	fetchUser() {
		return this.http.get<any>('/api/v1/dishtv/dashboard/users/dashboard?token=' + this.getToken())
			.pipe(map(data => {
				console.log("data dsfsfsdfsdf", data);
				this.currentUser = data.data[0];
				this.fetchPermissions(data.data[0]);
				return this.currentUser;
			}), catchError(err => { this.logout(); return null; }));
	}

	logout() {
		window.localStorage.removeItem('appzone-dashboard-token');
		//	this.cookieService.delete('appzone-dashboard-token', '/', window.location.hostname);
		this.router.navigate(['login']);
	}
}