import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  DoCheck, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PAGINATION_OPTIONS} from '../../constants/pagination-options';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'u-paginator',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './u-paginator.component.html',
  styleUrls: ['./u-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements DoCheck {
  @Input() disabled!: boolean;
  @Input() pageLengthOptions: number[] = PAGINATION_OPTIONS.rowsPerPageOptions;
  @Input() set page(value: number| undefined){
    if(value){
      this._page = value;
    }
  }
  @Input() set size(value: number| undefined){
    if(value){
      this._size = value;
    }
  }
  @Input() set totalPages(value: number| undefined){
    if(value){
      this._totalPages = value;
    }
  }
  @Input() set totalItemsCount(value: number| undefined){
    if(value !== undefined){
      this._totalItemsCount = value;
    }
  }

  @Output() pageEvent = new EventEmitter<{ pageSize: number; page: number }>();

  minRangeValue: number = Math.min(
    this.page * this.size,
    this.totalItemsCount
  );

  private _page: number = 1
  private _size: number = PAGINATION_OPTIONS.defaultPageSize
  private _totalPages: number = 1;
  private _totalItemsCount: number = 0;

  get size(): number {
    return this._size;
  }
  get page(): number {
    return this._page;
  }
  get totalPages(): number {
    return this._totalPages;
  }
  get totalItemsCount(): number {
    return this._totalItemsCount;
  }

  ngDoCheck(): void {
    this.totalPages = Math.ceil(this.totalItemsCount / this.size);
    this.minRangeValue = this.getMinRangeValue();
  }

  emitChanges(page: number) {
    this.pageEvent.emit({ pageSize: this.size, page });
  }

  getVisiblePages(): number[] {
    const pages: number[] = [];
    if (this.totalItemsCount <= this.size) {
      return [1];
    }
    pages.push(1);
    const startPage = Math.max(2, this.page - 1);
    const endPage = Math.min(this.totalPages - 1, this.page + 1);
    if (startPage > 2) {
      pages.push(-1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < this.totalPages - 1) {
      pages.push(-1);
    }
    pages.push(this.totalPages);
    return pages;
  }

  getMinRangeValue() {
    return Math.min(this.page * this.size, this.totalItemsCount);
  }

}
