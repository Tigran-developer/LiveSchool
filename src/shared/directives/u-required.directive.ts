import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Subscription} from 'rxjs';
import {NgControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Directive({
  selector: '[URequired]',
  standalone: true
})
export class URequiredDirective implements OnInit, OnDestroy {
  @Input('URequired') message?: string;
  private statusChangeSub?: Subscription;
  private errorMessageEl?: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control: NgControl,
    private ngx: TranslateService
  ) {
  }

  ngOnInit() {
    if (!this.control) return;

    this.statusChangeSub = this.control.statusChanges?.subscribe(() => {
      this.toggleErrorMessage();
    });

    this.toggleErrorMessage();
  }

  private toggleErrorMessage() {
    const control = this.control?.control;
    if (!control) return;
    if (control.invalid && control.errors?.['required'] && control.dirty) {
      this.showErrorMessage();
      this.addErrorClass()
    } else {
      this.removeErrorMessage();
      this.removeErrorClass()
    }
  }

  private showErrorMessage() {
    if (!this.errorMessageEl) {
      this.translateMessage();
      this.errorMessageEl = this.renderer.createElement('span');
      this.renderer.addClass(this.errorMessageEl, 'required-message');
      this.renderer.setStyle(this.errorMessageEl, 'color', 'red');
      this.renderer.setStyle(this.errorMessageEl, 'padding-top', '4px');
      this.renderer.setStyle(this.errorMessageEl, 'font-size', '12px');
      this.renderer.setStyle(this.errorMessageEl, 'display', 'inline-flex');
      this.renderer.setStyle(this.errorMessageEl, 'align-items', 'center');

      const iconEl = this.renderer.createElement('i');
      this.renderer.addClass(iconEl, 'pi');
      this.renderer.addClass(iconEl, 'pi-info-circle');
      this.renderer.setStyle(iconEl, 'margin-right', '4px');
      this.renderer.appendChild(this.errorMessageEl, iconEl);

      const text = this.renderer.createText(this.message || '');
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

  private translateMessage() {
    if (this.message) {
      this.message = this.ngx.instant(this.message) +  this.ngx.instant('IS_REQUIRED');
    }else {
      this.message = this.ngx.instant('FIELD_IS_REQUIRED');
    }
  }

  private addErrorClass(){
    this.renderer.addClass(this.el.nativeElement, 'error');
  }
  private removeErrorClass(){
    this.renderer.removeClass(this.el.nativeElement, 'error');
  }

  ngOnDestroy() {
    this.statusChangeSub?.unsubscribe();
  }
}
