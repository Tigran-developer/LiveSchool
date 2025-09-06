import {ApiPath} from './api-path';

export const sidebarItems = [
  { icon: '📚', label: 'Booked Classes', route: ApiPath.student + ApiPath.booked_classes, role: 'STUDENT' },
  { icon: '🔍', label: 'All Classes', route: ApiPath.student + ApiPath.browse_classes, role: 'STUDENT' },
  { icon: '💳', label: 'Subscription', route: ApiPath.student + ApiPath.subscription, role: 'STUDENT' },
  { icon: '📊', label: 'Dashboard', route: ApiPath.admin, role: 'ADMIN' },
  { icon: '👨‍🏫', label: 'Teachers', route: ApiPath.admin + ApiPath.teachers, role: 'ADMIN' },
  { icon: '👩‍🎓', label: 'Students', route: ApiPath.admin + ApiPath.students, role: 'ADMIN' },
  { icon: '📚', label: 'Classes', route: ApiPath.admin + ApiPath.classes, role: 'ADMIN' }]
