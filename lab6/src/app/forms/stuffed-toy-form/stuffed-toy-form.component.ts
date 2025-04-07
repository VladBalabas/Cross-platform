import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsService } from 'src/app/lab6/services/reactive-forms.service';

@Component({
  selector: 'app-stuffed-toy-form',
  templateUrl: './stuffed-toy-form.component.html',
  styleUrls: ['./stuffed-toy-form.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class StuffedToyFormComponent  implements OnInit {

  reactiveForm = new ReactiveFormsService(new FormBuilder());

  @Input() formGroup: FormGroup = this.reactiveForm.createStuffedToyForm();
  
  constructor() { }

  ngOnInit() {}

}
