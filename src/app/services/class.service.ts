import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IClassDetails } from '../shared/interfaces/iClass-details';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private classesSubject = new BehaviorSubject<IClassDetails[]>([]);

  constructor(private http: HttpClient) {
    this.loadMockData();
  }

  private loadMockData(): void {
    const mockClasses: IClassDetails[] = [
      {
        id: '1',
        title: 'Advanced Calculus',
        description: 'Advanced calculus concepts and applications including derivatives, integrals, and series.',
        startTime: new Date('2024-12-20T10:00:00').toISOString(),
        durationInMinutes: 90,
        status: 'upcoming',
        teacher: { id: '1', firstName: 'John', lastName: 'Doe' },
        maxStudents: 20,
        enrolledStudents: 15,
        subject: 'Mathematics',
        level: 'advanced',
        zoomLink: 'https://zoom.us/j/123456789'
      },
      {
        id: '2',
        title: 'Physics Fundamentals',
        description: 'Basic physics principles and experiments covering mechanics, thermodynamics, and waves.',
        startTime: new Date('2024-12-21T14:00:00').toISOString(),
        durationInMinutes: 60,
        status: 'upcoming',
        teacher: { id: '2', firstName: 'Jane', lastName: 'Smith' },
        maxStudents: 25,
        enrolledStudents: 18,
        subject: 'Physics',
        level: 'beginner',
        zoomLink: 'https://zoom.us/j/987654321'
      },
      {
        id: '3',
        title: 'Chemistry Lab',
        description: 'Hands-on chemistry experiments and safety protocols for laboratory work.',
        startTime: new Date('2024-12-22T16:00:00').toISOString(),
        durationInMinutes: 120,
        status: 'upcoming',
        teacher: { id: '3', firstName: 'Mike', lastName: 'Johnson' },
        maxStudents: 15,
        enrolledStudents: 12,
        subject: 'Chemistry',
        level: 'intermediate',
        zoomLink: 'https://zoom.us/j/456789123'
      }
    ];

    this.classesSubject.next(mockClasses);
  }

  getClasses(): Observable<IClassDetails[]> {
    // TODO: Replace with actual API call
    // return this.http.get<IClassDetails[]>('/api/classes');
    return this.classesSubject.asObservable();
  }

  getClassById(id: string): Observable<IClassDetails | null> {
    // TODO: Replace with actual API call
    // return this.http.get<IClassDetails>(`/api/classes/${id}`);
    const classes = this.classesSubject.value;
    const foundClass = classes.find(c => c.id === id);
    return of(foundClass || null);
  }

  createClass(classData: Partial<IClassDetails>): Observable<IClassDetails> {
    // TODO: Replace with actual API call
    // return this.http.post<IClassDetails>('/api/classes', classData);
    const newClass: IClassDetails = {
      id: Date.now().toString(),
      title: classData.title || '',
      description: classData.description || '',
      startTime: classData.startTime || new Date().toISOString(),
      durationInMinutes: classData.durationInMinutes || 60,
      status: classData.status || 'upcoming',
      teacher: classData.teacher || { id: '', firstName: '', lastName: '' },
      zoomLink: classData.zoomLink || '',
      maxStudents: classData.maxStudents || 20,
      enrolledStudents: classData.enrolledStudents || 0,
      subject: classData.subject || 'General',
      level: classData.level || 'beginner'
    };

    const currentClasses = this.classesSubject.value;
    this.classesSubject.next([...currentClasses, newClass]);
    
    return of(newClass);
  }

  updateClass(id: string, classData: Partial<IClassDetails>): Observable<IClassDetails> {
    // TODO: Replace with actual API call
    // return this.http.put<IClassDetails>(`/api/classes/${id}`, classData);
    const currentClasses = this.classesSubject.value;
    const updatedClasses = currentClasses.map(c => 
      c.id === id ? { ...c, ...classData } : c
    );
    
    this.classesSubject.next(updatedClasses);
    const updatedClass = updatedClasses.find(c => c.id === id);
    
    if (!updatedClass) {
      throw new Error('Class not found');
    }
    
    return of(updatedClass);
  }

  deleteClass(id: string): Observable<void> {
    // TODO: Replace with actual API call
    // return this.http.delete<void>(`/api/classes/${id}`);
    const currentClasses = this.classesSubject.value;
    const filteredClasses = currentClasses.filter(c => c.id !== id);
    this.classesSubject.next(filteredClasses);
    
    return of(void 0);
  }
}
