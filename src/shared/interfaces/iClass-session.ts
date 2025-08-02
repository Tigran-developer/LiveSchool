export interface IClassSession {
  id: number;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  pupilIds: string[];
  pupilNames: string[];
  date: string;
  duration: number; // in minutes
  zoomLink: string;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  recurring?: 'none' | 'weekly' | 'monthly';
  createdAt: string;
}
