import {Component, OnDestroy, OnInit} from '@angular/core';
import {IClassDetails} from '../../../../../shared/interfaces/iClass-details';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {DataClassService} from '../../../../services/data-class.service';
import {EMPTY, filter, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {CommonModule} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';
import {FormsModule} from '@angular/forms';
import {StudentService} from '../../../../services/student.service';
import {IStudent} from '../../../../../shared/interfaces/iStudent';
import {ClassStatus} from '../../../../../shared/constants/ClassStatus';

@Component({
  selector: 'app-booked-classes',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    FormsModule],
  templateUrl: './booked-classes.component.html',
  styleUrl: './booked-classes.component.scss'
})
export class BookedClassesComponent implements OnInit, OnDestroy {
  viewMode: 'upcoming' | 'history' = 'upcoming';
  upcomingClasses: IClassDetails[] = [];
  completedClasses: IClassDetails[] = [];
  availableClasses: IClassDetails[] = [];
  nextClass: IClassDetails | null = null;

  activeRoute: string|undefined;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private dataClassService: DataClassService,
    private studentService: StudentService,
  ) {
  }

  ngOnInit(): void {
    const userId = this.authService.currentUser?.id
    if (userId) {
      this.studentService.getStudentByUserId(userId).pipe(
        takeUntil(this.destroy$),
        switchMap((student: IStudent | null) => {
          if (!student?.id) return EMPTY;

          return this.dataClassService.getBookedClasses(student.id).pipe(
            tap(classes => {
              if(!classes) classes = [];

              const upcoming = classes.filter(c => c.status.id.toUpperCase() === ClassStatus.UPCOMING);
              const completed = classes.filter(c => c.status.id.toUpperCase() === ClassStatus.COMPLETED);
              const canceled = classes.filter(c => c.status.id.toUpperCase() === ClassStatus.CANCELLED);

              this.upcomingClasses = upcoming;
              this.completedClasses = completed;
              this.availableClasses = canceled;
            })
          );
        })
      ).subscribe();
    }

    this.activeRoute = this.route?.routeConfig?.path
    this.nextClass = this.upcomingClasses
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())[0] || null;
  }

  getTotalHours(): string {
    const totalMinutes = this.completedClasses.reduce((sum, c) => sum + c.durationInMinutes, 0);
    return `${Math.floor(totalMinutes / 60)}h`;
  }

  joinClass(classSession: IClassDetails): void {
    if (classSession.zoomLink) window.open(classSession.zoomLink, '_blank');
  }

  getTimeUntilClass(date: string): string {
    const diff = new Date(date).getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `In ${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `In ${hours} hour${hours > 1 ? 's' : ''}`;
    return 'Starting soon';
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete()
  }
}
