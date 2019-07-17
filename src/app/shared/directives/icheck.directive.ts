import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { IcheckOption } from '@app/shared/models/options/icheck-option';

import * as $ from 'jquery';
import 'icheck';

@Directive({
  selector: '[icheck]',
})
export class IcheckDirective implements OnInit {

  //#region Inputs, Outputs

  @Input('icheck') options: IcheckOption;

  //#endregion

  //#region Properties

  //#endregion

  //#region Constructors

  constructor(private element: ElementRef, private ngControl: NgControl) {
    console.log(element);
  }

  //#endregion

  //#region OnInit

  ngOnInit() {

    $(this.element.nativeElement).iCheck({
      checkboxClass: this.options.checkboxClass,
      radioClass: this.options.radioClass
    });


    /* Here you can write custom initialization code */

    /* Listening to the value of ngModel */
    this.ngControl.control.valueChanges.subscribe((value) => {
      /* Set any value of your custom control */
      if (value) {
        $(this.element.nativeElement).iCheck('check');
      }
      else {
        $(this.element.nativeElement).iCheck('uncheck');
      }
      $(this.element.nativeElement).iCheck('update');
    });

    /* Inform ng model for any new change happened */
    $(this.element.nativeElement).bind("ifToggled", (event) => {
      this.ngControl.control.setValue(event.target.checked);
    });
  }

  //#endregion

  //#region Funtions

  //#endregion
}
