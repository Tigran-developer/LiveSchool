import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {Subject, takeUntil} from "rxjs";
import {ISubscriptionPlan} from '../../../../shared/interfaces/iSubscription-plan';
import {SidebarComponent} from '../../sidebar/sidebar.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {DataService} from '../../../services/data.service';
import {IClassDetails} from '../../../../shared/interfaces/iClass-details';
import {ClassesComponent} from './classes/classes.component';
import {DataClassService} from '../../../services/data-class.service';

@Component({
  selector: 'app-pupil-dashboard',
  standalone: true,
  imports: [CommonModule, NotificationsComponent, RouterOutlet],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  private dataClassService = inject(DataClassService);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  activeRoute: string| undefined;
  allClasses: IClassDetails[] | null = null;
  upcomingClasses: IClassDetails[] = [];
  completedClasses: IClassDetails[] = [];
  availableClasses: IClassDetails[] = [];
  nextClass: IClassDetails | null = null;
  subscriptionPlans: ISubscriptionPlan[] = [];
  currentPlan: ISubscriptionPlan | null = null;
  remainingClasses = 7;
  totalPurchased = 10;

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
    this.dataClassService.getAllClasses().subscribe(item=>{
      this.allClasses = item;
    })
    this.activeRoute = this.router.url;
    /*this.dataService.classes$.pipe(
        takeUntil(this.destroy$)
    ).subscribe(classes => {
          const pupilId = '4';
          this.allClasses = classes.filter(c => c.pupilIds.includes(pupilId));
          this.availableClasses = classes.filter(c => c.status === 'upcoming' && !c.pupilIds.includes(pupilId));
          });

    this.dataService.subscriptionPlans$
        .pipe(takeUntil(this.destroy$))
        .subscribe((plans: ISubscriptionPlan[]) => {
          this.subscriptionPlans = plans;
          this.currentPlan = plans.find(p => p.name === 'Standard') || plans[1];
        });*/
  }

  joinClass(classSession: IClassDetails): void {
    if (classSession.zoomLink) window.open(classSession.zoomLink, '_blank');
  }

  bookClass(classSession: IClassDetails): void {
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

  formatDateTime(date: string): string {
    return new Date(date).toLocaleDateString() + ' ' +
        new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
