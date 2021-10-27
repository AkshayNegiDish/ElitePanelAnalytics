import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public loginForm: FormGroup;

  returnUrl: string;
  submitted: boolean;
  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router, private fbuild: FormBuilder) { }

  buildForm() {
    this.loginForm = this.fbuild.group({
      email: '',
      password: '',
    });
  }
  ngOnInit() {
    this.buildForm();
    console.log('ssss');
    this.submitted = false;
    if (this.authenticationService.getToken()) this.router.navigate(['login']);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (this.loginForm.valid) {
      // alert('Email and Password is required.');
      // return;
      var value = this.loginForm.value;
      this.submitted = true;
      this.authenticationService.login(value)
        .subscribe(data => {
          localStorage.setItem('userName', data.data.user.name)
          this.router.navigate(['dashboard']);
        },
          error => {
            this.submitted = false;
          });
    } else {
      var value = this.loginForm.value;
      this.submitted = true;
      this.authenticationService.login(value)
        .subscribe(data => {
          localStorage.setItem('userName', data.data.user.name)
          this.router.navigate(['dashboard']);
        },
          error => {
            this.submitted = false;
          });
    }

  }
}
