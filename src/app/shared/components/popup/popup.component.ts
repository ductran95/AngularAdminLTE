import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { PopupOption } from '@app/shared/models/options/popup-option';

import * as $ from 'jquery';
import 'bootstrap';

@Component({
  selector: 'common-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  //#region Inputs, Outputs

  @Input() options: PopupOption;
  @Output() onOKClick: EventEmitter<any> = new EventEmitter();

  //#endregion

  //#region Properties

  @ViewChild('modal', { static: true }) modalElement;

  modal: JQuery;

  //#endregion

  //#region Constructors

  constructor() { }

  //#endregion

  //#region OnInit

  ngOnInit() {
    this.modal = $(this.modalElement.nativeElement);
  }

  //#endregion

  //#region Funtions

  show() {
    this.modal.modal("show");
  }

  hide() {
    this.modal.modal("hide");
  }

  onOK(item: any) {
    this.onOKClick.emit(item);
  }
  //#endregion

}
