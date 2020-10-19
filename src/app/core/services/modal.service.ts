import { Injectable } from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modal: NzModalService) { }

  /**
   * Creates the Ng-Zorro confirm modal
   * @param title {string} - modal title
   * @param content {string} - modal content
   * @param okCallback {function} - callback to invoke whenever User confirmed modal action.
   */
  showConfirmModal(title: string, content: string, okCallback: any): void {
    this.modal.confirm({
      nzTitle: title,
      nzContent: content,
      nzOnOk: okCallback
    });
  }
}
