import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from "@angular/forms";
import { InputText } from "primeng/inputtext";
import { TranslatePipe } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'u-search-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputText,
    TranslatePipe
  ],
  templateUrl: './u-search-input.component.html',
  styleUrls: ['./u-search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class USearchInputComponent implements OnChanges {
  @Output() valueChange = new EventEmitter<string>();
  @Input() value: string = '';
  @Input() placeholder: string = 'SEARCH';
  @Input() disabled: boolean = false;
  @Input() classCss: string = '';

  searchQuery: string = this.value;
  isHovered: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.searchQuery = changes['value'].currentValue;
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.valueChange.emit('');
  }
}
