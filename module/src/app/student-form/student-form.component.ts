import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArrayService } from '../array_service/array.service';
import { CommonModule } from '@angular/common';
import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonItemDivider,
  IonInput,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
  imports: [
    IonItemDivider,
    IonButton,
    IonLabel,
    IonItem,
    IonList,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonInput,
  ],
  standalone: true,
})
export class StudentFormComponent implements OnInit {
  @Input() coursesCount: number = 4;
  @Output() dataSubmitted = new EventEmitter<number[][]>();

  form: FormGroup;
  groupsPerCourse: number[] = Array(this.coursesCount).fill(0);

  constructor(private fb: FormBuilder, private arrayService: ArrayService) {
    this.form = this.fb.group({
      groups: this.fb.array([], Validators.required),
      students: this.fb.array([], Validators.required),
    });
  }

  ngOnInit(): void {
    this.initGroupsForm();
  }

  isGroupsFormValid(): boolean {
    return !this.groupsFormArray.value.some((val: number) => val <= 0);
  }

  isStudentsFormValid(): boolean {
    if (!this.form.valid || this.studentsFormArray.length === 0) {
      return false;
    }

    for (let course of this.studentsFormArray.controls) {
      const courseArray = course as FormArray;
      if (
        courseArray.controls.some(
          (control) => control.invalid || control.value <= 0
        )
      ) {
        return false;
      }
    }
    return true;
  }

  get groupsFormArray(): FormArray {
    return this.form.get('groups') as FormArray;
  }

  get studentsFormArray(): FormArray {
    return this.form.get('students') as FormArray;
  }

  initGroupsForm(): void {
    this.groupsFormArray.clear();
    for (let i = 0; i < this.coursesCount; i++) {
      this.groupsFormArray.push(
        this.fb.control(0, [Validators.required, Validators.min(0)])
      );
    }
  }

  onGroupsSubmit(): void {
    this.groupsPerCourse = this.groupsFormArray.value;
    this.initStudentsForm();
  }

  initStudentsForm(): void {
    this.studentsFormArray.clear();
    this.groupsPerCourse.forEach((groupCount, courseIndex) => {
      const courseGroups = this.fb.array([]);
      for (let i = 0; i < groupCount; i++) {
        courseGroups.push(
          this.fb.control(0, [Validators.required, Validators.min(0)])
        );
      }
      this.studentsFormArray.push(courseGroups);
    });
  }

  onSubmit(): void {
    const studentsData = this.studentsFormArray.value;
    this.arrayService.updateData(studentsData);
    this.dataSubmitted.emit(studentsData);
  }

  getCourseGroups(courseIndex: number): FormArray {
    return this.studentsFormArray.at(courseIndex) as FormArray;
  }
}
