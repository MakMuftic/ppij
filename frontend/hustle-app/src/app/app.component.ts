import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit() {
   this.formAnimation();
    if(localStorage.getItem('currentUser') !== null) {
      this.router.navigate(['startpage']);
    }
  }
  constructor(private router:Router ) {}

  formAnimation() {
    const switchRegister = document.querySelector('.form .js-switch-register');
    const switchLogin = document.querySelector('.form .js-switch-login');

    const loginForm = document.querySelector('.form .js-form-login');
    const registerForm = document.querySelector('.form .js-form-register');

    if(switchRegister) {
      switchRegister.addEventListener('click', () => {
        loginForm.classList.add('u-animation--fade-out-down');

        registerForm.classList.remove('u-display-none');
        registerForm.classList.add('u-animation--fade-in-up');

        setTimeout(() => {
          loginForm.classList.remove('u-display-block');
          loginForm.classList.remove('u-opacity-1');
          loginForm.classList.add('u-display-none');
          loginForm.classList.add('u-opacity-0');
          loginForm.classList.remove('u-animation--fade-out-down');

          registerForm.classList.add('u-display-block');
          registerForm.classList.add('u-opacity-1');
          registerForm.classList.remove('u-opacity-0');
          registerForm.classList.remove('u-animation--fade-in-up');
        }, 500)
      });
    }

    if(switchLogin) {
      switchLogin.addEventListener('click', () => {
        registerForm.classList.add('u-animation--fade-out-down');

        loginForm.classList.remove('u-display-none');
        loginForm.classList.add('u-animation--fade-in-up');

        setTimeout(() => {
          registerForm.classList.remove('u-display-block');
          registerForm.classList.remove('u-opacity-1');
          registerForm.classList.add('u-display-none');
          registerForm.classList.add('u-opacity-0');
          registerForm.classList.remove('u-animation--fade-out-down');

          loginForm.classList.add('u-display-block');
          loginForm.classList.add('u-opacity-1');
          loginForm.classList.remove('u-opacity-0');
          loginForm.classList.remove('u-animation--fade-in-up');
        }, 500)
      });
    }
  }

}
