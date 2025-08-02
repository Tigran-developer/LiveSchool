import {MenuItem} from 'primeng/api';

export interface IMenuItem extends MenuItem {
  navPath?: string,
  iconPath?: string,
  hoverIconPath?: string,
  expanded?: boolean,
  selected?: boolean,
  uiNames?: string[],
  children?: IMenuItem[],
}
