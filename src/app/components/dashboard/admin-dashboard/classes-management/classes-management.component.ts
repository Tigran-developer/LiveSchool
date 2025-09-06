import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ClassStatus } from '../../../../../shared/constants/ClassStatus';
import { DataService } from '../../../../services/data.service';
import {IClass} from '../../../../../shared/interfaces/iClass';

@Component({
  selector: 'app-classes-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classes-management.component.html',
  styleUrls: ['./classes-management.component.scss']
})
export class ClassesManagementComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  classes: IClass[] = [];
  filteredClasses: IClass[] = [];
  searchTerm: string = '';
  selectedSubject: string = 'all';
  selectedDifficulty: string = 'all';
  showAddForm = false;
  showEditForm = false;
  selectedClass: IClass | null = null;
  selectedClassForView: IClass | null = null;

  newClass: Partial<IClass> = {
    title: '',
    description: '',
    subject: '',
    startTime: '',
    endTime: '',
    durationInMinutes: 60,
    maxParticipants: 20,
    price: 0,
    difficultyId: 1,
    isOnline: true,
    teacherId: ''
  };

  subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'English Literature', label: 'English Literature' },
    { value: 'History', label: 'History' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Computer Science', label: 'Computer Science' }
  ];

  difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: 1, label: 'Beginner' },
    { value: 2, label: 'Intermediate' },
    { value: 3, label: 'Advanced' }
  ];

  ngOnInit(): void {
    this.loadClasses();
    this.filterClasses();
  }

  loadClasses(): void {
    this.classes = [
      {
        id: '1',
        title: 'Advanced Calculus',
        description: 'Deep dive into calculus concepts including limits, derivatives, and integrals',
        subject: 'Mathematics',
        startTime: '2024-01-15T10:00:00',
        endTime: '2024-01-15T11:30:00',
        durationInMinutes: 90,
        maxParticipants: 25,
        price: 45,
        difficultyId: 3,
        isOnline: true,
        teacherId: '2',
        status: '',
        isRecurring: true,
        zoomLink: 'string',
        notes: 'string'
      },
      {
        id: '2',
        title: 'Introduction to Physics',
        description: 'Basic concepts of physics including mechanics and thermodynamics',
        subject: 'Physics',
        startTime: '2024-01-16T14:00:00',
        endTime: '2024-01-16T15:00:00',
        durationInMinutes: 60,
        maxParticipants: 30,
        price: 35,
        difficultyId: 1,
        isOnline: false,
        teacherId: '2',
        status: '',
        isRecurring: true,
        zoomLink: 'string',
        notes: 'string'
      },
      {
        id: '3',
        title: 'Creative Writing Workshop',
        description: 'Explore creative writing techniques and develop your storytelling skills',
        subject: 'English Literature',
        startTime: '2024-01-17T16:00:00',
        endTime: '2024-01-17T17:30:00',
        durationInMinutes: 90,
        maxParticipants: 20,
        price: 40,
        difficultyId: 2,
        isOnline: true,
        teacherId: '2',
        status: '',
        isRecurring: true,
        zoomLink: 'string',
        notes: 'string'
      },
      {
        id: '4',
        title: 'Organic Chemistry Lab',
        description: 'Hands-on laboratory experience with organic chemistry experiments',
        subject: 'Chemistry',
        startTime: '2024-01-18T09:00:00',
        endTime: '2024-01-18T12:00:00',
        durationInMinutes: 180,
        maxParticipants: 15,
        price: 60,
        difficultyId: 3,
        isOnline: false,
        teacherId: '2',
        status: '',
        isRecurring: true,
        zoomLink: 'string',
        notes: 'string'
      }
    ];
    this.filteredClasses = [...this.classes];
  }

  filterClasses(): void {
    this.filteredClasses = this.classes.filter(cls => {
      const matchesSearch = cls.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           cls.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           cls.subject.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesSubject = this.selectedSubject === 'all' || cls.subject === this.selectedSubject;
      const matchesDifficulty = this.selectedDifficulty === 'all' || cls.difficultyId.toString() === this.selectedDifficulty;

      return matchesSearch && matchesSubject && matchesDifficulty;
    });
  }

  onSearchChange(): void {
    this.filterClasses();
  }

  onSubjectChange(): void {
    this.filterClasses();
  }

  onDifficultyChange(): void {
    this.filterClasses();
  }

  addClass(): void {
    if (this.validateClassForm()) {
      const classItem: IClass = {
        ...this.newClass as IClass,
        id: Date.now().toString()
      };

      this.classes.push(classItem);
      this.filterClasses();
      this.resetForm();
      this.showAddForm = false;
    }
  }

  editClass(classItem: IClass): void {
    this.selectedClass = classItem;
    this.newClass = { ...classItem };
    this.showEditForm = true;
    this.showAddForm = false;
  }

  updateClass(): void {
    if (this.validateClassForm() && this.selectedClass) {
      const index = this.classes.findIndex(c => c.id === this.selectedClass?.id);
      if (index !== -1) {
        this.classes[index] = {
          ...this.classes[index],
          ...this.newClass
        };
        this.filterClasses();
        this.resetForm();
        this.showEditForm = false;
        this.selectedClass = null;
      }
    }
  }

  deleteClass(classId: string): void {
    if (confirm('Are you sure you want to delete this class?')) {
      this.classes = this.classes.filter(c => c.id !== classId);
      this.filterClasses();
    }
  }

  changeClassStatus(classId: string, newStatus: ClassStatus): void {
    const classItem = this.classes.find(c => c.id === classId);
    if (classItem) {
      // Note: status is not part of the new IClass interface
      // This method may need to be updated based on your requirements
      console.log(`Status change requested for class ${classId} to ${newStatus}`);
    }
  }

  viewClassDetails(classItem: IClass): void {
    this.selectedClassForView = classItem;
  }

  backToList(): void {
    this.selectedClassForView = null;
  }

  private validateClassForm(): boolean {
    return !!(this.newClass.title &&
              this.newClass.description &&
              this.newClass.subject &&
              this.newClass.startTime &&
              this.newClass.endTime &&
              this.newClass.durationInMinutes &&
              this.newClass.maxParticipants &&
              this.newClass.teacherId &&
              this.newClass.price &&
              this.newClass.difficultyId);
  }

  private resetForm(): void {
    this.newClass = {
      title: '',
      description: '',
      subject: '',
      startTime: '',
      endTime: '',
      durationInMinutes: 60,
      maxParticipants: 20,
      price: 0,
      difficultyId: 1,
      isOnline: true,
      teacherId: ''
    };
  }

  cancelForm(): void {
    this.resetForm();
    this.showAddForm = false;
    this.showEditForm = false;
    this.selectedClass = null;
  }

  getDifficultyClass(difficultyId: number): string {
    switch (difficultyId) {
      case 1: return 'difficulty-beginner';
      case 2: return 'difficulty-intermediate';
      case 3: return 'difficulty-advanced';
      default: return '';
    }
  }

  formatDateTime(dateTime: string): string {
    return new Date(dateTime).toLocaleString();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly ClassStatus = ClassStatus;
}

