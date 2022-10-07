import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../models/auth.interface';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm:FormGroup = this._fb.group({
    email: ['',[Validators.email , Validators.required]],
    password: ['' , Validators.required],
  });

  constructor(public authService: AuthService, private router: Router,private _fb:FormBuilder) { }

  ngOnInit(): void {
  }

  userLogin() {
    this.authService.userLogin(this.loginForm.value).subscribe((data) => {
      if (data) {
        this.router.navigate(['/']);
      }
    });
  }

}
