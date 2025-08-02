import {Component, inject} from '@angular/core';
import {BookOpen, Filter, LucideAngularModule, Search} from 'lucide-angular';
import {IClass} from '../../../../../shared/interfaces/iClass';
import {DataClassService} from '../../../../services/data-class.service';
import {ClassCardComponent} from '../../../../../shared/components/class-card/class-card.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    CommonModule,
    ClassCardComponent,
    LucideAngularModule,
    FormsModule
  ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {
  private classesService = inject(DataClassService);

  readonly searchIcon = Search;
  readonly bookOpenIcon = BookOpen;
  readonly filterIcon = Filter;

  classes: IClass[] = [];
  filteredClasses: IClass[] = [];
  categories: string[] = [];
  levels: string[] = [];

  searchTerm: string = '';
  selectedCategory: string = 'All';
  selectedLevel: string = 'All';

  ngOnInit(): void {
    this.classesService.getAllClasses().subscribe(items=>{
      this.classes = items
    });
/*    this.categories = this.classesService.getCategories();
    this.levels = this.classesService.getLevels();*/
    this.filteredClasses = [...this.classes];
  }

  filterClasses(): void {
    this.filteredClasses = this.classes.filter(classItem => {
      const matchesSearch = classItem.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        classItem.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        `${classItem.teacher.FirstName} ${classItem.teacher.LastName}`.toLowerCase().includes(this.searchTerm.toLowerCase());

/*      const matchesCategory = this.selectedCategory === 'All' || classItem.category === this.selectedCategory;
      const matchesLevel = this.selectedLevel === 'All' || classItem.level === this.selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;*/
    });
  }

  trackByClassId(index: number, classItem: IClass): string {
    return classItem.id;
  }
}
