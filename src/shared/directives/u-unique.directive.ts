import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {NgControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Directive({
  selector: '[UUnique]',
  standalone: true,
})
export class UUniqueDirective implements OnInit, OnDestroy {
  @Input('UUnique') message?: string;
  private statusChangeSub?: Subscription;
  private errorMessageEl?: HTMLElement;
  private spinnerEl?: HTMLElement;
  private errorMessage = 'ALREADY_EXISTS';
  private errorMessageArchive = 'ALREADY_EXISTS_IN_ARCHIVE';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control: NgControl,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    if (!this.control) return;

    this.statusChangeSub = this.control.statusChanges?.subscribe(() => {
      this.toggleErrorMessage();
      this.toggleSpinner();
    });
  }

  private toggleErrorMessage() {
    const control = this.control?.control;
    if (!control) return;

    if (control.invalid && control.errors?.['alreadyExists'] && control.dirty) {

      if(control.errors?.['alreadyExists']?.isFromArchive !== undefined){
        this.showErrorMessage(control.errors?.['alreadyExists']?.isFromArchive);
      }
      else {
        this.showErrorMessage();
      }
    } else {
      this.removeErrorMessage();
    }
  }

  private showErrorMessage(isFromArchive?: boolean) {
    const message = isFromArchive ? this.translate.instant(this.errorMessageArchive) :
      this.translate.instant(this.errorMessage);
    if (!this.errorMessageEl) {
      const inputName = this.translate.instant(this.message || '');
      this.errorMessageEl = this.renderer.createElement('span');
      this.renderer.addClass(this.errorMessageEl, 'unique-message');
      this.renderer.setStyle(this.errorMessageEl, 'color', 'red');
      this.renderer.setStyle(this.errorMessageEl, 'display', 'flex');
      this.renderer.setStyle(this.errorMessageEl, 'align-items', 'center');
      this.renderer.setStyle(this.errorMessageEl, 'padding-top', '4px');
      this.renderer.setStyle(this.errorMessageEl, 'font-size', '12px');

      const iconEl = this.renderer.createElement('i');
      this.renderer.addClass(iconEl, 'pi');
      this.renderer.addClass(iconEl, 'pi-info-circle');
      this.renderer.setStyle(iconEl, 'margin-right', '4px');
      this.renderer.appendChild(this.errorMessageEl, iconEl);

      const text = this.renderer.createText(`${inputName} ${message}`);
      this.renderer.appendChild(this.errorMessageEl, text);

      const parent = this.el.nativeElement.parentNode;
      this.renderer.appendChild(parent, this.errorMessageEl);
    }
  }

  private removeErrorMessage() {
    if (this.errorMessageEl) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.errorMessageEl);
      this.errorMessageEl = undefined;
    }
  }

  private toggleSpinner() {
    const control = this.control?.control;
    if (!control) return;

    if (control.status === 'PENDING') {
      this.showSpinner();
    } else {
      this.removeSpinner();
    }
  }

  private showSpinner() {
    if (!this.spinnerEl) {
      this.spinnerEl = this.renderer.createElement('span');
      this.renderer.addClass(this.spinnerEl, 'input-spinner');
      this.renderer.setProperty(this.spinnerEl, 'innerHTML', '<i class="pi pi-spinner pi-spin"></i>');
      this.renderer.setStyle(this.spinnerEl, 'padding-left', '8px');
      this.renderer.setStyle(this.spinnerEl, 'font-size', '16px');
      this.renderer.appendChild(this.el.nativeElement.parentNode, this.spinnerEl);
    }
  }

  private removeSpinner() {
    if (this.spinnerEl) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.spinnerEl);
      this.spinnerEl = undefined;
    }
  }

  ngOnDestroy() {
    this.statusChangeSub?.unsubscribe();
  }
}
