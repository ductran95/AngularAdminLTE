import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LogInParam } from '@app/shared/models/params/log-in-param';
import { IcheckOption } from '@app/shared/models/options/icheck-option';
import { AlertService } from '@app/shared/services/common/alert.service';


@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //#region Inputs, Outputs

  //#endregion

  //#region Properties

  logInParam: LogInParam;

  isRememberCheckboxOption: IcheckOption;

  //#endregion

  //#region Constructors

  constructor(private route: ActivatedRoute, private router: Router,
              private authService: AuthenticationService, private alertService: AlertService) { }

  //#endregion

  //#region OnInit

  ngOnInit() {

    this.isRememberCheckboxOption = {
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_minimal-blue'
    };

    this.resetForm();
  }

  //#endregion

  //#region Funtions

  resetForm() {
    this.logInParam = {
      email: '',
      password: '',
      remember: false
    };
  }

  onLogInFormSubmit(logInForm: NgForm) {
    if (logInForm.valid) {
      this.authService.logIn(this.logInParam).subscribe(
        (resp: boolean) => {
          const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
          this.router.navigate([returnUrl]);
        },
        error => {
          this.alertService.error('Login failed!');
        }
      );
    }
  }

  //#endregion

}
