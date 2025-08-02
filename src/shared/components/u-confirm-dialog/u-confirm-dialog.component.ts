import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationDialogService} from '../../../services/confirmation-dialog.service';
import {Dialog} from 'primeng/dialog';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-u-confirm-dialog',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    ButtonModule,
    Dialog,
    TranslatePipe,
  ],
  templateUrl: './u-confirm-dialog.component.html',
  styleUrl: './u-confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UConfirmDialogComponent {
  visible = false;
  headerTextKey = '';
  messageKey = '';
  private resolve!: (result: boolean) => void;

  constructor(private confirmDialogService: ConfirmationDialogService, private cdr: ChangeDetectorRef) {
    this.confirmDialogService.dialog$.subscribe(data => {
      if (data) {
        this.headerTextKey = data.headerTextKey;
        this.messageKey = data.messageKey;
        this.resolve = data.resolve;
        this.visible = true;
        this.cdr.detectChanges();
      }
    });
  }

  confirm(result: boolean) {
    this.visible = false;
    this.resolve(result);
  }
}
