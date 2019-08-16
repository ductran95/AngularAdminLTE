import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IcheckOption } from '@app/core/models/options/icheck-option';
import { AlertService } from '@app/core/services/common/alert.service';
import { LoginModel } from '@app/core/models/data/login-model';


@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //#region Inputs, Outputs

  //#endregion

  //#region Properties

  loginModel: LoginModel;

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
    this.loginModel = new LoginModel();
  }

  onLogInFormSubmit(logInForm: NgForm) {
    if (logInForm.valid) {
      this.authService.logIn(this.loginModel).subscribe(
        resp => {
          const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
          this.router.navigate([returnUrl]);
        },
        error => {
          this.alertService.error(error);
        }
      );
    }
  }

  //#endregion

}
