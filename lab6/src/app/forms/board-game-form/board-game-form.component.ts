import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsService } from 'src/app/lab6/services/reactive-forms.service';

@Component({
  selector: 'app-board-game-form',
  templateUrl: './board-game-form.component.html',
  styleUrls: ['./board-game-form.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class BoardGameFormComponent implements OnInit {

  reactiveForm = new ReactiveFormsService(new FormBuilder());

  @Input() formGroup: FormGroup = this.reactiveForm.createBoardGameForm();
  
  constructor() { }

  ngOnInit() {
  }

}
