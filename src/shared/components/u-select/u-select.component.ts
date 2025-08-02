import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Select} from 'primeng/select';
import {AbstractControl, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

export interface SelectOption<T = string | number> {
  label: string;
  value: T;
  disabled?: boolean;
}


@Component({
  selector: 'u-select',
  standalone: true,
  imports: [
    Select,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './u-select.component.html',
  styleUrl: './u-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => USelectComponent),
      multi: true
    }
  ]
})
export class USelectComponent<T> implements ControlValueAccessor {
  @Input() control: AbstractControl | null = null;
  @Input() valueFieldName: string = 'id';
  @Input() labelFieldName: string | string[] = ['uniqueName'];
  @Input() placeholder: string = 'SELECT';
  @Input() disabled!: boolean;
  @Input() clearable: boolean = false;
  @Input() showCheckmark: boolean = true;
  @Input() styleClass: string = '';
  @Input() set options(val: any[] | null) {
    if (val) {
      this._options = val.map(item => {
        let label = this.translateLabel(item);
        return {
          label: label,
          value: item[this.valueFieldName]
        };
      })
    }
  }
  @Input() set value(val: string | number | null | undefined) {
    if (val !== this._value ) {
      if(val === undefined) val = null;
      this._value = val;
      this.onChange(val);
      this.onTouched();
      this.valueChange.emit(val);
    }
  }

  @Output() valueChange = new EventEmitter<string | number | null>();

  private _options!: SelectOption[];
  private _value!: string | number | null;
  private onChange: (value: string | number | null) => void = () => { };
  private onTouched: () => void = () => {};

  get options(): SelectOption[] | undefined {
    return this._options;
  }
  get value(): string | number | null {
    return this._value;
  }

  constructor(private cdr: ChangeDetectorRef,
              private ngx: TranslateService) {
  }

  translateLabel(data: any) {
    if (Array.isArray(this.labelFieldName)) {
      let words: string[] = [];
      this.labelFieldName.forEach(item => {
        words.push(this.ngx.instant(data[item]));
        }
      )
      return words.join(" ");
    }
    return this.ngx.instant(data[this.labelFieldName])
  }

  isInvalid(): boolean {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched) || false;
  }

  onValueChange(value: number | string | null): void {
    this.value = value;
    this.valueChange.emit(value);
    this.cdr.detectChanges();
  }

  writeValue(value: string | number | null): void {
    this._value = value;
    this.cdr.detectChanges();
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
    this.cdr.detectChanges();
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if(this.disabled === undefined){
      this.disabled = isDisabled
    }
  }
}
