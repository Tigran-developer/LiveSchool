import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ITeacher} from '../../shared/interfaces/iTeacher';
import {ISubscriptionPlan} from '../../shared/interfaces/iSubscription-plan';
import {INotification} from '../../shared/interfaces/iNotification';
import {AuthService} from './auth.service';
import {IClass} from '../../shared/interfaces/iClass';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private authService = inject(AuthService)

  private pendingTeachersSubject = new BehaviorSubject<ITeacher[]>([
    {
      id: 2,
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily@platform.com',
      role: 'teacher',
      specialization: 'Mathematics',
      experience: 5,
      hourlyRate: 25,
      isApproved: false,
      avatar: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      createdAt: new Date('2025-01-01').toString()
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael@platform.com',
      role: 'teacher',
      specialization: 'Physics',
      experience: 8,
      hourlyRate: 30,
      isApproved: false,
      avatar: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      createdAt: new Date('2025-01-02').toString()
    }
  ]);

  private subscriptionPlansSubject = new BehaviorSubject<ISubscriptionPlan[]>([
    {
      id: '1',
      name: 'Starter',
      classCount: 5,
      price: 49,
      description: 'Perfect for trying out our platform'
    },
    {
      id: '2',
      name: 'Standard',
      classCount: 10,
      price: 89,
      description: 'Most popular choice for regular students',
      popular: true
    },
    {
      id: '3',
      name: 'Premium',
      classCount: 20,
      price: 159,
      description: 'Best value for intensive learning'
    }
  ]);

  private notificationsSubject = new BehaviorSubject<INotification[]>([
    {
      id: 1,
      userId: '1',
      title: 'New Teacher Application',
      message: 'Emily Rodriguez has applied to become a teacher',
      type: 'info',
      read: false,
      createdAt: new Date()
    },
    {
      id: 2,
      userId: '1',
      title: 'Class Starting Soon',
      message: 'Advanced Calculus starts in 30 minutes',
      type: 'warning',
      read: false,
      createdAt: new Date()
    }
  ]);

  // Observables
  public pendingTeachers$ = this.pendingTeachersSubject.asObservable();
  public subscriptionPlans$ = this.subscriptionPlansSubject.asObservable();
  public notifications$ = this.notificationsSubject.asObservable();

  // Methods
  approveTeacher(teacherId: number): void {
    const teachers = this.pendingTeachersSubject.value.filter(t => t.id !== teacherId);
    this.pendingTeachersSubject.next(teachers);
  }

  rejectTeacher(teacherId: number): void {
    const teachers = this.pendingTeachersSubject.value.filter(t => t.id !== teacherId);
    this.pendingTeachersSubject.next(teachers);
  }

  createClass(newClass: IClass): void {

    /*const classes = [...this.classesSubject.value, newClass];*/
  }

  deleteClass(classId: string): void {
    /*const classes = this.classesSubject.value.filter(c => c.id !== classId);*/
  }

  markNotificationAsRead(notificationId: number): void {
    const notifications = this.notificationsSubject.value.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    this.notificationsSubject.next(notifications);
  }

  getUnreadNotificationCount(): number {
    return this.notificationsSubject.value.filter(n => !n.read).length;
  }

}
