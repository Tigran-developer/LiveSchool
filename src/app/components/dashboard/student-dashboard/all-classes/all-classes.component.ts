import {Component, inject, OnInit} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IClassDetails} from '../../../../../shared/interfaces/iClass-details';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DataClassService} from "../../../../services/data-class.service";
import {Observable, of, tap} from "rxjs";
import {AuthService} from '../../../../services/auth.service';
import {ClassStatus} from '../../../../../shared/constants/ClassStatus';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './all-classes.component.html',
  styleUrl: './all-classes.component.scss'
})
export class AllClassesComponent implements OnInit {
  viewMode: 'upcoming' | 'history' = 'upcoming';
  upcomingClasses: IClassDetails[] = [];
  completedClasses: IClassDetails[] = [];
  availableClasses$: Observable<IClassDetails[] | null> = of(null);
  nextClass: IClassDetails | null = null;
  remainingClasses = 5;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private dataClassService: DataClassService) {
  }


  ngOnInit(): void {

    this.availableClasses$ = this.dataClassService.getAllClasses();
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

  bookClass(item: IClassDetails) {

  }
}
