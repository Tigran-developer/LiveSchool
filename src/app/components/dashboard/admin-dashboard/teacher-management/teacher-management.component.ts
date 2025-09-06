import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ITeacher } from '../../../../shared/interfaces/iTeacher';
import {TeacherStatus} from '../../../../../shared/constants/TeacherStatus';
import {DataService} from '../../../../services/data.service';

@Component({
  selector: 'app-teacher-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-management.component.html',
  styleUrls: ['./teacher-management.component.scss']
})
export class TeacherManagementComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  teachers: ITeacher[] = [];
  filteredTeachers: ITeacher[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'all';
  showAddForm = false;
  showEditForm = false;
  selectedTeacher: ITeacher | null = null;
  selectedTeacherForView: ITeacher | null = null;

  newTeacher: Partial<ITeacher> = {
    firstName: '',
    lastName: '',
    email: '',
    specialization: '',
    experience: '0',
    hourlyRate: 0,
    status: TeacherStatus.PENDING,
    bio: '',
    subjects: []
  };

  TeacherStatus = TeacherStatus;
  statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: TeacherStatus.ACTIVE, label: 'Active' },
    { value: TeacherStatus.INACTIVE, label: 'Inactive' },
    { value: TeacherStatus.PENDING, label: 'Pending' }
  ];

  ngOnInit(): void {
    this.loadTeachers();
    this.filterTeachers();
  }

  loadTeachers(): void {
    // Mock data - replace with actual service call
    this.teachers = [
      {
        id: '1',
        firstName: 'Emily',
        lastName: 'Rodriguez',
        email: 'emily@platform.com',
        avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: 'Mathematics',
        hourlyRate: 25,
        status: TeacherStatus.ACTIVE,
        bio: 'Experienced math teacher with passion for making complex concepts simple',
        subjects: ['Algebra', 'Calculus', 'Geometry'],
        totalClasses: 45,
        rating: 4.8,
        joinedAt: new Date('2023-01-01').toString(),
        phone: '',
        experience: ''
      },
      {
        id: '2',
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael@platform.com',
        avatar: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: 'Physics',
        hourlyRate: 30,
        status: TeacherStatus.ACTIVE,
        bio: 'PhD in Physics with expertise in quantum mechanics and classical physics',
        subjects: ['Mechanics', 'Thermodynamics', 'Quantum Physics'],
        totalClasses: 67,
        rating: 4.9,
        joinedAt: new Date('2022-06-15').toString(),
        phone: '',
        experience: ''
      },
      {
        id: '3',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah@platform.com',
        avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: 'English Literature',
        hourlyRate: 22,
        status: TeacherStatus.PENDING,
        bio: 'Creative writing specialist with background in modern literature',
        subjects: ['Creative Writing', 'Shakespeare', 'Modern Literature'],
        totalClasses: 0,
        rating: 0,
        joinedAt: new Date('2024-12-01').toString(),
        phone: '',
        experience: ''
      },
      {
        id: '4',
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david@platform.com',
        avatar: 'https://images.pexels.com/photos/3184337/pexels-photo-3184337.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        specialization: 'Chemistry',
        hourlyRate: 28,
        status: TeacherStatus.INACTIVE,
        bio: 'Chemistry expert with focus on organic and inorganic chemistry',
        subjects: ['Organic Chemistry', 'Inorganic Chemistry', 'Biochemistry'],
        totalClasses: 23,
        rating: 4.6,
        joinedAt: new Date('2023-03-10').toString(),
        phone: '',
        experience: ''
      }
    ];
    this.filteredTeachers = [...this.teachers];
  }

  filterTeachers(): void {
    this.filteredTeachers = this.teachers.filter(teacher => {
      const matchesSearch = teacher.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           teacher.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           teacher.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           teacher.specialization.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.selectedStatus === 'all' || teacher.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.filterTeachers();
  }

  onStatusChange(): void {
    this.filterTeachers();
  }

  addTeacher(): void {
    if (this.validateTeacherForm()) {
      const teacher: ITeacher = {
        ...this.newTeacher as ITeacher,
        id: Date.now().toString(),
        joinedAt: new Date().toString(),
      };

      this.teachers.push(teacher);
      this.filterTeachers();
      this.resetForm();
      this.showAddForm = false;
    }
  }

  editTeacher(teacher: ITeacher): void {
    this.selectedTeacher = teacher;
    this.newTeacher = { ...teacher };
    this.showEditForm = true;
    this.showAddForm = false;
  }

  updateTeacher(): void {
    if (this.validateTeacherForm() && this.selectedTeacher) {
      const index = this.teachers.findIndex(t => t.id === this.selectedTeacher?.id);
      if (index !== -1) {
        this.teachers[index] = {
          ...this.teachers[index],
          ...this.newTeacher,
        };
        this.filterTeachers();
        this.resetForm();
        this.showEditForm = false;
        this.selectedTeacher = null;
      }
    }
  }

  deleteTeacher(teacherId: string): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teachers = this.teachers.filter(t => t.id !== teacherId);
      this.filterTeachers();
    }
  }

  changeTeacherStatus(teacherId: string, newStatus: TeacherStatus): void {
    const teacher = this.teachers.find(t => t.id === teacherId);
    if (teacher) {
      teacher.status = newStatus;
      this.filterTeachers();
    }
  }

  viewTeacherDetails(teacher: ITeacher): void {
    this.selectedTeacherForView = teacher;
  }

  backToList(): void {
    this.selectedTeacherForView = null;
  }

  private validateTeacherForm(): boolean {
    return !!(this.newTeacher.firstName &&
              this.newTeacher.lastName &&
              this.newTeacher.email &&
              this.newTeacher.specialization &&
              this.newTeacher.experience &&
              this.newTeacher.hourlyRate);
  }

  private resetForm(): void {
    this.newTeacher = {
      firstName: '',
      lastName: '',
      email: '',
      specialization: '',
      experience: '0',
      hourlyRate: 0,
      status: TeacherStatus.PENDING,
      bio: '',
      subjects: []
    };
  }

  cancelForm(): void {
    this.resetForm();
    this.showAddForm = false;
    this.showEditForm = false;
    this.selectedTeacher = null;
  }

  getStatusClass(status: TeacherStatus): string {
    switch (status) {
      case TeacherStatus.ACTIVE: return 'status-active';
      case TeacherStatus.INACTIVE: return 'status-inactive';
      case TeacherStatus.PENDING: return 'status-pending';
      default: return '';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
