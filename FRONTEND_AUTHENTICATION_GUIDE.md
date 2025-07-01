# Frontend Authentication Guide - Chi tiết Authentication ở Frontend

## Tổng quan Frontend Authentication

Frontend sử dụng **React + Zustand** để quản lý authentication state với các thành phần chính:

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Architecture                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │ AuthProvider│    │ AuthStore   │    │ AuthManager │     │
│  │ (Context)   │    │ (Zustand)   │    │ (Class)     │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                   │                   │           │
│         └───────────────────┼───────────────────┘           │
│                             │                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │ useToken-   │    │ API         │    │ Protected   │     │
│  │ Refresh     │    │ Interceptor │    │ Routes      │     │
│  │ (Hook)      │    │ (Axios)     │    │ (Router)    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Chi tiết từng thành phần

### 1. AuthManager (Token Management)

**File:** `src/features/auth/auth.js`

**Chức năng chính:**

- Quản lý Access Token trong localStorage
- Kiểm tra thời gian hết hạn token
- Tự động refresh token khi cần
- Xóa token khi logout

**Các method quan trọng:**

- `setAccessToken(token, expiresIn)` - Lưu token và thời gian hết hạn
- `getAccessToken()` - Lấy token, kiểm tra hết hạn
- `isTokenExpired()` - Kiểm tra token đã hết hạn chưa
- `shouldRefreshToken()` - Kiểm tra có nên refresh không (1 phút trước hết hạn)
- `ensureValidToken()` - Đảm bảo token hợp lệ, tự động refresh nếu cần
- `clearTokens()` - Xóa tất cả token
- `isAuthenticated()` - Kiểm tra user đã đăng nhập chưa

### 2. AuthStore (State Management)

**File:** `src/store/useAuthStore.js`

**Chức năng chính:**

- Quản lý trạng thái authentication toàn app
- Lưu trữ thông tin user
- Xử lý logic đăng nhập/đăng xuất
- Persistent storage với Zustand

**State chính:**

- `user` - Thông tin user hiện tại
- `isAuthenticated` - Trạng thái đã đăng nhập chưa
- `isLoading` - Trạng thái loading

**Actions chính:**

- `login(credentials)` - Xử lý đăng nhập, lưu thông tin user
- `logout()` - Xử lý đăng xuất, xóa thông tin user
- `fetchCurrentUser()` - Lấy thông tin user từ API
- `syncAuth()` - Đồng bộ trạng thái authentication

### 3. AuthProvider (Context Provider)

**File:** `src/providers/AuthProvider.jsx`

**Chức năng chính:**

- Khởi tạo authentication khi app load
- Kiểm tra và refresh token khi cần
- Hiển thị loading khi đang khởi tạo
- Cung cấp authentication context cho toàn app

**Luồng khởi tạo:**

1. Kiểm tra có token trong localStorage không
2. Nếu có token và sắp hết hạn → refresh token
3. Sync thông tin user từ API
4. Set `isInitialized = true` để render app

### 4. Token Refresh Hook

**File:** `src/hooks/useTokenRefresh.js`

**Chức năng chính:**

- Chạy background mỗi 15 giây để kiểm tra token
- Tự động refresh token trước khi hết hạn
- Tự động logout nếu token hết hạn hoặc refresh thất bại
- Dọn dẹp interval khi component unmount

**Logic chính:**

- `checkAndRefreshToken()` - Kiểm tra và refresh token
- `setInterval()` - Chạy mỗi 15 giây
- `clearInterval()` - Cleanup khi unmount

### 5. API Interceptor

**File:** `src/services/api.js`

**Chức năng chính:**

- Tự động thêm access token vào header của mọi request
- Kiểm tra token trước mỗi request
- Xử lý lỗi 401 (unauthorized)
- Redirect về login khi token invalid

**Interceptors:**

- **Request Interceptor**: Thêm token vào Authorization header
- **Response Interceptor**: Xử lý lỗi 401, redirect login

### 6. Authentication API

**File:** `src/features/auth/authAPI.js`

**Chức năng chính:**

- Gọi API authentication từ backend
- Đăng nhập với email/password
- Lấy thông tin user hiện tại
- Placeholder cho social login

**API Functions:**

- `loginWithEmail(credentials)` - Đăng nhập
- `getCurrentUser()` - Lấy thông tin user
- `loginWithGoogle()` - Social login (chưa implement)
- `loginWithFacebook()` - Social login (chưa implement)

### 7. Login Form Component

**File:** `src/features/auth/components/LoginForm.jsx`

**Chức năng chính:**

- Xử lý form đăng nhập
- Quản lý credentials và error state
- Gọi API login thông qua AuthStore
- Redirect sau khi đăng nhập thành công
- Hiển thị loading khi đang đăng nhập

**State Management:**

- `credentials` - Email và password
- `error` - Thông báo lỗi
- `isLoading` - Trạng thái loading từ AuthStore

### 8. Protected Routes

**File:** `src/routes/index.jsx`

**Chức năng chính:**

- Bảo vệ routes yêu cầu authentication
- Kiểm tra role để truy cập admin routes
- Tự động redirect về login nếu chưa đăng nhập
- Bảo vệ admin routes khỏi user thường

**Route Components:**

- `ProtectedRoute` - Bảo vệ routes cần authentication
- `AdminRoute` - Bảo vệ admin routes
- `AppRoutes` - Cấu hình routing chính

### 9. Social Login Component

**File:** `src/features/auth/components/SocialLogin.jsx`

**Chức năng chính:**

- Hiển thị nút đăng nhập Google/Facebook
- Gọi API social login (hiện tại chỉ hiển thị thông báo chưa hỗ trợ)
- Xử lý response từ social login

## Luồng hoạt động chi tiết

### 1. App Startup

```
1. App khởi động
2. AuthProvider được mount
3. useTokenRefresh hook được khởi tạo
4. Kiểm tra localStorage có token không
5. Nếu có token → validate và sync user info
6. Set isInitialized = true → render app
```

### 2. User Login

```
1. User nhập email/password
2. LoginForm gọi useAuthStore.login()
3. AuthStore gọi authAPI.loginWithEmail()
4. API interceptor thêm access token vào header
5. Backend validate và trả về access token
6. AuthStore lưu user info và set isAuthenticated = true
7. AuthManager lưu access token vào localStorage
8. Navigate về home page
```

### 3. API Request

```
1. Component gọi API
2. API interceptor intercept request
3. AuthManager.ensureValidToken() kiểm tra token
4. Nếu token sắp hết hạn → gọi refresh API
5. Thêm access token vào Authorization header
6. Gửi request đến backend
7. Backend validate token và xử lý request
```

### 4. Token Refresh

```
1. useTokenRefresh hook chạy mỗi 15 giây
2. Kiểm tra authManager.shouldRefreshToken()
3. Nếu cần refresh → gọi authManager.ensureValidToken()
4. Gửi POST /auth/refresh với refresh token từ cookie
5. Backend validate refresh token và trả về access token mới
6. AuthManager cập nhật access token mới
7. AuthStore.syncAuth() cập nhật user info
```

### 5. User Logout

```
1. User click logout
2. AuthStore.logout() được gọi
3. AuthManager.clearTokens() xóa token khỏi localStorage
4. AuthStore set user = null, isAuthenticated = false
5. Navigate về login page
```

## State Management Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Component     │    │   AuthStore     │    │   AuthManager   │
│                 │    │   (Zustand)     │    │   (Class)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │ 1. login()            │                       │
         │──────────────────────▶│                       │
         │                       │ 2. API call           │
         │                       │──────────────────────▶│
         │                       │◀──────────────────────│
         │                       │ 3. setState()         │
         │ 4. state updated      │                       │
         │◀──────────────────────│                       │
```

## Tương tác giữa các thành phần

### AuthManager ↔ AuthStore

- **AuthStore** sử dụng **AuthManager** để quản lý token
- **AuthManager** cung cấp các method để kiểm tra, lưu, xóa token
- **AuthStore** gọi `authManager.clearTokens()` khi logout

### AuthProvider ↔ useTokenRefresh

- **AuthProvider** mount **useTokenRefresh** hook
- **useTokenRefresh** chạy background để kiểm tra token
- Cả hai đều sử dụng **AuthStore** để thao tác với state

### API Interceptor ↔ AuthManager

- **API Interceptor** gọi `authManager.ensureValidToken()` trước mỗi request
- **AuthManager** tự động refresh token nếu cần
- **API Interceptor** xử lý lỗi 401 và gọi `authManager.clearTokens()`

### Protected Routes ↔ AuthStore

- **Protected Routes** sử dụng `useAuthStore` để kiểm tra authentication
- `isAuthenticated` state quyết định có cho phép access không
- `user.role` quyết định có cho phép access admin routes không

## Best Practices

### 1. Token Management

- **Access Token**: Lưu trong localStorage, thời gian sống ngắn (15 phút)
- **Refresh Token**: Lưu trong HttpOnly cookie, thời gian sống dài (7 ngày)
- **Auto Refresh**: Tự động refresh trước khi hết hạn (1 phút)
- **Token Cleanup**: Xóa token khi logout hoặc refresh thất bại

### 2. State Management

- **Single Source of Truth**: AuthStore là nơi duy nhất quản lý auth state
- **Persistent Storage**: Lưu state vào localStorage với Zustand persist
- **Reactive Updates**: Component tự động re-render khi state thay đổi

### 3. Error Handling

- **Graceful Degradation**: Xử lý lỗi một cách mượt mà
- **User Feedback**: Hiển thị thông báo lỗi rõ ràng
- **Auto Recovery**: Tự động thử lại khi có lỗi network

### 4. Security

- **HttpOnly Cookies**: Refresh token không thể truy cập bằng JavaScript
- **Token Validation**: Kiểm tra token trước mỗi request
- **Auto Logout**: Tự động logout khi token invalid
- **Role-based Access**: Kiểm tra role để truy cập admin routes

## Troubleshooting

### 1. Token không được lưu

- Kiểm tra localStorage có bị disable không
- Kiểm tra AuthManager.setAccessToken() có được gọi không
- Kiểm tra có lỗi JavaScript nào không

### 2. Auto refresh không hoạt động

- Kiểm tra useTokenRefresh hook có được mount không
- Kiểm tra interval có được clear đúng cách không
- Kiểm tra authManager.shouldRefreshToken() logic

### 3. API request bị 401

- Kiểm tra access token có được thêm vào header không
- Kiểm tra token có hợp lệ không
- Kiểm tra backend có validate token đúng không
- Kiểm tra CORS configuration

### 4. User info không được sync

- Kiểm tra AuthStore.syncAuth() có được gọi không
- Kiểm tra API /auth/me có trả về đúng data không
- Kiểm tra network connection

### 5. Protected routes không hoạt động

- Kiểm tra isAuthenticated state có đúng không
- Kiểm tra user.role có đúng không
- Kiểm tra route configuration

## Performance Considerations

### 1. Token Refresh Optimization

- Chỉ refresh khi thực sự cần thiết (1 phút trước hết hạn)
- Sử dụng interval thay vì setTimeout để tránh memory leak
- Cleanup interval khi component unmount

### 2. State Updates

- Chỉ update state khi thực sự cần thiết
- Sử dụng Zustand để tối ưu re-renders
- Tránh unnecessary API calls

### 3. Bundle Size

- Lazy load authentication components
- Tree-shaking unused authentication code
- Optimize imports
