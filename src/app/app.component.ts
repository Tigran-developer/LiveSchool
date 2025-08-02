import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {IUser} from '../shared/interfaces/iUser';
import {UserService} from './services/user.service';
import {DataClassService} from './services/data-class.service';
import {IClass} from '../shared/interfaces/iClass';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  users$!: Observable<IUser[] | null>;
  classes$!: Observable<IClass[] | null>;
  private ngx = inject(TranslateService)
  private userService = inject(UserService)
  private dataClassService = inject(DataClassService)

  constructor(){
    this.ngx.addLangs(['am', 'en']);
    this.ngx.setDefaultLang('en');
    this.ngx.use('en');
  }

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    this.classes$ = this.dataClassService.getAllClasses()
  }

}
