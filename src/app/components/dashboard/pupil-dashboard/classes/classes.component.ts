import {Component, inject, OnInit} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IClassDetails} from '../../../../../shared/interfaces/iClass-details';
import {ActivatedRoute} from '@angular/router';
import {DataClassService} from "../../../../services/data-class.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    FormsModule
  ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent implements OnInit {

  viewMode: 'upcoming' | 'history' = 'upcoming';
  upcomingClasses: IClassDetails[] = [];
  completedClasses: IClassDetails[] = [];
  availableClasses: IClassDetails[] = [];
  nextClass: IClassDetails | null = null;

  activeRoute: string|undefined;

  private dataClassService = inject(DataClassService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.dataClassService.getAllClasses().pipe(
        tap(classes => {
              this.upcomingClasses = classes?.filter(c => c.status.toLowerCase() === 'upcoming') || [];
              this.completedClasses = classes?.filter(c => c.status.toLowerCase() === 'completed') || [];
              this.availableClasses = classes?.filter(c => c.status.toLowerCase() === 'upcoming') || [];
            }
        )
    ).subscribe();

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
}
