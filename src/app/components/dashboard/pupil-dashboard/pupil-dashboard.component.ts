import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {Subject, takeUntil} from "rxjs";
import {ISubscriptionPlan} from '../../../../shared/interfaces/iSubscription-plan';
import {SidebarComponent} from '../../sidebar/sidebar.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {DataService} from '../../../services/data.service';
import {IClassSession} from '../../../../shared/interfaces/iClass-session';

@Component({
  selector: 'app-pupil-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NotificationsComponent],
  templateUrl: './pupil-dashboard.component.html',
  styleUrls: ['./pupil-dashboard.component.scss']
})
export class PupilDashboardComponent implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  menuItems = [
    { icon: '📊', label: 'Dashboard', route: '/pupil' },
    { icon: '📚', label: 'My Classes', route: '/pupil/classes' },
    { icon: '🔍', label: 'Browse Classes', route: '/pupil/browse' },
    { icon: '💳', label: 'Subscription', route: '/pupil/subscription' },
    { icon: '📈', label: 'Progress', route: '/pupil/progress' }
  ];

  activeRoute = '/pupil/classes';
  allClasses: IClassSession[] = [];
  upcomingClasses: IClassSession[] = [];
  completedClasses: IClassSession[] = [];
  availableClasses: IClassSession[] = [];
  nextClass: IClassSession | null = null;
  subscriptionPlans: ISubscriptionPlan[] = [];
  currentPlan: ISubscriptionPlan | null = null;
  remainingClasses = 7;
  totalPurchased = 10;

  viewMode: 'upcoming' | 'history' = 'upcoming';

  recentActivities = [
    {
      icon: '✅',
      title: 'Completed Advanced Calculus',
      description: 'Great job! You completed the class with Emily Rodriguez',
      time: '2 hours ago'
    },
    {
      icon: '📚',
      title: 'New class available',
      description: 'Physics Fundamentals with Michael Chen is now available',
      time: '1 day ago'
    },
    {
      icon: '🎓',
      title: 'Credits added',
      description: 'You purchased the Standard plan - 10 classes',
      time: '2 days ago'
    }
  ];

  ngOnInit(): void {
    this.dataService.classes$.pipe(
        takeUntil(this.destroy$)
    ).subscribe(classes => {
          const pupilId = '4';
          this.allClasses = classes.filter(c => c.pupilIds.includes(pupilId));
          this.upcomingClasses = this.allClasses.filter(c => c.status === 'upcoming');
          this.completedClasses = this.allClasses.filter(c => c.status === 'completed');

          this.availableClasses = classes.filter(c => c.status === 'upcoming' && !c.pupilIds.includes(pupilId));

          this.nextClass = this.upcomingClasses
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] || null;
        });

    this.dataService.subscriptionPlans$
        .pipe(takeUntil(this.destroy$))
        .subscribe((plans: ISubscriptionPlan[]) => {
          this.subscriptionPlans = plans;
          this.currentPlan = plans.find(p => p.name === 'Standard') || plans[1];
        });
  }

  joinClass(classSession: IClassSession): void {
    if (classSession.zoomLink) window.open(classSession.zoomLink, '_blank');
  }

  bookClass(classSession: IClassSession): void {
    if (this.remainingClasses > 0) {
      this.remainingClasses--;
      alert(`Successfully booked: ${classSession.title}`);
    }
  }

  selectPlan(plan: ISubscriptionPlan): void {
    if (plan.id !== this.currentPlan?.id) {
      alert(`Redirecting to payment for ${plan.name} plan - $${plan.price}`);
    }
  }

  getTimeUntilClass(date: string): string {
    const diff = new Date(date).getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `In ${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `In ${hours} hour${hours > 1 ? 's' : ''}`;
    return 'Starting soon';
  }

  formatDateTime(date: string): string {
    return new Date(date).toLocaleDateString() + ' ' +
        new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getTotalHours(): string {
    const totalMinutes = this.completedClasses.reduce((sum, c) => sum + c.duration, 0);
    return `${Math.floor(totalMinutes / 60)}h`;
  }

  getProgressPercentage(): number {
    const used = this.totalPurchased - this.remainingClasses;
    return Math.round((used / this.totalPurchased) * 100);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
