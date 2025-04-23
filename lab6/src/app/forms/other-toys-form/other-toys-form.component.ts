import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsService } from 'src/app/lab6/services/reactive-forms.service';
import { IonItem, IonLabel } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-other-toys-form',
  templateUrl: './other-toys-form.component.html',
  styleUrls: ['./other-toys-form.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class OtherToysFormComponent  implements OnInit {

  reactiveForm = new ReactiveFormsService(new FormBuilder());

  @Input() formGroup: FormGroup = this.reactiveForm.createOtherToysForm();
  
  constructor() { }

  ngOnInit() {}

}
