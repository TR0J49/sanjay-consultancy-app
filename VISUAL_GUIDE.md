# 🎨 Visual Guide - User Registration System

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  http://localhost:5173                                   │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  React Application (Vite)                         │  │  │
│  │  │  ┌──────────────┐  ┌──────────────┐              │  │  │
│  │  │  │ Registration │  │ Admin Login  │              │  │  │
│  │  │  │    Form      │  │    Page      │              │  │  │
│  │  │  └──────────────┘  └──────────────┘              │  │  │
│  │  │  ┌──────────────────────────────────────────┐    │  │  │
│  │  │  │   Admin Dashboard                        │    │  │  │
│  │  │  │   - Search Users                         │    │  │  │
│  │  │  │   - View Details                         │    │  │  │
│  │  │  │   - Download CV                          │    │  │  │
│  │  │  └──────────────────────────────────────────┘    │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/JSON
                              │ (Axios)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER                               │
│  http://localhost:5000                                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Express.js Application                                 │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  API Routes                                        │  │  │
│  │  │  ├─ POST /api/users (Register)                   │  │  │
│  │  │  ├─ GET /api/users/search (Search)               │  │  │
│  │  │  ├─ GET /api/users/:id (Details)                 │  │  │
│  │  │  ├─ GET /api/users/:id/cv (Download)             │  │  │
│  │  │  └─ POST /api/admin/login (Auth)                 │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Multer (File Upload)                             │  │  │
│  │  │  ├─ Photos (2MB max)                              │  │  │
│  │  │  └─ CVs (10MB max)                                │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Mongoose
                              │ (MongoDB Driver)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE                                   │
│  MongoDB (Local or Atlas)                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Database: user-registration                            │  │
│  │  Collection: users                                       │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Documents                                         │  │  │
│  │  │  {                                                 │  │  │
│  │  │    _id: ObjectId,                                 │  │  │
│  │  │    name: String,                                  │  │  │
│  │  │    passportNumber: String (unique),               │  │  │
│  │  │    dateOfBirth: Date,                             │  │  │
│  │  │    designation: String,                           │  │  │
│  │  │    ppType: String,                                │  │  │
│  │  │    mobileNumber: String,                          │  │  │
│  │  │    village: String,                               │  │  │
│  │  │    photoPath: String,                             │  │  │
│  │  │    cvPath: String,                                │  │  │
│  │  │    remark: String,                                │  │  │
│  │  │    createdAt: Date,                               │  │  │
│  │  │    updatedAt: Date                                │  │  │
│  │  │  }                                                 │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ File System
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FILE STORAGE                                 │
│  backend/uploads/                                               │
│  ├─ photos/                                                     │
│  │  └─ photo-1698500000000-123456789.jpg                       │
│  └─ cvs/                                                        │
│     └─ cv-1698500000000-123456789.pdf                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

### User Registration Flow
```
┌─────────────────────────────────────────────────────────────────┐
│ 1. User fills registration form                                 │
│    - 10 text fields                                              │
│    - Photo file                                                  │
│    - CV file                                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. Client-side validation                                       │
│    - Check all fields filled                                    │
│    - Check file types                                           │
│    - Check file sizes                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Submit FormData to backend                                   │
│    POST /api/users                                              │
│    Content-Type: multipart/form-data                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. Server-side validation                                       │
│    - Validate all fields                                        │
│    - Check file types with Multer                               │
│    - Check file sizes                                           │
│    - Check passport uniqueness                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. Save files to disk                                           │
│    - Photo → backend/uploads/photos/                            │
│    - CV → backend/uploads/cvs/                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. Save user data to MongoDB                                    │
│    - Store all fields                                           │
│    - Store file paths                                           │
│    - Add timestamps                                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. Return success response                                      │
│    - User ID                                                    │
│    - All user data                                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. Show success message to user                                 │
│    - "Registration successful!"                                 │
│    - Redirect to home page                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Admin Login & Search Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. Admin enters credentials                                     │
│    - Username: Kuldeep R                                        │
│    - Password: kuldeep@123                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. Submit login request                                         │
│    POST /api/admin/login                                        │
│    { username, password }                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Validate credentials                                         │
│    - Check username matches                                     │
│    - Check password matches                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. Generate JWT token                                           │
│    - Payload: { username, role }                                │
│    - Expires: 24 hours                                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. Return token to client                                       │
│    { message, token }                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. Store token in localStorage                                  │
│    - Key: adminToken                                            │
│    - Value: JWT token                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. Redirect to dashboard                                        │
│    - Access /admin/dashboard                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. Search for users                                             │
│    - Enter name or mobile                                       │
│    - Click Search                                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 9. Submit search request                                        │
│    GET /api/users/search?q=John                                 │
│    Header: Authorization: Bearer <token>                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 10. Verify JWT token                                            │
│     - Check token validity                                      │
│     - Check token expiration                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 11. Query MongoDB                                               │
│     - Search by name (case-insensitive)                         │
│     - OR search by mobile                                       │
│     - Use text index for performance                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 12. Return search results                                       │
│     - Array of matching users                                   │
│     - Basic info (name, mobile, etc.)                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 13. Display results in dashboard                                │
│     - List of users                                             │
│     - Click to view details                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 14. View user details                                           │
│     - Fetch full user record                                    │
│     - Display photo preview                                     │
│     - Show download CV button                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 User Interface Layout

### Registration Page
```
┌─────────────────────────────────────────────────────────┐
│  User Registration                                      │
│  Fill in your details to register                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Name *              │  Passport Number *              │
│  [________________]  │  [________________]              │
│                                                         │
│  Date of Birth *     │  Designation *                  │
│  [________________]  │  [________________]              │
│                                                         │
│  PP Type *           │  Mobile Number *                │
│  [________________]  │  [________________]              │
│                                                         │
│  Village/Town *      │  Remark                         │
│  [________________]  │  [________________]              │
│                                                         │
│  Photo (JPG/PNG) *   │  CV (PDF/DOC/DOCX) *            │
│  [Choose File]       │  [Choose File]                  │
│  ✓ photo.jpg         │  ✓ resume.pdf                   │
│                                                         │
│  [Register]          [Admin Login]                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Admin Login Page
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                   Admin Login                          │
│         Enter your credentials to access the           │
│                    dashboard                           │
│                                                         │
│  Username                                              │
│  [________________]                                    │
│                                                         │
│  Password                                              │
│  [________________]                                    │
│                                                         │
│           [Login]                                      │
│                                                         │
│  Demo Credentials:                                     │
│  Username: Kuldeep R                                   │
│  Password: kuldeep@123                                 │
│                                                         │
│  ← Back to Registration                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Admin Dashboard
```
┌─────────────────────────────────────────────────────────────────┐
│  Admin Dashboard                                    [Logout]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Search Users                                                   │
│  [Search by name or mobile...] [Search]                        │
│                                                                 │
├──────────────────────────────┬──────────────────────────────────┤
│  Results (5)                 │  User Details                    │
│                              │                                  │
│  ┌────────────────────────┐  │  ┌──────────────────────────┐   │
│  │ John Doe               │  │  │ [Photo Preview]          │   │
│  │ 9876543210             │  │  │ (Responsive Image)       │   │
│  └────────────────────────┘  │  └──────────────────────────┘   │
│                              │                                  │
│  ┌────────────────────────┐  │  Name: John Doe                 │
│  │ Jane Smith             │  │  Passport: AB123456             │
│  │ 9876543211             │  │  DOB: 1990-01-15                │
│  └────────────────────────┘  │  Designation: Engineer          │
│                              │  PP Type: Regular               │
│  ┌────────────────────────┐  │  Mobile: 9876543210             │
│  │ Bob Johnson            │  │  Village: New York              │
│  │ 9876543212             │  │  Remark: Good candidate         │
│  └────────────────────────┘  │                                 │
│                              │  [📥 Download CV]               │
│  Select a user from          │                                 │
│  the results to view         │                                 │
│  details                     │                                 │
│                              │                                 │
└──────────────────────────────┴──────────────────────────────────┘
```

---

## 🔄 Request/Response Examples

### Register User Request
```
POST /api/users
Content-Type: multipart/form-data

name=John Doe
passportNumber=AB123456
dateOfBirth=1990-01-15
designation=Engineer
ppType=Regular
mobileNumber=9876543210
village=New York
remark=Good candidate
photo=[binary file]
cv=[binary file]
```

### Register User Response (Success)
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "passportNumber": "AB123456",
    "dateOfBirth": "1990-01-15T00:00:00.000Z",
    "designation": "Engineer",
    "ppType": "Regular",
    "mobileNumber": "9876543210",
    "village": "New York",
    "photoPath": "photo-1698500000000-123456789.jpg",
    "cvPath": "cv-1698500000000-123456789.pdf",
    "remark": "Good candidate",
    "createdAt": "2024-10-28T10:30:00.000Z",
    "updatedAt": "2024-10-28T10:30:00.000Z"
  }
}
```

### Search Users Request
```
GET /api/users/search?q=John
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Search Users Response
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "mobileNumber": "9876543210",
    "designation": "Engineer",
    "photoPath": "photo-1698500000000-123456789.jpg"
  }
]
```

---

## 📱 Responsive Design

```
Desktop (1200px+)          Tablet (768px-1199px)      Mobile (320px-767px)
┌──────────────────┐      ┌──────────────────┐       ┌──────────────┐
│ [Logo] [Menu]    │      │ [Logo]           │       │ [☰] [Logo]   │
├──────────────────┤      ├──────────────────┤       ├──────────────┤
│ Form (2 columns) │      │ Form (1 column)  │       │ Form (1 col) │
│ [Field] [Field]  │      │ [Field]          │       │ [Field]      │
│ [Field] [Field]  │      │ [Field]          │       │ [Field]      │
│ [File] [File]    │      │ [File]           │       │ [File]       │
│ [Button]         │      │ [File]           │       │ [Button]     │
└──────────────────┘      │ [Button]         │       └──────────────┘
                          └──────────────────┘

Dashboard (1200px+)        Dashboard (768px-1199px)   Dashboard (Mobile)
┌──────────────────────┐   ┌──────────────────┐       ┌──────────────┐
│ [Search] [Logout]    │   │ [Search] [Logout]│       │ [Search]     │
├──────────────────────┤   ├──────────────────┤       ├──────────────┤
│ Results │ Details    │   │ Results          │       │ Results      │
│ [User1] │ [Photo]    │   │ [User1]          │       │ [User1]      │
│ [User2] │ Name: ...  │   │ [User2]          │       │ [User2]      │
│ [User3] │ Details... │   │ [User3]          │       │ [User3]      │
│         │ [Download] │   │ (Tap to expand)  │       │ (Tap to view)│
└──────────────────────┘   └──────────────────┘       └──────────────┘
```

---

## 🔐 Security Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. User submits credentials                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. Server validates credentials                                 │
│    - Username matches ADMIN_USERNAME                            │
│    - Password matches ADMIN_PASSWORD                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Generate JWT token                                           │
│    - Sign with JWT_SECRET                                       │
│    - Set expiration (24 hours)                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. Send token to client                                         │
│    - Stored in localStorage                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. For each API request                                         │
│    - Include token in Authorization header                      │
│    - Format: Bearer <token>                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. Server verifies token                                        │
│    - Verify signature with JWT_SECRET                           │
│    - Check expiration                                           │
│    - Extract user info                                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. Grant access or deny                                         │
│    - Valid token → Process request                              │
│    - Invalid token → Return 401 Unauthorized                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema

```
User Collection
├─ _id (ObjectId) - Primary Key
├─ name (String) - Required
├─ passportNumber (String) - Required, Unique
├─ dateOfBirth (Date) - Required
├─ designation (String) - Required
├─ ppType (String) - Required
├─ mobileNumber (String) - Required
├─ village (String) - Required
├─ photoPath (String) - Required
├─ cvPath (String) - Required
├─ remark (String) - Optional
├─ createdAt (Date) - Auto
└─ updatedAt (Date) - Auto

Indexes:
├─ passportNumber (Unique)
└─ name, mobileNumber (Text Index)
```

---

**Last Updated**: October 28, 2025
**Status**: ✅ Complete
