import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject, takeUntil} from "rxjs";
import {SidebarComponent} from '../../sidebar/sidebar.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {DataService} from '../../../services/data.service';
import {ITeacher} from '../../../../shared/interfaces/iTeacher';
import {IClassDetails} from '../../../../shared/interfaces/iClass-details';
import {ISubscriptionPlan} from '../../../../shared/interfaces/iSubscription-plan';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, NotificationsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  readonly ROUTES = {
    Dashboard: '/admin',
    Teachers: '/admin/teachers',
    Students: '/admin/pupils',
    Classes: '/admin/classes',
    Plans: '/admin/plans',
    Notifications: '/admin/notifications'
  };

  menuItems = [
    { icon: '📊', label: 'Dashboard', route: this.ROUTES.Dashboard },
    { icon: '👨‍🏫', label: 'Teachers', route: this.ROUTES.Teachers },
    { icon: '👩‍🎓', label: 'Students', route: this.ROUTES.Students },
    { icon: '📚', label: 'Classes', route: this.ROUTES.Classes },
    { icon: '💳', label: 'Plans', route: this.ROUTES.Plans },
    { icon: '🔔', label: 'Notifications', route: this.ROUTES.Notifications }
  ];

  activeRoute = this.ROUTES.Students;
  pendingTeachers: ITeacher[] = [];
  classes: IClassDetails[] = [];
  subscriptionPlans: ISubscriptionPlan[] = [];

  approvedTeachers = 12;
  totalStudents = 48;
  totalClasses = 0;

  newClass = this.getDefaultNewClass();

  ngOnInit(): void {
    this.dataService.pendingTeachers$
        .pipe(takeUntil(this.destroy$))
        .subscribe(teachers => (this.pendingTeachers = teachers));

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

  approveTeacher(teacherId: number): void {
    this.dataService.approveTeacher(teacherId);
  }

  rejectTeacher(teacherId: number): void {
    this.dataService.rejectTeacher(teacherId);
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
    return this.router.url === this.ROUTES.Dashboard;
  }

  get isTeachersRoute() {
    return this.router.url === this.ROUTES.Teachers;
  }

  get isClassesRoute() {
    return this.router.url === this.ROUTES.Classes;
  }

  get isPlansRoute() {
    return this.router.url === this.ROUTES.Plans;
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
