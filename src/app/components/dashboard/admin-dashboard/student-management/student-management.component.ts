import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {IStudent} from '../../../../shared/interfaces/iStudent';
import {Ranks} from '../../../../../shared/constants/Ranks';
import {StudentStatus} from '../../../../../shared/constants/StudentStatus';
import {DataService} from '../../../../services/data.service';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-management.component.html',
  /*styleUrls: ['./student-management.component.scss']*/
})
export class StudentManagementComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  students: IStudent[] = [];
  filteredStudents: IStudent[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'all';
  selectedGrade: string = 'all';
  showAddForm = false;
  showEditForm = false;
  selectedStudent: IStudent | null = null;
  selectedStudentForView: IStudent | null = null;

  newStudent: Partial<IStudent> = {
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    grade: '',
    rank: Ranks.ADVANCED,
    status: StudentStatus.ACTIVE,
    availableClasses: 0,
    totalClassesAttended: 0,
    totalClassesBooked: 0,
    preferredSubjects: [],
  };

  StudentStatus = StudentStatus;
  statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: StudentStatus.ACTIVE, label: 'Active' },
    { value: StudentStatus.INACTIVE, label: 'Inactive' },
    { value: StudentStatus.SUSPENDED, label: 'Suspended' },
    { value: StudentStatus.GRADUATED, label: 'Graduated' }
  ];

  gradeOptions = [
    { value: 'all', label: 'All Grades' },
    { value: 'Elementary', label: 'Elementary' },
    { value: 'Middle School', label: 'Middle School' },
    { value: 'High School', label: 'High School' },
    { value: 'College', label: 'College' },
    { value: 'Adult', label: 'Adult' }
  ];

  rankOptions = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert'
  ];

  subjectOptions = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English Literature',
    'History',
    'Geography',
    'Computer Science',
    'Art',
    'Music',
    'Physical Education'
  ];

  ngOnInit(): void {
    this.loadStudents();
    this.filterStudents();
  }

  loadStudents(): void {
    // Mock data - replace with actual service call
    this.students = [
      {
        id: '1',
        firstName: 'Emma',
        lastName: 'Thompson',
        email: 'emma@student.com',
        avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        age: 15,
        grade: 'High School',
        rank: Ranks.ADVANCED,
        status: StudentStatus.ACTIVE,
        availableClasses: 8,
        totalClassesAttended: 45,
        totalClassesBooked: 53,
        subscriptionPlan: {id: '1', name: 'Premium'},
        subscriptionExpiry: '2024-12-31',
        preferredSubjects: ['Mathematics', 'Physics'],
        joinDate: '2023-01-15',
        lastActiveDate: '2024-01-15',
        phone: '',
        subjects: [],
        enrollmentDate: '',
        totalClasses: 0,
        completedClasses: 0
      },
      {
        id: '2',
        firstName: 'Alex',
        lastName: 'Chen',
        email: 'alex@student.com',
        avatar: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        age: 12,
        grade: 'Middle School',
        rank: Ranks.INTERMEDIATE,
        status: StudentStatus.ACTIVE,
        availableClasses: 5,
        totalClassesAttended: 23,
        totalClassesBooked: 28,
        subscriptionPlan: {id: '1', name: 'Premium'},
        subscriptionExpiry: '2024-06-30',
        preferredSubjects: ['Mathematics', 'Computer Science'],
        joinDate: '2023-03-20',
        lastActiveDate: '2024-01-14',
        phone: '',
        subjects: [],
        enrollmentDate: '',
        totalClasses: 0,
        completedClasses: 0
      },
      {
        id: '3',
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah@student.com',
        avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        age: 17,
        grade: 'High School',
        rank: Ranks.ADVANCED,
        status: StudentStatus.SUSPENDED,
        availableClasses: 0,
        totalClassesAttended: 67,
        totalClassesBooked: 67,
        subscriptionPlan: {id: '1', name: 'Premium'},
        subscriptionExpiry: '2024-01-10',
        preferredSubjects: ['Chemistry', 'Biology'],
        lastActiveDate: '2024-01-10',
        phone: '',
        joinDate: '',
        subjects: [],
        enrollmentDate: '',
        totalClasses: 0,
        completedClasses: 0
      },
      {
        id: '4',
        firstName: 'Michael',
        lastName: 'Davis',
        email: 'michael@student.com',
        avatar: 'https://images.pexels.com/photos/3184337/pexels-photo-3184337.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        age: 20,
        grade: 'College',
        rank: Ranks.INTERMEDIATE,
        status: StudentStatus.INACTIVE,
        availableClasses: 0,
        totalClassesAttended: 34,
        totalClassesBooked: 34,
        subscriptionPlan: {id: '1', name: 'Premium'},
        subscriptionExpiry: '2023-12-31',
        preferredSubjects: ['Physics', 'Mathematics'],
        lastActiveDate: '2023-12-15',
        phone: '',
        joinDate: '',
        subjects: [],
        enrollmentDate: '',
        totalClasses: 0,
        completedClasses: 0
      }
    ];
    this.filteredStudents = [...this.students];
  }

  filterStudents(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = student.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           student.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           student.grade.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.selectedStatus === 'all' || student.status === this.selectedStatus;
      const matchesGrade = this.selectedGrade === 'all' || student.grade === this.selectedGrade;

      return matchesSearch && matchesStatus && matchesGrade;
    });
  }

  onSearchChange(): void {
    this.filterStudents();
  }

  onStatusChange(): void {
    this.filterStudents();
  }

  onGradeChange(): void {
    this.filterStudents();
  }

  addStudent(): void {
    if (this.validateStudentForm()) {
      const student: IStudent = {
        ...this.newStudent as IStudent,
        id: Date.now().toString(),
        joinDate: new Date().toISOString().split('T')[0],
        lastActiveDate: new Date().toISOString().split('T')[0],
      };

      this.students.push(student);
      this.filterStudents();
      this.resetForm();
      this.showAddForm = false;
    }
  }

  editStudent(student: IStudent): void {
    this.selectedStudent = student;
    this.newStudent = { ...student };
    this.showEditForm = true;
    this.showAddForm = false;
  }

  updateStudent(): void {
    if (this.validateStudentForm() && this.selectedStudent) {
      const index = this.students.findIndex(s => s.id === this.selectedStudent?.id);
      if (index !== -1) {
        this.students[index] = {
          ...this.students[index],
          ...this.newStudent,
          lastActiveDate: new Date().toISOString().split('T')[0]
        };
        this.filterStudents();
        this.resetForm();
        this.showEditForm = false;
        this.selectedStudent = null;
      }
    }
  }

  deleteStudent(studentId: string): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.students = this.students.filter(s => s.id !== studentId);
      this.filterStudents();
    }
  }

  changeStudentStatus(studentId: string, newStatus: StudentStatus): void {
    const student = this.students.find(s => s.id === studentId);
    if (student) {
      student.status = newStatus;
      if (newStatus === StudentStatus.INACTIVE || newStatus === StudentStatus.SUSPENDED) {
        student.availableClasses = 0;
      }
      this.filterStudents();
    }
  }

  viewStudentDetails(student: IStudent): void {
    this.selectedStudentForView = student;
  }

  backToList(): void {
    this.selectedStudentForView = null;
  }

  addSubject(subject: string): void {
    if (subject && !this.newStudent.preferredSubjects?.includes(subject)) {
      this.newStudent.preferredSubjects = [...(this.newStudent.preferredSubjects || []), subject];
    }
  }

  removeSubject(subject: string): void {
    this.newStudent.preferredSubjects = this.newStudent.preferredSubjects?.filter(s => s !== subject) || [];
  }

  addLearningGoal(goal: string): void {
/*    if (goal && !this.newStudent.learningGoals?.includes(goal)) {
      this.newStudent.learningGoals = [...(this.newStudent.learningGoals || []), goal];
    }*/
  }

  removeLearningGoal(goal: string): void {
    /*this.newStudent.learningGoals = this.newStudent.learningGoals?.filter(g => g !== goal) || [];*/
  }

  private validateStudentForm(): boolean {
    return !!(this.newStudent.firstName &&
              this.newStudent.lastName &&
              this.newStudent.email &&
              this.newStudent.age &&
              this.newStudent.grade &&
              this.newStudent.rank);
  }

  private resetForm(): void {
    this.newStudent = {
      firstName: '',
      lastName: '',
      email: '',
      age: 0,
      grade: '',
      rank: Ranks.BEGINNER,
      status: StudentStatus.ACTIVE,
      availableClasses: 0,
      totalClassesAttended: 0,
      totalClassesBooked: 0,
      preferredSubjects: [],
    };
  }

  cancelForm(): void {
    this.resetForm();
    this.showAddForm = false;
    this.showEditForm = false;
    this.selectedStudent = null;
  }

  getStatusClass(status: StudentStatus): string {
    switch (status) {
      case StudentStatus.ACTIVE: return 'status-active';
      case StudentStatus.INACTIVE: return 'status-inactive';
      case StudentStatus.SUSPENDED: return 'status-suspended';
      case StudentStatus.GRADUATED: return 'status-graduated';
      default: return '';
    }
  }

  getRankClass(rank: string): string {
    switch (rank) {
      case 'Beginner': return 'rank-beginner';
      case 'Intermediate': return 'rank-intermediate';
      case 'Advanced': return 'rank-advanced';
      case 'Expert': return 'rank-expert';
      default: return '';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
