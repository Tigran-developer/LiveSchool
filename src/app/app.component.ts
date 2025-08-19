import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {IUser} from '../shared/interfaces/iUser';
import {UserService} from './services/user.service';
import {DataClassService} from './services/data-class.service';
import {IClass} from '../shared/interfaces/iClass';
import {AuthService} from './services/auth.service';
import {SidebarComponent} from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  activeRoute: string| undefined;
  users$!: Observable<IUser[] | null>;
  classes$!: Observable<IClass[] | null>;

  constructor(
    public authService: AuthService,
    private router: Router,
    private ngx: TranslateService,
    private userService: UserService,
    private dataClassService: DataClassService,
  ) {
    this.ngx.addLangs(['am', 'en']);
    this.ngx.setDefaultLang('en');
    this.ngx.use('en');
  }

  menuItems = [
    { icon: '📚', label: 'Booked Classes', route: '/pupil/booked-classes' },
    { icon: '🔍', label: 'All Classes', route: '/pupil/browse-classes' },
    { icon: '💳', label: 'Subscription', route: '/pupil/subscription' },
    /*{ icon: '📊', label: 'Dashboard', route: '/pupil' },*/
    /*{ icon: '📈', label: 'Progress', route: '/pupil/progress' }*/
  ];

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    this.activeRoute = this.router.url;
  }

}
