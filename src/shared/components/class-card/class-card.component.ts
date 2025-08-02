import {Component, Input} from '@angular/core';
import { LucideAngularModule, Calendar, Users, User, Clock } from 'lucide-angular';
import {CommonModule} from '@angular/common';
import {IClass} from '../../interfaces/iClass';

@Component({
  selector: 'class-card',
  imports: [ CommonModule, LucideAngularModule],
  standalone: true,
  templateUrl: './class-card.component.html',
  styleUrl: './class-card.component.scss'
})
export class ClassCardComponent {
  @Input() class!: IClass;

  readonly calendarIcon = Calendar;
  readonly usersIcon = Users;
  readonly userIcon = User;
  readonly clockIcon = Clock;

  getLevelColor(level: string): string {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  getCategoryColor(category: string): string {
    switch (category) {
      case 'Development': return 'bg-blue-50 border-l-blue-400';
      case 'Design': return 'bg-purple-50 border-l-purple-400';
      case 'Data Science': return 'bg-emerald-50 border-l-emerald-400';
      case 'Marketing': return 'bg-orange-50 border-l-orange-400';
      case 'AI/ML': return 'bg-cyan-50 border-l-cyan-400';
      default: return 'bg-gray-50 border-l-gray-400';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getParticipationPercentage(): number {
    return (50 / this.class.maxParticipants) * 100;
  }

}
