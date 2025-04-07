import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsService } from 'src/app/lab6/services/reactive-forms.service';

@Component({
  selector: 'app-universal-form',
  templateUrl: './universal-form.component.html',
  styleUrls: ['./universal-form.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class UniversalFormComponent  implements OnInit {

  reactiveForm = new ReactiveFormsService(new FormBuilder());

  @Input() formGroup: FormGroup = this.reactiveForm.createUniversalForm();
  
  constructor() { }

  ngOnInit() {}

}
