import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonCardContent,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonItem,
  IonBadge,
  IonChip,
} from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  imports: [
    IonChip,
    IonBadge,
    IonItem,
    IonLabel,
    IonItemDivider,
    IonItemGroup,
    IonCardContent,
    IonList,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class ResultsComponent implements OnInit {
  @Input() studentsData: number[][] = [];
  @Input() totals: number[] = [];

  ngOnInit() {}
}
