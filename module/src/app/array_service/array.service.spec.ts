import { TestBed } from '@angular/core/testing';
import { ArrayService } from './array.service';

describe('ArrayService', () => {
  let service: ArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('updateData and getData', () => {
    it('should update and return the data correctly', () => {
      const testData = [[1, 2, 3], [4, 5], [6]];
      service.updateData(testData);
      expect(service.getData()).toEqual(testData);
    });

    it('should handle empty array', () => {
      const testData: number[][] = [];
      service.updateData(testData);
      expect(service.getData()).toEqual(testData);
    });
  });

  describe('calculateTotalStudentsPerCourse', () => {
    it('should calculate totals correctly for non-empty data', () => {
      const testData = [
        [10, 20, 30],
        [5, 15],
        [8, 12, 5]
      ];
      service.updateData(testData);
      const expected = [60, 20, 25];
      expect(service.calculateTotalStudentsPerCourse()).toEqual(expected);
    });

    it('should return empty array for empty data', () => {
      service.updateData([]);
      expect(service.calculateTotalStudentsPerCourse()).toEqual([]);
    });

    it('should handle courses with zero students', () => {
      const testData = [
        [0, 0, 0],
        [10, 0, 5],
        [0]
      ];
      service.updateData(testData);
      const expected = [0, 15, 0];
      expect(service.calculateTotalStudentsPerCourse()).toEqual(expected);
    });
  });

  describe('generateEmptyArray', () => {
    it('should generate correct empty array structure', () => {
      const courses = 3;
      const groupsPerCourse = [2, 3, 1];
      const expected = [
        [0, 0],
        [0, 0, 0],
        [0]
      ];
      expect(service.generateEmptyArray(courses, groupsPerCourse)).toEqual(expected);
    });

    it('should handle zero groups', () => {
      const courses = 2;
      const groupsPerCourse = [0, 3];
      const expected = [
        [],
        [0, 0, 0]
      ];
      expect(service.generateEmptyArray(courses, groupsPerCourse)).toEqual(expected);
    });

    it('should return empty array for zero courses', () => {
      const courses = 0;
      const groupsPerCourse: number[] = [];
      expect(service.generateEmptyArray(courses, groupsPerCourse)).toEqual([]);
    });

    it('should handle mismatched courses and groupsPerCourse length', () => {
      const courses = 2;
      const groupsPerCourse = [1, 2, 3];
      const expected = [
        [0],
        [0, 0]
      ];
      expect(service.generateEmptyArray(courses, groupsPerCourse)).toEqual(expected);
    });
  });
});