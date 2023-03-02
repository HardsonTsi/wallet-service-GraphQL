import * as M from "materialize-css/dist/js/materialize";
import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class ToastService {
  /**
   *  @param {string} message - Il s'agit du message affiché par le toast
   */
  showToast(message: string) {
    M.toast({html: message})
  }
}
