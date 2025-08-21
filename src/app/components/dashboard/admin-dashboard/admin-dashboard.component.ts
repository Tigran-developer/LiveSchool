import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {Subject, takeUntil} from "rxjs";
import {NotificationsComponent} from '../../notifications/notifications.component';
import {TeacherManagementComponent} from './teacher-management/teacher-management.component';
import {DataService} from '../../../services/data.service';
import {ITeacher} from '../../../../shared/interfaces/iTeacher';
import {IClassDetails} from '../../../../shared/interfaces/iClass-details';
import {ISubscriptionPlan} from '../../../../shared/interfaces/iSubscription-plan';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NotificationsComponent, TeacherManagementComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private destroy$ = new Subject<void>();

  readonly ROUTES = {
    Dashboard: '/admin',
    Teachers: '/admin/teachers',
    Students: '/admin/pupils',
    Classes: '/admin/classes',
    Plans: '/admin/plans',
    Notifications: '/admin/notifications'
  };

  activeRoute = this.ROUTES.Dashboard;
  pendingTeachers: ITeacher[] = [];
  classes: IClassDetails[] = [];
  subscriptionPlans: ISubscriptionPlan[] = [];

  approvedTeachers = 12;
  totalStudents = 48;
  totalClasses = 0;

  newClass = this.getDefaultNewClass();

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$))
      .subscribe(params => {
      if (params['section']) {
        this.activeRoute = `/admin/${params['section']}`;
      } else {
        this.activeRoute = this.ROUTES.Dashboard;
      }
    });

    /*this.dataService.pendingTeachers$
        .pipe(takeUntil(this.destroy$))
        .subscribe(teachers => (this.pendingTeachers = teachers));*/

    /*this.dataService.classes$
        .pipe(takeUntil(this.destroy$))
        .subscribe(classes => {
          this.classes = classes;
          this.totalClasses = classes.length;
        });*/

    this.dataService.subscriptionPlans$
        .pipe(takeUntil(this.destroy$))
        .subscribe(plans => (this.subscriptionPlans = plans));
  }

  approveTeacher(teacherId: string | undefined): void {
    if(!teacherId) return;
    this.dataService.approveTeacher(+teacherId);
  }

  rejectTeacher(teacherId: string | undefined): void {
    if(!teacherId) return;
    this.dataService.rejectTeacher(+teacherId);
  }

  createClass(): void {
    const teacherNames: Record<string, string> = {
      '2': 'Emily Rodriguez',
      '3': 'Michael Chen'
    };

    this.newClass.teacherName = teacherNames[this.newClass.teacherId] || '';

/*    this.dataService.createClass({
      ...this.newClass,
      startTime: new Date(this.newClass.date).toString(),
    });*/

    this.newClass = this.getDefaultNewClass();
  }

  deleteClass(classId: string): void {
    // TODO: Replace confirm() with modal confirmation for better UX
    if (confirm('Are you sure you want to delete this class?')) {
      this.dataService.deleteClass(classId);
    }
  }

  formatDateTime(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  trackById(index: number, item: { id: string }) {
    return item.id;
  }

  get isDashboardRoute() {
    return this.activeRoute === this.ROUTES.Dashboard;
  }

  get isTeachersRoute() {
    return this.activeRoute === this.ROUTES.Teachers;
  }

  get isStudentsRoute() {
    return this.activeRoute === this.ROUTES.Students;
  }

  get isClassesRoute() {
    return this.activeRoute === this.ROUTES.Classes;
  }

  get isPlansRoute() {
    return this.activeRoute === this.ROUTES.Plans;
  }

  get isNotificationsRoute() {
    return this.activeRoute === this.ROUTES.Notifications;
  }

  private getDefaultNewClass() {
    return {
      title: '',
      description: '',
      teacherId: '',
      teacherName: '',
      date: '',
      duration: 60,
      zoomLink: '',
      recurring: 'none' as const
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
