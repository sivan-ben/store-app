import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorsService implements HttpInterceptor {

  constructor(private Injector: Injector) { }
  intercept(req, next) {
    const registrationService = this.Injector.get(RegistrationService)
    const tokenizedReq = req.clone({
      setHeaders: {
        authorization: `Bearer ${registrationService.sendToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }

}
