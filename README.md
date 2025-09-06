# LiveSchool - Angular Frontend Application

A comprehensive Angular-based frontend application for the LiveSchool online learning platform, featuring role-based authentication, class management, and modern UI components.

## 🚀 Features

### 🔐 Authentication & Authorization
- **JWT-based Authentication**: Secure login with JWT tokens
- **Role-based Access Control**: Admin, Teacher, and Student roles
- **Password Management**: 
  - Password visibility toggle (eye icon) in all forms
  - Forgot password functionality
  - Password reset with email confirmation
  - Strong password validation
- **User Registration**: Support for both Teacher and Student accounts
- **Email Confirmation**: Email verification for new accounts

### 🎓 Class Management
- **Class Browsing**: Students can browse available classes
- **Class Booking**: Students can enroll in classes
- **Class Management**: Teachers and Admins can create, edit, and delete classes
- **Class Details**: Comprehensive class information display
- **Real-time Updates**: Live data from API (no mock data)

### 👥 User Management
- **Student Management**: Admin tools for managing student accounts
- **Teacher Management**: Admin tools for managing teacher accounts
- **User Profiles**: Detailed user information and settings
- **Role Assignment**: Flexible role management system

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first responsive layout
- **Material Design**: Clean, modern interface components
- **Password Visibility**: Eye icon toggles for all password fields
- **Form Validation**: Real-time validation with user feedback
- **Loading States**: Smooth loading indicators and transitions
- **Error Handling**: User-friendly error messages and notifications

## 🛠️ Technology Stack

- **Framework**: Angular 19.1.4
- **Language**: TypeScript
- **Styling**: SCSS with Tailwind CSS
- **State Management**: RxJS Observables and BehaviorSubjects
- **HTTP Client**: Angular HttpClient with interceptors
- **Internationalization**: ngx-translate for multi-language support
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## 📋 Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher
- **Angular CLI**: Version 19.1.4 or higher
- **LiveSchool API**: Backend API running and accessible

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd UI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Update `src/enviroments/environment.ts` with your API configuration:

```typescript
export const environment = {
  production: false,
  NG_APP_API_HOST: 'https://your-api-domain.com/api',
  NG_APP_HOST: 'https://your-api-domain.com',
  version: '1.0.0',
  REGISTERED_USER_EMAIL: 'your-email@domain.com',
  REGISTERED_USER_PASSWORD: 'your-password',
  COMMAND: 'start smtp4dev'
};
```

### 4. Start Development Server
```bash
ng serve
```

Navigate to `http://localhost:4200/` to view the application.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── admin-dashboard/          # Admin dashboard components
│   │   │   ├── student-dashboard/        # Student dashboard components
│   │   │   └── teacher-dashboard/        # Teacher dashboard components
│   │   ├── notifications/                # Notification system
│   │   ├── sidebar/                      # Navigation sidebar
│   │   └── signInSignUp/                 # Authentication components
│   │       ├── login/                    # Login form with password toggle
│   │       ├── register/                 # Registration form with password toggle
│   │       ├── forgot-password/          # Password recovery
│   │       └── reset-password/           # Password reset with toggle
│   ├── services/                         # API service layer
│   │   ├── auth.service.ts              # Authentication & authorization
│   │   ├── class.service.ts             # Class management
│   │   ├── user.service.ts              # User management
│   │   ├── student.service.ts           # Student operations
│   │   ├── teacher.service.ts           # Teacher operations
│   │   └── data.service.ts              # General data operations
│   └── app.routes.ts                    # Application routing
├── shared/
│   ├── components/                       # Reusable UI components
│   │   ├── class-card/                   # Class display component
│   │   ├── u-confirm-dialog/             # Confirmation dialogs
│   │   ├── u-date-input/                 # Date input component
│   │   ├── u-paginator/                  # Pagination component
│   │   ├── u-search-input/               # Search input component
│   │   ├── u-select/                     # Select dropdown component
│   │   └── u-toggle-switch/              # Toggle switch component
│   ├── constants/                        # Application constants
│   │   ├── api-path.ts                   # API endpoint definitions
│   │   ├── ClassStatus.ts                # Class status enums
│   │   ├── patterns.ts                   # Validation patterns
│   │   ├── Ranks.ts                      # User rank definitions
│   │   └── sidebarItems.ts               # Navigation items
│   ├── directives/                       # Custom directives
│   │   ├── u-pattern.directive.ts        # Pattern validation
│   │   ├── u-required.directive.ts       # Required field validation
│   │   └── u-unique.directive.ts         # Unique value validation
│   ├── guards/                           # Route guards
│   │   └── login-can-match.guard.ts      # Authentication guard
│   ├── interceptors/                     # HTTP interceptors
│   │   ├── app-url.interceptor.ts        # URL transformation
│   └── interfaces/                       # TypeScript interfaces
└── assets/                               # Static assets
```

## 🔌 API Integration

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/authenticate` - User login
- `POST /api/auth/forgot-password` - Password recovery
- `POST /api/auth/reset-password` - Password reset
- `GET /api/auth/confirm-email` - Email confirmation
- `GET /api/auth/check-email-exist` - Email existence check

### Class Management Endpoints
- `GET /api/classes/browse_classes` - Available classes for students
- `GET /api/classes/booked_classes` - Enrolled classes
- `GET /api/classes/class/{id}` - Class details
- `POST /api/classes/add_class` - Create new class
- `PUT /api/classes/{id}` - Update class
- `DELETE /api/classes/{id}` - Delete class
- `POST /api/classes/book_class` - Book class for student

### User Management Endpoints
- `GET /api/users` - Get all users (Admin only)
- `GET /api/pupils` - Get all students
- `GET /api/teachers` - Get all teachers

## 🔐 Authentication System

### Role-based Access Control
The application implements a comprehensive role-based access control system:

- **Admin Role**: Full access to all features and data
- **Teacher Role**: Access to class management and student data
- **Student Role**: Access to class browsing and personal data

### Password Security Features
- **Password Visibility Toggle**: Eye icon in all password fields
- **Strong Password Validation**: Enforced password requirements
- **Secure Storage**: JWT tokens stored securely
- **Session Management**: Automatic token refresh and logout

### User Registration Flow
1. User fills registration form with role selection
2. Email confirmation sent to user
3. User confirms email address
4. Account activated and ready for login

## 🎨 UI Components

### Password Fields
All password input fields feature:
- **Eye Icon Toggle**: Click to show/hide password
- **Real-time Validation**: Immediate feedback on password strength
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Responsive Design**: Works on all device sizes

### Form Components
- **Validation Directives**: Custom validation for forms
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during operations
- **Responsive Layout**: Mobile-first design approach

### Dashboard Components
- **Admin Dashboard**: User management, system overview
- **Teacher Dashboard**: Class management, student overview
- **Student Dashboard**: Class browsing, enrollment management

## 🚀 Development

### Development Server
```bash
ng serve
```
- **Port**: 4200 (configurable)
- **Hot Reload**: Automatic browser refresh on file changes
- **Source Maps**: Full debugging support

### Building for Production
```bash
ng build --configuration production
```
- **Optimization**: Code minification and bundling
- **Tree Shaking**: Unused code elimination
- **Performance**: Optimized for production deployment

### Code Generation
```bash
# Generate new component
ng generate component component-name

# Generate new service
ng generate service service-name

# Generate new interface
ng generate interface interface-name
```

## 🧪 Testing

### Unit Tests
```bash
ng test
```
- **Framework**: Karma + Jasmine
- **Coverage**: Code coverage reporting
- **Watch Mode**: Continuous testing during development

### End-to-End Tests
```bash
ng e2e
```
- **Framework**: Playwright (configurable)
- **Browser Testing**: Cross-browser compatibility
- **User Scenarios**: Complete user journey testing

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Breakpoints**: Tailwind CSS responsive utilities
- **Touch Support**: Optimized for touch devices
- **Progressive Enhancement**: Core functionality on all devices
- **Accessibility**: WCAG 2.1 AA compliance

## 🌐 Internationalization

Multi-language support using ngx-translate:
- **Supported Languages**: English, Amharic
- **Translation Files**: JSON-based translation system
- **Dynamic Switching**: Runtime language switching
- **Fallback Support**: Default language fallbacks

## 🔧 Configuration

### Environment Variables
```typescript
// environment.ts
export const environment = {
  production: false,
  NG_APP_API_HOST: 'https://localhost:7239/api',
  NG_APP_HOST: 'https://localhost:7239',
  version: '1.0.0'
};
```

### API Configuration
```typescript
// api-path.ts
export const ApiPath = {
  auth: '/api/auth',
  classes: '/api/classes',
  users: '/api/users',
  // ... more endpoints
};
```

## 📊 Performance Features

- **Lazy Loading**: Route-based code splitting
- **Change Detection**: OnPush strategy for better performance
- **Memory Management**: Proper subscription cleanup
- **Bundle Optimization**: Tree shaking and code splitting
- **Caching**: HTTP response caching strategies

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **HTTPS Only**: Secure communication protocols
- **Input Validation**: Server-side and client-side validation
- **XSS Protection**: Angular built-in XSS protection
- **CSRF Protection**: Cross-site request forgery prevention

## 🚨 Error Handling

- **Global Error Interceptor**: Centralized error handling
- **User-friendly Messages**: Clear error communication
- **Retry Mechanisms**: Automatic retry for failed requests
- **Fallback UI**: Graceful degradation on errors
- **Logging**: Comprehensive error logging

## 📈 Monitoring & Analytics

- **Performance Monitoring**: Core Web Vitals tracking
- **Error Tracking**: Error rate and type monitoring
- **User Analytics**: User behavior and engagement metrics
- **API Monitoring**: Response time and success rate tracking

## 🔄 Deployment

### Build Process
```bash
# Install dependencies
npm install

# Build for production
ng build --configuration production

# Test build locally
ng serve --configuration production
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, AWS S3
- **Container Deployment**: Docker containers
- **Server Deployment**: Traditional web servers
- **CDN Integration**: Content delivery network optimization

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting consistency
- **Angular Style Guide**: Official Angular best practices

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev/)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [RxJS Documentation](https://rxjs.dev/)

## 🆘 Support

For support and questions:
- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue in the repository
- **Development Team**: Contact the development team directly
- **Community**: Angular community forums and Discord

## 📄 License

This project is licensed under the MIT License.

## 🔄 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed information about recent changes and updates.

---

**LiveSchool Angular Frontend** - Empowering online education with modern web technology.
