import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IcheckOption } from '@app/core/models/icheck-option';
import { AlertService } from '@app/core/services/alert.service';
import { LoginModel } from '@app/core/stores/auth/login.model';
import {AuthService} from '@app/core/stores/auth/auth.service';


@Component({
    selector: 'user-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties

    loginModel: LoginModel;

    isRememberCheckboxOption: IcheckOption;

    //#endregion

    //#region Constructors

    constructor(private route: ActivatedRoute, private router: Router,
                private authService: AuthService, private alertService: AlertService) { }

    //#endregion

    //#region Life Cycle

    ngOnInit() {
        this.isRememberCheckboxOption = {
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_minimal-blue'
        };

        this.resetForm();
    }

    ngOnDestroy(): void {
    }

    //#endregion

    //#region Functions

    resetForm() {
        this.loginModel = new LoginModel();
    }

    onLogInFormSubmit(logInForm: NgForm) {
        if (logInForm.valid) {
            this.authService.login(this.loginModel).subscribe(
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
