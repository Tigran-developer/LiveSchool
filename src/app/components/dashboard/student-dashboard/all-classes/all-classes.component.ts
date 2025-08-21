import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IClassDetails} from '../../../../../shared/interfaces/iClass-details';
import {DataClassService} from "../../../../services/data-class.service";
import {BehaviorSubject, finalize, map, Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs";
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    FormsModule,
  ],
  templateUrl: './all-classes.component.html',
  styleUrl: './all-classes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllClassesComponent implements OnInit {
  upcomingClasses: IClassDetails[] = [];
  completedClasses: IClassDetails[] = [];
  availableClasses$: Observable<IClassDetails[] | null> = of(null);
  nextClass: IClassDetails | null = null;
  remainingClasses = 5;

  bookClassEmitter = new Subject<string>();

  private refreshClasses$ = new BehaviorSubject<void>(undefined);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthService,
              private cdr: ChangeDetectorRef,
              private dataClassService: DataClassService) {
  }


  ngOnInit(): void {
    this.bookClassListener();
    this.refreshClassListener();
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

  private loadClassesListener(){
/*    return this.dataClassService.getAllClasses().pipe(

    )*/
  }

  getTimeUntilClass(date: string): string {
    const diff = new Date(date).getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `In ${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `In ${hours} hour${hours > 1 ? 's' : ''}`;
    return 'Starting soon';
  }

  private bookClassListener() {
    this.bookClassEmitter.pipe(
      takeUntil(this.destroy$),
      switchMap(id => {
        return this.dataClassService.bookClass(id);
      }),
      tap(() => this.refreshClasses$.next()),
    ).subscribe();
  }

  private refreshClassListener() {
    this.availableClasses$ = this.refreshClasses$.pipe(
      switchMap(() => this.dataClassService.getAllClasses())
    )
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
