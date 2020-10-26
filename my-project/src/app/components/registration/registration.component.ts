import { Component, OnInit } from '@angular/core';
import { UserForm } from './user-form'
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public cities = ['ramat gan', 'tel aviv', 'jerusalem', 'eilat', 'natania', 'hedera', 'rosh pina', 'tveria']
  public registerModel = new UserForm(null, '', null, null, '', '', '', '');
  public showsDiv: Boolean
  public errId
  constructor(private RegistrationService: RegistrationService, private router: Router) {
    this.showsDiv = false
  }

  ngOnInit(): void {
  }

  stepOne() {
    this.RegistrationService.stepOneValidetors(this.registerModel).subscribe((res: any) => {
      const { message } = res
      if (message) return this.errId = message
      this.errId = ''
      this.showsDiv = true
    })
  }

  saveUser() {
    this.router.navigate(['login']);
    this.RegistrationService.saveUserOnDb(this.registerModel).subscribe((res: any) => {
      return res
    })
  }

}
