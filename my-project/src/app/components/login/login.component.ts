import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm
  public loginMessage

  constructor(private formBuilder: FormBuilder, private registerService: RegistrationService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      userId: "",
      password: ""
    })
  }

  loginUser() {
    this.registerService.getUser(this.loginForm.value).subscribe((res: any) => {
      const { message, result, token } = res
      localStorage.setItem('token',token)
      if (result) return this.router.navigate(['/']);
      if (message) return this.loginMessage = message
    })
    this.loginForm.reset()
  }

  ngOnInit(): void {
  }

}
