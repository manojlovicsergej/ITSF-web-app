import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {PlayerDto} from "../../../../shared/models/player-dto";
import {Position} from "../../../../shared/models/position-type";

@Injectable({
  providedIn: 'root'
})
export class IgracFormService {
  form$ = new BehaviorSubject<FormGroup | null>(null);
  set setForm(value : FormGroup | null){
    this.form$.next(value);
  }

  get getForm(){
    if(this.form$.getValue() === null){
      this.setForm = this.GetIgracGroup();
    }

    return this.form$.asObservable();
  }
  constructor(private _fb : FormBuilder) { }

  public GetIgracGroup(
    model?: PlayerDto
  ): FormGroup {
    return this._fb.group({
      id: new FormControl(model?.id),
      firstName: new FormControl(model?.firstName, {
        validators : [Validators.required]
      }),
      lastName: new FormControl(model?.lastName, {
        validators : [Validators.required]
      }),
      dateofBirth: new FormControl(model?.dateofBirth, {
        validators : [Validators.required]
      }),
      position: new FormControl(model?.position ?? Position.ATTACKER, {
        validators : [Validators.required]
      }),
      rating: new FormControl(model?.firstName, {
        validators : [Validators.required]
      }),
      winrate: new FormControl(model?.winrate, {
        validators : [Validators.required]
      }),
      title: new FormControl(model?.title, {
        validators : [Validators.required]
      }),
    });
  }
}
