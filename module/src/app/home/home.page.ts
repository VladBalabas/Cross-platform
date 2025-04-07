import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ArrayService } from '../array_service/array.service';
import { StudentFormComponent } from "../student-form/student-form.component";
import { ResultsComponent } from "../results/results.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    StudentFormComponent, 
    ResultsComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomePage {
  studentsData: number[][] = [];
  totals: number[] = [];

  constructor(public arrayService: ArrayService) {}

  onDataSubmitted(data: number[][]): void {
    this.studentsData = data;
    this.totals = this.arrayService.calculateTotalStudentsPerCourse();
  }
}