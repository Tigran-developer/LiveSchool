import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {MenuItem, PrimeTemplate, TooltipOptions} from 'primeng/api';
import {BehaviorSubject, Subject, takeUntil, tap} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Tree} from 'primeng/tree';
import {CommonModule} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {Menu} from 'primeng/menu';
import {IMenuItem} from '../../../../shared/interfaces/iMenu-item';
import {ICurrentUser} from '../../../../shared/interfaces/iCurrent-user';
import {AuthService} from '../../../services/auth.service';
import { environment } from '../../../../enviroments/environment';
import {MENU_ITEMS} from '../../../../shared/constants/menu-bar-items';

@Component({
  selector: 'menu-bar',
  standalone: true,
  templateUrl: './menu-bar.component.html',
  imports: [
    CommonModule,
    TranslatePipe,
    Tree,
    PrimeTemplate,
    Tooltip,
    Menu
  ],
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {
  @Input() barList: IMenuItem[] = [];

  savedTimeZone: {timeZoneUTC: string; time: string; timeZoneZ: string} = {time:'', timeZoneZ:'', timeZoneUTC:''};
  timeZoneOptions: {timeZoneUTC: string; timeZoneName: string; timeZoneZ: string;}[] = [];
  timeInDialogTimezone: string = '';
  sidebarInterval: any = '';
  dialogInterval!: any;

  filteredBarList: IMenuItem[] = [];

  searchValue: string = '';
  currentUser: ICurrentUser | null = null;
  expanded = true;
  labels: {key: string, value: string }[] =[];
  tooltipOptions: TooltipOptions = {
    tooltipPosition: 'right',
    tooltipEvent: 'hover'
  };

  filter$ = new Subject<string>();
  timeZoneChange$ = new BehaviorSubject<string | number | null>(Intl.DateTimeFormat().resolvedOptions().timeZone);
  saveTimezone$ = new Subject<void>();
  destroy$= new Subject<void>();

  private _showTimezoneDialog = false;

  protected readonly environment = environment;

  get showTimezoneDialog(): boolean {
    return this._showTimezoneDialog;
  }

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngx: TranslateService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.barList = this.allowedBarItems();
    this.filteredBarList = this.allowedBarItems();
    this.currentUser = this.authService.currentUser;
    this.routeChangeListener();
    this.filterBarItemsListener();
    this.timeZoneSaveListener();
    this.loadMessages();
  }

  onNodeSelect(event: any) {
    if (event.navPath) {
      this.router.navigate([event.navPath]);
    }
  }

  toggleNode(node: any) {
    if (node) {
      node.expanded = node ? !node.expanded : true;
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onShowProfile() {
    this.router.navigate(['/profile']);
  }

  resetNodes(order:{unselect?: boolean, collapse?: boolean, expand?:boolean}) {
    if(order.unselect){
      this.filteredBarList = this.unselectNodes(this.filteredBarList);
    }
    if(order.collapse){
      this.filteredBarList = this.collapseNodes(this.filteredBarList);
    }
    if(order.expand){
      this.filteredBarList = this.expandNode(this.filteredBarList);
    }
  }

  hasSelectedChild(node: IMenuItem): boolean | undefined{
    return node?.children?.some((child) => child.selected)
  }

  private routeChangeListener(){
    this.router.events.pipe(
      takeUntil(this.destroy$),
      tap(event => {
        if (event instanceof NavigationEnd) {
          this.resetNodes({unselect: true});
          const basePath = event.url.split('/')[1];
          const fLCh = event.url.split('/')[2]; // First Level Child Path
          this.markSelectedTab(basePath, fLCh);
        }
      })
    ).subscribe();
  }

  private allowedBarItems(): IMenuItem[] {
    const allowedComponents = new Set(
      /*this.authService.currentUser?.components.map((item) => item.uiName)*/
    );

    return MENU_ITEMS.filter((item) => {
      if (item.children) {
        item.children = item.children.filter((child) =>
          child.uiNames?.some((name) => allowedComponents.has(name))
        );
        return item.children.length > 0;
      } else {
        return item.uiNames?.some((name) => allowedComponents.has(name));
      }
    });
  }

  private filterBarItemsListener() {
    this.filter$.pipe(
      takeUntil(this.destroy$),
      tap(val => {
        if(val.trim() === ''){
          this.filteredBarList = JSON.parse(JSON.stringify(this.barList));
          this.resetNodes({expand: true});
          this.markSelectedTab(this.router.url.split('/')[1], this.router.url.split('/')[2]);
          return
        }
        this.filterLabels(val);
      })
    ).subscribe()
  }

  private loadMessages(): void {
    this.ngx.get(this.getAllLabels(this.filteredBarList)).pipe(
      takeUntil(this.destroy$),
      tap(translationOb => {
        this.labels = Object.entries(translationOb).map(
          ([key, value]) => {
            const stVal = value as string;
            return {
              key: key,
              value: stVal
            }
          }
        );
      })
    ).subscribe()
  }

  private filterLabels(searchQuery: string){
    const filteredLabels: Set<string> = new Set();
    this.labels.forEach(item => {
      if (item.value.toLowerCase().includes(searchQuery.toLowerCase())) {
        filteredLabels.add(item.key);
      }
    })

    this.filteredBarList = JSON.parse(JSON.stringify(this.barList)).filter((item: IMenuItem)=>{
      if(item.children?.length){
        item.children = item.children.filter((child: IMenuItem) => filteredLabels.has(child.label || ''))
        if(item.children?.length){
          item.expanded = true;
          return true;
        }
        return false;
      }
      return filteredLabels.has(item['key'] || '');
    })
    this.markSelectedTab(this.router.url.split('/')[1], this.router.url.split('/')[2]);
  }

  private markSelectedTab(basePath: string, fLCh: string){
    this.filteredBarList.find(item => {
      if (item.children) {
        const selectedChild = item.children
          .find((child) => child.navPath?.includes(`${basePath}/${fLCh}`));
        if (selectedChild) {
          selectedChild.selected = true;
          if(this.expanded){
            item.expanded = true;
          }
          this.cdr.detectChanges();
          return true;
        }
        this.cdr.detectChanges();
        return false;
      } else {
        this.cdr.detectChanges();
        return  item.navPath?.includes(`${basePath}/${fLCh}`)
      }
    })
  }

  private getAllLabels(menuItems: IMenuItem[]): string[] {
    return menuItems.reduce((acc: string[], item) => {
      acc.push(item.label || '');
      if (item.children) {
        acc.push(...this.getAllLabels(item.children));
      }
      return acc;
    }, []);
  }

  private unselectNodes(nodes: IMenuItem[]): IMenuItem[] {
    return nodes.map(node => {
      if (node.children) {
        return {
          ...node,
          selected: false,
          children: this.unselectNodes(node.children)
        }
      } else {
        return {
          ...node,
          selected: false,
        }
      }
    })
  }

  private collapseNodes(nodes: IMenuItem[]): IMenuItem[] {
    return nodes.map(node => {
      if (node.expanded) {
        return {
          ...node,
          expanded: false
        }
      }
      return node
    })
  }

  private expandNode(nodes: IMenuItem[]): IMenuItem[] {
    return  nodes.map(node => {
      if(node.children){
        const hasSelectedChild = node.children.some((child) => child.selected);
        if(hasSelectedChild){
          return {
            ...node,
            expanded: true
          }
        }
      }
      return node
    })
  }

  private timeZoneSaveListener(){
    this.saveTimezone$.pipe(
      takeUntil(this.destroy$),
      tap(_=>{
        if(typeof this.timeZoneChange$.getValue() ==='string') {
          const timeZoneItem = this.timeZoneOptions
            .find(item=>item.timeZoneZ === this.timeZoneChange$.getValue() as string)
          if(timeZoneItem){
            this.savedTimeZone.timeZoneUTC = timeZoneItem.timeZoneUTC;
            this.savedTimeZone.timeZoneZ = timeZoneItem.timeZoneZ;
            const timeZoneToSave = {timeZoneUTC: timeZoneItem.timeZoneUTC, timeZone: timeZoneItem.timeZoneZ};
            this.cdr.detectChanges();
          }
        }
      })
    ).subscribe()
  }

  ngOnDestroy(){
    clearInterval(this.sidebarInterval);
    clearInterval(this.dialogInterval);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
