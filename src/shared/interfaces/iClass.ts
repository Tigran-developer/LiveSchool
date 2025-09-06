
export interface IClass {
  id: string;
  title: string;
  description: string;
  subject: string;
  teacherId: string;
  startTime: string;
  endTime: string;
  durationInMinutes: number;
  maxParticipants: number;
  price: number;
  difficultyId: number;
  isOnline: boolean;
  status: string
  isRecurring: boolean;
  zoomLink: string
  notes: string;
}

// Interface for creating a new class (matches API request body)
export interface ICreateClassRequest {
  title: string;
  description: string;
  subject: string;
  teacherId: string;
  startTime: string; // datetime
  endTime: string; // datetime
  durationInMinutes: number;
  maxParticipants: number;
  price: number; // decimal
  difficultyId: number;
  isOnline: boolean;
}

// Interface for updating an existing class
export interface IUpdateClassRequest extends Partial<ICreateClassRequest> {
  id: string;
}

// Interface for booking a class
export interface IBookClassRequest {
  classId: string;
  studentId: string;
}
