import { Component } from '@angular/core';

import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { StudentsService } from "../../services/students.service";
import { Student } from "../../model/student.entity";
import { StudentCreateAndEditComponent } from "../../components/student-create-and-edit/student-create-and-edit.component";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, StudentCreateAndEditComponent, MatTableModule, NgClass, TranslateModule],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent implements OnInit, AfterViewInit  {
  // Attributes
  studentData: Student;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'age', 'address', 'actions'];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  // Constructor
  constructor(private studentService: StudentsService) {
    this.isEditMode = false;
    this.studentData = {} as Student;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.studentData = {} as Student;
  }

  // CRUD Actions

  private getAllStudents(): void {
    this.studentService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  };

  private createStudent(): void {
    this.studentService.create(this.studentData)
      .subscribe((response: any) => {
        this.dataSource.data.push({...response});
        // Actualiza el dataSource.data con los students actuales, para que Angular detecte el cambio y actualice la vista.
        this.dataSource.data = this.dataSource.data
          .map((student: Student) => {
            return student;
          });
      });
  };

  private updateStudent(): void {
    let studentToUpdate: Student = this.studentData;
    this.studentService.update(this.studentData.id, studentToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((student: Student) => {
            if (student.id === response.id) {
              return response;
            }
            return student;
          });
      });
  };

  private deleteStudent(studentId: string): void {
    this.studentService.delete(studentId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter((student: Student) => {
            return student.id !== studentId ? student : false;
          });
      });
  };

  // UI Event Handlers

  onEditItem(element: Student) {
    this.isEditMode = true;
    this.studentData = element;
  }

  onDeleteItem(element: Student) {
    this.deleteStudent(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllStudents();
  }

  onStudentAdded(element: Student) {
    this.studentData = element;
    this.createStudent();
    this.resetEditState();
  }

  onStudentUpdated(element: Student) {
    this.studentData = element;
    this.updateStudent();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllStudents();
  }
}
