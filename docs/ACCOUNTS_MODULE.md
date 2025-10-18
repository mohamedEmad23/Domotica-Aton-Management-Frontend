# Accounts Module Documentation

## Module Overview

**Purpose**: User authentication, authorization, and user management

**Key Features**:
- User login/logout
- Session management
- User profile management
- Department-based organization
- CSRF token handling

**Status**: ✅ Fully Implemented

---

## Data Models

### User Model

```python
class User(AbstractUser):
    id = UUIDField (primary_key)
    username = CharField(max_length=150, unique=True)
    email = EmailField(unique=True)  # USERNAME_FIELD
    first_name = CharField(max_length=150)
    last_name = CharField(max_length=150)
    phone = CharField(max_length=20, blank=True)
    department = CharField(max_length=50, choices=DEPARTMENTS, blank=True)
    is_active = BooleanField(default=True)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
```

**Department Choices**:
- `SALES` - Sales
- `TECHNICAL` - Technical Office
- `PMO` - Project Management
- `PROCUREMENT` - Procurement & Supply Chain
- `OPERATIONS` - Operations
- `ADMIN` - Administration

**Properties**:
- `display_name`: Returns full name or username

**Methods**:
- `get_full_name()`: Returns "First Last"

---

## API Endpoints

### Base URL
```
/api/v1/accounts/
```

### Endpoints

#### 1. Login
```http
POST /api/v1/accounts/login/
```

**Authentication**: None (public endpoint)

**Request Body**:
```json
{
  "username": "admin",  // Can be username or email
  "password": "admin123"
}
```

**Response (200 OK)**:
```json
{
  "user": {
    "id": "ec69e89e-03ec-4330-8bbd-6981fc2ce14d",
    "username": "admin",
    "email": "admin@aton.local",
    "first_name": "Admin",
    "last_name": "User",
    "department": "ADMIN",
    "phone": "",
    "display_name": "Admin User",
    "is_active": true
  }
}
```

**Response (401 Unauthorized)**:
```json
{
  "detail": "Invalid credentials"
}
```

**Side Effects**:
- Creates session cookie
- Sets CSRF token cookie

---

#### 2. Logout
```http
POST /api/v1/accounts/logout/
```

**Authentication**: Required

**Headers**:
```
X-CSRFToken: <csrf_token>
```

**Response (200 OK)**:
```json
{
  "detail": "Successfully logged out"
}
```

**Side Effects**:
- Clears session cookie

---

#### 3. Get Current User
```http
GET /api/v1/accounts/me/
```

**Authentication**: Required

**Response (200 OK)**:
```json
{
  "id": "ec69e89e-03ec-4330-8bbd-6981fc2ce14d",
  "username": "admin",
  "email": "admin@aton.local",
  "first_name": "Admin",
  "last_name": "User",
  "department": "ADMIN",
  "phone": "",
  "display_name": "Admin User",
  "is_active": true
}
```

**Response (401 Unauthorized)**:
```json
{
  "detail": "Authentication credentials were not provided."
}
```

---

#### 4. Get CSRF Token
```http
GET /api/v1/accounts/csrf/
```

**Authentication**: None (public endpoint)

**Response (200 OK)**:
```json
{
  "csrfToken": "tiywbvWywIOlayfJBLjpirPypZ9VArarTyawIg9Om27jImpZpxFhF3ummvPZZij4"
}
```

---

## TypeScript Interfaces

```typescript
// src/types/accounts.ts

export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  department: Department;
  phone: string;
  display_name: string;
  is_active: boolean;
}

export type Department = 
  | 'SALES'
  | 'TECHNICAL'
  | 'PMO'
  | 'PROCUREMENT'
  | 'OPERATIONS'
  | 'ADMIN'
  | '';

export const DEPARTMENT_LABELS: Record<Department, string> = {
  'SALES': 'Sales',
  'TECHNICAL': 'Technical Office',
  'PMO': 'Project Management',
  'PROCUREMENT': 'Procurement & Supply Chain',
  'OPERATIONS': 'Operations',
  'ADMIN': 'Administration',
  '': 'Not Assigned',
};

export interface LoginRequest {
  username: string;  // Can be username or email
  password: string;
}

export interface LoginResponse {
  user: User;
}

export interface CSRFTokenResponse {
  csrfToken: string;
}
```

---

## Frontend Implementation

### 1. Auth Service

```typescript
// src/services/authService.ts
import api from './api';
import { User, LoginResponse, CSRFTokenResponse } from '../types/accounts';

export const authService = {
  /**
   * Login user with username/email and password
   */
  async login(username: string, password: string): Promise<User> {
    const response = await api.post<LoginResponse>('/accounts/login/', {
      username,
      password,
    });
    return response.data.user;
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    await api.post('/accounts/logout/');
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/accounts/me/');
    return response.data;
  },

  /**
   * Get CSRF token (optional - token is in cookie)
   */
  async getCsrfToken(): Promise<string> {
    const response = await api.get<CSRFTokenResponse>('/accounts/csrf/');
    return response.data.csrfToken;
  },
};
```

### 2. Auth Store (Zustand)

```typescript
// src/stores/authStore.ts
import { create } from 'zustand';
import { authService } from '../services/authService';
import { User } from '../types/accounts';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authService.login(username, password);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Login failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.logout();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const user = await authService.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
```

### 3. Login Page Component

```typescript
// src/pages/auth/LoginPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      // Navigation handled by useEffect
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-3xl font-bold text-center">
            Aton Management Platform
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username or Email
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="admin"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          <p>Default credentials:</p>
          <p className="font-mono">admin / admin123</p>
        </div>
      </div>
    </div>
  );
}
```

### 4. Protected Route Component

```typescript
// src/components/auth/ProtectedRoute.tsx
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
```

### 5. User Profile Component

```typescript
// src/components/auth/UserProfile.tsx
import { useAuthStore } from '../../stores/authStore';
import { DEPARTMENT_LABELS } from '../../types/accounts';

export function UserProfile() {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">
          {user.display_name}
        </p>
        <p className="text-xs text-gray-500">
          {DEPARTMENT_LABELS[user.department]}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
      >
        Logout
      </button>
    </div>
  );
}
```

---

## Business Logic

### Authentication Flow

1. **Login**:
   - User submits username/email and password
   - Backend validates credentials
   - Backend creates session and returns user data
   - Frontend stores user in state
   - Session cookie stored automatically by browser

2. **Session Verification**:
   - On app load, call `/accounts/me/`
   - If successful, user is authenticated
   - If 401, redirect to login

3. **Logout**:
   - Call `/accounts/logout/` with CSRF token
   - Backend clears session
   - Frontend clears user state
   - Redirect to login page

### CSRF Token Handling

- CSRF token is stored in `csrftoken` cookie
- Must be included in `X-CSRFToken` header for POST/PUT/DELETE requests
- GET requests don't need CSRF token
- Token is automatically set by Django on first request

---

## Integration Points

### Used By:
- All modules (authentication required)

### Dependencies:
- None (base module)

---

## Testing

### Manual Testing:

```bash
# 1. Test login
curl -X POST http://localhost:8000/api/v1/accounts/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt

# 2. Test current user
curl http://localhost:8000/api/v1/accounts/me/ \
  -b cookies.txt

# 3. Test logout
CSRF_TOKEN=$(grep csrftoken cookies.txt | awk '{print $7}')
curl -X POST http://localhost:8000/api/v1/accounts/logout/ \
  -b cookies.txt \
  -H "X-CSRFToken: $CSRF_TOKEN"
```

### Frontend Testing:

```typescript
// Test login flow
describe('Authentication', () => {
  it('should login successfully', async () => {
    const { login } = useAuthStore.getState();
    await login('admin', 'admin123');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it('should handle invalid credentials', async () => {
    const { login } = useAuthStore.getState();
    await expect(login('wrong', 'wrong')).rejects.toThrow();
  });
});
```

---

## Common Issues & Solutions

### Issue: CORS Error
**Solution**: Verify `withCredentials: true` in axios config

### Issue: CSRF Token Missing
**Solution**: Check that cookie exists and is being sent in header

### Issue: 401 on /me/ endpoint
**Solution**: Session cookie not being sent - check `withCredentials`

### Issue: Login succeeds but user not persisted
**Solution**: Check that session cookie is being stored by browser

---

## Next Steps

After implementing the Accounts module:

1. ✅ Test login/logout flow
2. ✅ Verify session persistence
3. ✅ Test protected routes
4. ➡️ Move to [Inventory Module](02-INVENTORY-MODULE.md)
