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
import {sidebarItems} from '../shared/constants/sidebarItems';

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

  menuItems: any[] = [];

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

  ngOnInit() {
    /*this.users$ = this.userService.getUsers();*/
    this.activeRoute = this.router.url;
    if(this.authService.currentUser?.roles.includes('Teacher')){
        this.menuItems = sidebarItems.filter(item=> item.role === 'ADMIN')
    } else if(this.authService.currentUser?.roles.includes('Pupil')){
      this.menuItems = sidebarItems.filter(item=> item.role === 'STUDENT')
    }else if(this.authService.currentUser?.roles.includes('Admin')){
      this.menuItems = sidebarItems.filter(item=> item.role === 'ADMIN')
    }
  }
}
