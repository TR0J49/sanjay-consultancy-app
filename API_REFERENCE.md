# API Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication
Admin routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. User Registration

**POST** `/users`

Register a new user with photo and CV uploads.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  ```
  name: string (required)
  passportNumber: string (required, unique)
  dateOfBirth: string (required, ISO date)
  designation: string (required)
  ppType: string (required)
  mobileNumber: string (required)
  village: string (required)
  remark: string (optional)
  photo: file (required, JPG/PNG, max 2MB)
  cv: file (required, PDF/DOC/DOCX, max 10MB)
  ```

**Response (Success):**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "passportNumber": "AB123456",
    "dateOfBirth": "1990-01-15T00:00:00.000Z",
    "designation": "Software Engineer",
    "ppType": "Regular",
    "mobileNumber": "9876543210",
    "village": "New York",
    "photoPath": "photo-1698500000000-123456789.jpg",
    "cvPath": "cv-1698500000000-123456789.pdf",
    "remark": "Excellent candidate",
    "createdAt": "2024-10-28T10:30:00.000Z",
    "updatedAt": "2024-10-28T10:30:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "error": "All fields are required"
}
```

**Status Codes:**
- `201` - User created successfully
- `400` - Validation error or duplicate passport number
- `500` - Server error

---

### 2. Search Users

**GET** `/users/search?q=<query>`

Search users by name or mobile number.

**Request:**
- Method: `GET`
- Query Parameters:
  - `q` (required): Search query (name or mobile number)

**Example:**
```
GET /users/search?q=John
GET /users/search?q=9876543210
```

**Response (Success):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "passportNumber": "AB123456",
    "dateOfBirth": "1990-01-15T00:00:00.000Z",
    "designation": "Software Engineer",
    "ppType": "Regular",
    "mobileNumber": "9876543210",
    "village": "New York",
    "photoPath": "photo-1698500000000-123456789.jpg",
    "remark": "Excellent candidate",
    "createdAt": "2024-10-28T10:30:00.000Z"
  }
]
```

**Response (No Results):**
```json
[]
```

**Response (Error):**
```json
{
  "error": "Search query is required"
}
```

**Status Codes:**
- `200` - Search completed (may return empty array)
- `400` - Missing search query
- `500` - Server error

---

### 3. Get User Details

**GET** `/users/:id`

Get full details of a specific user.

**Request:**
- Method: `GET`
- Path Parameters:
  - `id` (required): User MongoDB ID

**Example:**
```
GET /users/507f1f77bcf86cd799439011
```

**Response (Success):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "passportNumber": "AB123456",
  "dateOfBirth": "1990-01-15T00:00:00.000Z",
  "designation": "Software Engineer",
  "ppType": "Regular",
  "mobileNumber": "9876543210",
  "village": "New York",
  "photoPath": "photo-1698500000000-123456789.jpg",
  "cvPath": "cv-1698500000000-123456789.pdf",
  "remark": "Excellent candidate",
  "createdAt": "2024-10-28T10:30:00.000Z",
  "updatedAt": "2024-10-28T10:30:00.000Z"
}
```

**Response (Error):**
```json
{
  "error": "User not found"
}
```

**Status Codes:**
- `200` - User found
- `404` - User not found
- `500` - Server error

---

### 4. Download CV

**GET** `/users/:id/cv`

Download CV file for a user.

**Request:**
- Method: `GET`
- Path Parameters:
  - `id` (required): User MongoDB ID

**Example:**
```
GET /users/507f1f77bcf86cd799439011/cv
```

**Response (Success):**
- Returns file as binary attachment
- Content-Type: `application/pdf` or `application/msword`
- Content-Disposition: `attachment; filename="John Doe-CV.pdf"`

**Response (Error):**
```json
{
  "error": "User not found"
}
```

```json
{
  "error": "CV file not found"
}
```

**Status Codes:**
- `200` - File downloaded
- `404` - User or file not found
- `500` - Server error

---

### 5. Admin Login

**POST** `/admin/login`

Authenticate admin and get JWT token.

**Request:**
- Method: `POST`
- Content-Type: `application/json`
- Body:
  ```json
  {
    "username": "Kuldeep R",
    "password": "kuldeep@123"
  }
  ```

**Response (Success):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IktvbGRlZXAgUiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5ODUwMDAwMCwiZXhwIjoxNjk4NTg2NDAwfQ.abc123..."
  }
}
```

**Response (Error):**
```json
{
  "error": "Invalid credentials"
}
```

**Status Codes:**
- `200` - Login successful
- `400` - Missing credentials
- `401` - Invalid credentials
- `500` - Server error

**Token Details:**
- Type: JWT
- Expires: 24 hours
- Use in subsequent requests: `Authorization: Bearer <token>`

---

## Health Check

**GET** `/health`

Check if API is running.

**Request:**
- Method: `GET`

**Response:**
```json
{
  "status": "OK"
}
```

**Status Codes:**
- `200` - API is running

---

## Error Responses

### Common Error Codes

| Code | Message | Meaning |
|------|---------|---------|
| 400 | Bad Request | Invalid input or missing required fields |
| 401 | Unauthorized | Invalid or missing authentication token |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server-side error |

### Error Response Format
```json
{
  "error": "Error message describing what went wrong"
}
```

---

## File Upload Constraints

### Photo
- **Allowed Types**: JPG, JPEG, PNG
- **Max Size**: 2 MB
- **Field Name**: `photo`

### CV
- **Allowed Types**: PDF, DOC, DOCX
- **Max Size**: 10 MB
- **Field Name**: `cv`

---

## Example Requests

### Using cURL

**Register User:**
```bash
curl -X POST http://localhost:5000/api/users \
  -F "name=John Doe" \
  -F "passportNumber=AB123456" \
  -F "dateOfBirth=1990-01-15" \
  -F "designation=Engineer" \
  -F "ppType=Regular" \
  -F "mobileNumber=9876543210" \
  -F "village=New York" \
  -F "remark=Good candidate" \
  -F "photo=@/path/to/photo.jpg" \
  -F "cv=@/path/to/cv.pdf"
```

**Search Users:**
```bash
curl http://localhost:5000/api/users/search?q=John
```

**Get User Details:**
```bash
curl http://localhost:5000/api/users/507f1f77bcf86cd799439011
```

**Download CV:**
```bash
curl -O http://localhost:5000/api/users/507f1f77bcf86cd799439011/cv
```

**Admin Login:**
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Kuldeep R","password":"kuldeep@123"}'
```

---

## Using Axios (JavaScript)

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Register User
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('passportNumber', 'AB123456');
// ... other fields
formData.append('photo', photoFile);
formData.append('cv', cvFile);

await axios.post(`${API_BASE}/users`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Search Users
const results = await axios.get(`${API_BASE}/users/search?q=John`);

// Get User Details
const user = await axios.get(`${API_BASE}/users/507f1f77bcf86cd799439011`);

// Download CV
const response = await axios.get(`${API_BASE}/users/507f1f77bcf86cd799439011/cv`, {
  responseType: 'blob'
});

// Admin Login
const loginResponse = await axios.post(`${API_BASE}/admin/login`, {
  username: 'Kuldeep R',
  password: 'kuldeep@123'
});

const token = loginResponse.data.token;
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- Request rate limiting
- IP-based throttling
- User-based quotas

---

## CORS

CORS is enabled for all origins in development. For production, update `server.js`:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

---

## Pagination

Currently not implemented. For large datasets, consider adding:
- Limit and offset parameters
- Page-based pagination
- Cursor-based pagination

---

## Sorting

Currently not implemented. Consider adding:
- Sort by name, date, mobile number
- Ascending/descending order

---

## Filtering

Currently supports search by name and mobile. Consider adding:
- Filter by designation
- Filter by date range
- Filter by village

---

**Last Updated**: October 28, 2025
