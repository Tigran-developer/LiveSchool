import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() menuItems: Array<{icon: string, label: string, route: string}> = [];
  @Input() activeRoute: string = '';

  isCollapsed = false;

  private destroy$ = new Subject<void>();

  constructor(private router: Router, private authService: AuthService) {}

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  switchRole(role: 'admin' | 'teacher' | 'pupil'): void {
    this.authService.switchRole(role);
    const routes = {
      admin: '/admin',
      teacher: '/teacher',
      pupil: '/pupil'
    };
    this.router.navigate([routes[role]]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}