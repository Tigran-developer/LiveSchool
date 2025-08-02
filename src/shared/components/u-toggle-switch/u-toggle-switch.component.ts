import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {TranslatePipe} from '@ngx-translate/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'u-toggle-switch',
  standalone: true,
  imports: [
    ToggleSwitch,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './u-toggle-switch.component.html',
  styleUrl: './u-toggle-switch.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UToggleSwitchComponent),
      multi: true,
    },
  ],
})
export class UToggleSwitchComponent implements ControlValueAccessor, ICellRendererAngularComp  {
  @Input() value: boolean = false;
  @Input() label!: string;
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<boolean>();

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  agInit(params: any): void {
    const valueObj = typeof params.value === 'object' ? params.value : {
      value: params.value,
      disabled: false
    };

    this.value = valueObj.value;
    this.disabled = valueObj.disabled;
  }

  refresh(params: any): boolean {
    return false;
  }

  handleToggleChange(event: any) {
    this.value = event.checked;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }
}
