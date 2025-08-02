import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Subject} from "rxjs";
import {SidebarComponent} from '../../sidebar/sidebar.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {IClassDetails} from '../../../../shared/interfaces/iClass-details';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  menuItems = [
    { icon: '📊', label: 'Dashboard', route: '/teacher' },
    { icon: '📚', label: 'Classes', route: '/teacher/classes' },
    { icon: '📈', label: 'Analytics', route: '/teacher/analytics' },
    { icon: '🕒', label: 'History', route: '/teacher/history' },
    { icon: '⚙️', label: 'Settings', route: '/teacher/settings' }
  ];

  activeRoute = '/teacher';
  allClasses: IClassDetails[] = [];
  upcomingClasses: IClassDetails[] = [];
  completedClasses: IClassDetails[] = [];
  nextClass: IClassDetails | null = null;
  totalStudents = 0;

  viewMode: 'calendar' | 'list' = 'list';
  classFilter: 'all' | 'upcoming' | 'completed' = 'all';
  currentDate = new Date();
  dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: any[] = [];

  private destroy$ = new Subject<void>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    /*this.dataService.classes$.subscribe(classes => {
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
/!*      const allStudents = new Set();
      this.allClasses.forEach(c => c.pupilIds.forEach(id => allStudents.add(id)));
      this.totalStudents = allStudents.size;*!/

      this.generateCalendar();
    });*/
  }

  joinClass(classSession: IClassDetails): void {
    if (classSession.zoomLink) {
      window.open(classSession.zoomLink, '_blank');
    }
  }

  getTimeUntilClass(date: string): string {
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

  formatDateTime(date: string): string {
    return new Date(date).toLocaleDateString() + ' ' +
        new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getFilteredClasses(): IClassDetails[] {
    if (this.classFilter === 'all') return this.allClasses;
    if (this.classFilter === 'upcoming') return this.upcomingClasses;
    return this.completedClasses;
  }

  getTotalHours(): string {
    const totalMinutes = this.completedClasses.reduce((sum, c) => sum + c.durationInMinutes, 0);
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
        const classDate = new Date(c.startTime);
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
