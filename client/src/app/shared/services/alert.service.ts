import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export enum MsgType {
  Success = 'success',
  Error = 'error',
  Warn = 'warn',
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private readonly _messageService: MessageService) {}

  addSuccessMsg(msg: string, clearPrevious: boolean = false) {
    return this.addMsg(MsgType.Success, msg, clearPrevious);
  }

  addFailedMsg(msg: string, clearPrevious: boolean = false) {
    return this.addMsg(MsgType.Error, msg, clearPrevious);
  }

  addWarnMsg(msg: string, clearPrevious: boolean = false) {
    return this.addMsg(MsgType.Warn, msg, clearPrevious);
  }

  addMsg(type: MsgType, msg: string, clearPrevious = false) {
    if (clearPrevious) {
      this.clear();
    }
    let title = type == MsgType.Error ? 'Error' : 'Info';
    this._messageService.add({
      severity: type,
      summary: title,
      detail: msg,
      life: 3000,
    });
  }

  clear() {
    this._messageService.clear();
  }
}
