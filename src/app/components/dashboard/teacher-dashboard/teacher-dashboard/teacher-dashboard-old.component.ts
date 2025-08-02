/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarOldComponent } from '../sidebar/sidebar-old.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { DataService } from '../../services/data.service';
import { ClassSession } from '../../models/user.model';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarOldComponent, NotificationsComponent],
  template: `
    <div class="dashboard-layout">
      <app-sidebar 
        [menuItems]="menuItems" 
        [activeRoute]="activeRoute">
      </app-sidebar>
      
      <div class="main-content">
        <header class="header">
          <div class="header-left">
            <h1>Teacher Dashboard</h1>
            <p>Welcome back, John! Manage your classes and students</p>
          </div>
          <div class="header-right">
            <app-notifications></app-notifications>
            <div class="user-avatar">
              <span>👨‍🏫</span>
            </div>
          </div>
        </header>

        <div class="content-area">
          <!-- Dashboard Overview -->
          <div *ngIf="activeRoute === '/teacher'" class="dashboard-overview fade-in">
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">📚</div>
                <div class="stat-content">
                  <h3>{{ upcomingClasses.length }}</h3>
                  <p>Upcoming Classes</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">✅</div>
                <div class="stat-content">
                  <h3>{{ completedClasses.length }}</h3>
                  <p>Completed Classes</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-content">
                  <h3>{{ totalStudents }}</h3>
                  <p>Total Students</p>
                </div>
              </div>
              <div class="stat-card next-class" *ngIf="nextClass">
                <div class="stat-icon">⏰</div>
                <div class="stat-content">
                  <h3>{{ getTimeUntilClass(nextClass.date) }}</h3>
                  <p>Next Class in</p>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="quick-actions">
              <h2>Quick Actions</h2>
              <div class="actions-grid">
                <button class="action-btn" *ngIf="nextClass" (click)="joinClass(nextClass)">
                  <span class="action-icon">🚀</span>
                  <span>Join Next Class</span>
                </button>
                <button class="action-btn">
                  <span class="action-icon">📝</span>
                  <span>Grade Assignments</span>
                </button>
                <button class="action-btn">
                  <span class="action-icon">📊</span>
                  <span>View Analytics</span>
                </button>
                <button class="action-btn">
                  <span class="action-icon">💬</span>
                  <span>Message Students</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Classes View -->
          <div *ngIf="activeRoute === '/teacher/classes'" class="classes-view fade-in">
            <div class="view-controls">
              <h2>My Classes</h2>
              <div class="view-toggles">
                <button class="toggle-btn" [class.active]="viewMode === 'calendar'" (click)="viewMode = 'calendar'">
                  📅 Calendar
                </button>
                <button class="toggle-btn" [class.active]="viewMode === 'list'" (click)="viewMode = 'list'">
                  📋 List
                </button>
              </div>
            </div>

            <!-- Calendar View -->
            <div *ngIf="viewMode === 'calendar'" class="calendar-view">
              <div class="calendar-header">
                <button class="nav-btn" (click)="previousMonth()">❮</button>
                <h3>{{ getCurrentMonthYear() }}</h3>
                <button class="nav-btn" (click)="nextMonth()">❯</button>
              </div>
              <div class="calendar-grid">
                <div class="day-header" *ngFor="let day of dayHeaders">{{ day }}</div>
                <div *ngFor="let day of calendarDays" 
                     class="calendar-day"
                     [class.other-month]="!day.currentMonth"
                     [class.today]="day.isToday">
                  <span class="day-number">{{ day.date }}</span>
                  <div *ngFor="let class of day.classes" 
                       class="class-event"
                       [class.class-upcoming]="class.status === 'upcoming'"
                       [class.class-completed]="class.status === 'completed'">
                    <div class="event-time">{{ formatTime(class.date) }}</div>
                    <div class="event-title">{{ class.title }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- List View -->
            <div *ngIf="viewMode === 'list'" class="list-view">
              <div class="class-filters">
                <button class="filter-btn" [class.active]="classFilter === 'all'" (click)="classFilter = 'all'">
                  All Classes
                </button>
                <button class="filter-btn" [class.active]="classFilter === 'upcoming'" (click)="classFilter = 'upcoming'">
                  Upcoming
                </button>
                <button class="filter-btn" [class.active]="classFilter === 'completed'" (click)="classFilter = 'completed'">
                  Completed
                </button>
              </div>

              <div class="classes-list">
                <div *ngFor="let class of getFilteredClasses()" class="class-item">
                  <div class="class-info">
                    <div class="class-main">
                      <h3>{{ class.title }}</h3>
                      <p class="class-description">{{ class.description }}</p>
                    </div>
                    <div class="class-details">
                      <div class="detail-item">
                        <span class="detail-icon">📅</span>
                        <span>{{ formatDateTime(class.date) }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-icon">⏱️</span>
                        <span>{{ class.duration }} minutes</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-icon">👥</span>
                        <span>{{ class.pupilNames.length }} student(s)</span>
                      </div>
                    </div>
                  </div>
                  <div class="class-actions">
                    <span class="status-badge" [ngClass]="'status-' + class.status">
                      {{ class.status }}
                    </span>
                    <button *ngIf="class.status === 'upcoming'" class="btn btn-primary" (click)="joinClass(class)">
                      Join Class
                    </button>
                    <button *ngIf="class.status === 'completed'" class="btn btn-secondary">
                      View Recording
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- History View -->
          <div *ngIf="activeRoute === '/teacher/history'" class="history-view fade-in">
            <h2>Class History</h2>
            <div class="history-stats">
              <div class="history-card">
                <h3>Total Classes Taught</h3>
                <div class="big-number">{{ completedClasses.length }}</div>
              </div>
              <div class="history-card">
                <h3>Total Hours</h3>
                <div class="big-number">{{ getTotalHours() }}</div>
              </div>
              <div class="history-card">
                <h3>Average Rating</h3>
                <div class="big-number">4.8 ⭐</div>
              </div>
            </div>
            
            <div class="history-list">
              <div *ngFor="let class of completedClasses" class="history-item">
                <div class="history-info">
                  <h4>{{ class.title }}</h4>
                  <p>{{ formatDateTime(class.date) }} • {{ class.duration }} min</p>
                  <div class="students-list">
                    <span *ngFor="let student of class.pupilNames; let last = last">
                      {{ student }}<span *ngIf="!last">, </span>
                    </span>
                  </div>
                </div>
                <div class="history-actions">
                  <button class="btn-icon">📊 Analytics</button>
                  <button class="btn-icon">📹 Recording</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-layout {
      display: flex;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      margin-left: 280px;
      background: #f8fafc;
    }

    .header {
      background: white;
      padding: 24px 32px;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left h1 {
      margin: 0;
      color: #1f2937;
      font-size: 24px;
      font-weight: 600;
    }

    .header-left p {
      margin: 4px 0 0 0;
      color: #6b7280;
      font-size: 14px;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }

    .content-area {
      padding: 32px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 16px;
      transition: transform 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-card.next-class {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .stat-icon {
      font-size: 32px;
      width: 60px;
      height: 60px;
      border-radius: 12px;
      background: #f0f9ff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .next-class .stat-icon {
      background: rgba(255, 255, 255, 0.2);
    }

    .stat-content h3 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      color: #1f2937;
    }

    .next-class .stat-content h3 {
      color: white;
    }

    .stat-content p {
      margin: 4px 0 0 0;
      color: #6b7280;
      font-size: 14px;
    }

    .next-class .stat-content p {
      color: rgba(255, 255, 255, 0.9);
    }

    .quick-actions {
      margin-bottom: 32px;
    }

    .quick-actions h2 {
      margin-bottom: 16px;
      color: #1f2937;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .action-btn {
      background: white;
      border: 2px solid #e5e7eb;
      padding: 20px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 500;
    }

    .action-btn:hover {
      border-color: #3b82f6;
      background: #eff6ff;
      transform: translateY(-2px);
    }

    .action-icon {
      font-size: 20px;
    }

    .view-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .view-toggles {
      display: flex;
      gap: 8px;
    }

    .toggle-btn {
      padding: 8px 16px;
      border: 2px solid #e5e7eb;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .toggle-btn.active {
      border-color: #3b82f6;
      background: #3b82f6;
      color: white;
    }

    .calendar-view {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .nav-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 6px;
      transition: background-color 0.2s;
      font-size: 18px;
    }

    .nav-btn:hover {
      background: #f3f4f6;
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      background: #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
    }

    .day-header {
      background: #f9fafb;
      padding: 12px;
      text-align: center;
      font-weight: 600;
      color: #374151;
    }

    .calendar-day {
      background: white;
      min-height: 100px;
      padding: 8px;
      position: relative;
    }

    .calendar-day.other-month {
      background: #f9fafb;
      opacity: 0.5;
    }

    .calendar-day.today {
      background: #eff6ff;
    }

    .day-number {
      display: block;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .class-event {
      background: #3b82f6;
      color: white;
      padding: 4px 6px;
      border-radius: 4px;
      margin-bottom: 2px;
      font-size: 10px;
      cursor: pointer;
    }

    .class-event.class-completed {
      background: #6b7280;
    }

    .event-time {
      font-weight: 600;
    }

    .event-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .class-filters {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
    }

    .filter-btn {
      padding: 8px 16px;
      border: 2px solid #e5e7eb;
      background: white;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .filter-btn.active {
      border-color: #3b82f6;
      background: #3b82f6;
      color: white;
    }

    .classes-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .class-item {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .class-main h3 {
      margin: 0 0 8px 0;
      color: #1f2937;
      font-size: 18px;
      font-weight: 600;
    }

    .class-description {
      color: #6b7280;
      margin-bottom: 12px;
    }

    .class-details {
      display: flex;
      gap: 20px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #6b7280;
      font-size: 14px;
    }

    .detail-icon {
      font-size: 16px;
    }

    .class-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .history-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .history-card {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .history-card h3 {
      margin: 0 0 16px 0;
      color: #6b7280;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .big-number {
      font-size: 32px;
      font-weight: 700;
      color: #1f2937;
    }

    .history-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .history-item {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .history-info h4 {
      margin: 0 0 8px 0;
      color: #1f2937;
      font-weight: 600;
    }

    .history-info p {
      color: #6b7280;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .students-list {
      color: #3b82f6;
      font-size: 14px;
      font-weight: 500;
    }

    .history-actions {
      display: flex;
      gap: 12px;
    }

    .btn-icon {
      background: none;
      border: 1px solid #e5e7eb;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 12px;
    }

    .btn-icon:hover {
      background: #f3f4f6;
    }

    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
      }
      
      .header {
        padding: 16px 20px;
      }
      
      .content-area {
        padding: 20px;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .actions-grid {
        grid-template-columns: 1fr 1fr;
      }
      
      .calendar-grid {
        font-size: 12px;
      }
      
      .calendar-day {
        min-height: 80px;
        padding: 4px;
      }
      
      .class-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      
      .class-actions {
        width: 100%;
        justify-content: space-between;
      }
    }
  `]
})
export class TeacherDashboardOldComponent implements OnInit {
  menuItems = [
    { icon: '📊', label: 'Dashboard', route: '/teacher' },
    { icon: '📚', label: 'Classes', route: '/teacher/classes' },
    { icon: '📈', label: 'Analytics', route: '/teacher/analytics' },
    { icon: '🕒', label: 'History', route: '/teacher/history' },
    { icon: '⚙️', label: 'Settings', route: '/teacher/settings' }
  ];

  activeRoute = '/teacher';
  allClasses: ClassSession[] = [];
  upcomingClasses: ClassSession[] = [];
  completedClasses: ClassSession[] = [];
  nextClass: ClassSession | null = null;
  totalStudents = 0;

  // Calendar view properties
  viewMode: 'calendar' | 'list' = 'list';
  classFilter: 'all' | 'upcoming' | 'completed' = 'all';
  currentDate = new Date();
  dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.classes$.subscribe(classes => {
      // Filter classes for current teacher (ID: 2 for demo)
      this.allClasses = classes.filter(c => c.teacherId === '2' || c.teacherId === '3');
      this.upcomingClasses = this.allClasses.filter(c => c.status === 'upcoming');
      this.completedClasses = this.allClasses.filter(c => c.status === 'completed');
      
      // Find next class
      const sortedUpcoming = this.upcomingClasses.sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      this.nextClass = sortedUpcoming.length > 0 ? sortedUpcoming[0] : null;
      
      // Calculate total unique students
      const allStudents = new Set();
      this.allClasses.forEach(c => c.pupilIds.forEach(id => allStudents.add(id)));
      this.totalStudents = allStudents.size;
      
      this.generateCalendar();
    });
  }

  joinClass(classSession: ClassSession): void {
    if (classSession.zoomLink) {
      window.open(classSession.zoomLink, '_blank');
    }
  }

  getTimeUntilClass(date: Date): string {
    const now = new Date();
    const classTime = new Date(date);
    const diff = classTime.getTime() - now.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }

  formatDateTime(date: Date): string {
    return new Date(date).toLocaleDateString() + ' ' + 
           new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getFilteredClasses(): ClassSession[] {
    if (this.classFilter === 'all') return this.allClasses;
    if (this.classFilter === 'upcoming') return this.upcomingClasses;
    return this.completedClasses;
  }

  getTotalHours(): string {
    const totalMinutes = this.completedClasses.reduce((sum, c) => sum + c.duration, 0);
    const hours = Math.floor(totalMinutes / 60);
    return `${hours}h`;
  }

  // Calendar methods
  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarDays = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dayClasses = this.allClasses.filter(c => {
        const classDate = new Date(c.date);
        return classDate.toDateString() === currentDate.toDateString();
      });

      this.calendarDays.push({
        date: currentDate.getDate(),
        currentMonth: currentDate.getMonth() === month,
        isToday: currentDate.getTime() === today.getTime(),
        classes: dayClasses
      });
    }
  }

  getCurrentMonthYear(): string {
    return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }
}
*/
