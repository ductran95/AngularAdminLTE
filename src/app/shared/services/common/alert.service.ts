import { Injectable } from '@angular/core';
import 'toastr';
import { ToastrOption } from '@app/shared/models/options/toastr-option';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private readonly _defaultOption: ToastrOption = {
    escapeHtml: false,
    closeButton:  true,
    progressBar:  false,
    positionClass:  'toast-top-right',
    preventDuplicates:  false,
    onclick:  null,
    newestOnTop: false,
    showDuration:  1000,
    hideDuration:  1000,
    extendedTimeOut:  5000,
    showEasing:  'swing',
    hideEasing:  'linear',
    showMethod:  'fadeIn',
    hideMethod:  'fadeOut',
  };

  constructor() { }

  success(data: string, option: ToastrOption = null){
     let newOption = _.assign({}, this._defaultOption, option);
    toastr["success"](data, null, newOption);
  }

  info(data: string, option: ToastrOption = null){
    let newOption = _.assign({}, this._defaultOption, option);
    toastr["info"](data, null, newOption);
  }

  warning(data: string, option: ToastrOption = null){
    let newOption = _.assign({}, this._defaultOption, option);
    toastr["warning"](data, null, newOption);
  }

  error(data: string, option: ToastrOption = null){
    let newOption = _.assign({}, this._defaultOption, option);
    toastr["error"](data, null, newOption);
  }

  clear() {
    toastr.clear();
  }
}
