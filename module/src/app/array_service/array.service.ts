import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {
  private studentsData: number[][] = [];

  updateData(data: number[][]): void {
    this.studentsData = data;
  }

  getData(): number[][] {
    return this.studentsData;
  }

  calculateTotalStudentsPerCourse(): number[] {
    return this.studentsData.map(course => 
      course.reduce((total, group) => total + group, 0)
    );
  }

  generateEmptyArray(courses: number, groupsPerCourse: number[]): number[][] {
    return Array.from({ length: courses }, (_, i) => 
      Array(groupsPerCourse[i]).fill(0)
    );
  }
}