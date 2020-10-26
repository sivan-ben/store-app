import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'
import { RegistrationService } from '../app/services/registration.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private RegistrationService: RegistrationService, private Router: Router) { }



  canActivate(): boolean {
    if (this.RegistrationService.ifTokenExsist()) {
      return true
    } else {
      this.Router.navigate(['login'])
      return false
    }
  }


}
