import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $;

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //#region Inputs, Outputs

  //#endregion

  //#region Properties

  //#endregion

  //#region Constructors

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  //#endregion

  //#region OnInit

  ngOnInit() {
    $(function () {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */
      });
    });
  }

  //#endregion

  //#region Funtions

  onLogInFormSubmit(event) {
    this.authService.logIn();
    let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);
  }

  //#endregion

}
