import {IPermit} from './iPermit';

export interface IPermissionComponent {
  id: number,
  name: string,
  uniqueName: string
  uiName: string,
  permits?: IPermit[]
}
