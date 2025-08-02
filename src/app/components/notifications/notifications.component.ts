import {Component, OnInit, inject, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import {Subject, takeUntil} from "rxjs";
import {INotification} from '../../../shared/interfaces/iNotification';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private readonly dataService = inject(DataService);

  notifications: INotification[] = [];
  unreadCount = 0;
  showDropdown = false;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.dataService.notifications$.pipe(
        takeUntil(this.destroy$)
    ).subscribe(notifications => {
          this.notifications = notifications;
          this.unreadCount = notifications.filter(n => !n.read).length;
        });
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  markAsRead(notificationId: number): void {
    this.dataService.markNotificationAsRead(notificationId);
  }

  formatTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
