import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {NgClass} from '@angular/common';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'u-date-input',
  standalone: true,
  imports: [
    InputText,
    ReactiveFormsModule,
    TranslatePipe,
    FormsModule,
    NgClass,
    DatePicker
  ],
  templateUrl: './u-date-input.component.html',
  styleUrl: './u-date-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UDateInputComponent {
  @Input() value: Date | undefined = undefined;
  @Input() placeholder: string = 'SELECT_DATE';
  @Input() showTime: boolean = false;
  @Input() readonlyInput: boolean = false;
  @Input() disabled: boolean = false;
  @Input() classCss: string = '';
  @Input() appendTo: string = 'body';

  @Output() valueChange = new EventEmitter<Date | undefined>();

  selectedDate: Date | undefined = this.value;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.selectedDate = changes['value'].currentValue;
    }
  }

  clearSelectedDate(): void {
    this.selectedDate = undefined;
    this.valueChange.emit(undefined);
  }
}
