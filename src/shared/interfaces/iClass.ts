
export interface IClass {
  id: string,
  title: string,
  description: string,
  startTime: string,
  durationInMinutes: number,
  isRecurring: boolean,
  recurrencePattern: number,
  zoomLink: string,
  maxParticipants: number,
  status: string,
  teacherId: string
  adminId: string
}
