# User Registration System

A full-stack web application for user registration and admin dashboard built with React, Node.js, Express, and MongoDB.

## Features

✅ **User Registration Form**
- Fill in personal details (Name, Passport Number, DOB, Designation, PP Type, Mobile, Village)
- Upload Photo (JPG/PNG, max 2MB)
- Upload CV (PDF/DOC/DOCX, max 10MB)
- Add optional remarks

✅ **Admin Dashboard**
- Login with static credentials (Kuldeep R / kuldeep@123)
- Search users by name or mobile number
- View full user details with photo preview
- Download user CV files

✅ **Data Storage**
- MongoDB for persistent data storage
- Multer for secure file uploads
- Indexed search for fast queries

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Tailwind CSS + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| File Upload | Multer |
| Auth | JWT (static credentials) |

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── multer.js          # File upload configuration
│   ├── middleware/
│   │   └── auth.js            # JWT verification
│   ├── models/
│   │   └── User.js            # MongoDB User schema
│   ├── routes/
│   │   ├── users.js           # User registration & search endpoints
│   │   └── admin.js           # Admin login endpoint
│   ├── server.js              # Express server setup
│   ├── .env                   # Environment variables
│   ├── .env.example           # Example env file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.jsx       # User registration form
│   │   │   ├── AdminLogin.jsx     # Admin login page
│   │   │   └── AdminDashboard.jsx # Admin dashboard
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── api.js                 # API service layer
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Tailwind CSS
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure `.env` file:
   ```bash
   cp .env.example .env
   ```
   Update the following variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure secret key
   - `PORT`: Backend port (default: 5000)

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## API Endpoints

### User Registration
- **POST** `/api/users`
  - Multipart form data with photo and CV
  - Returns: Created user object

### Search Users
- **GET** `/api/users/search?q=<query>`
  - Query: name or mobile number
  - Returns: Array of matching users

### Get User Details
- **GET** `/api/users/:id`
  - Returns: Full user object with all fields

### Download CV
- **GET** `/api/users/:id/cv`
  - Returns: CV file as downloadable attachment

### Admin Login
- **POST** `/api/admin/login`
  - Body: `{ username, password }`
  - Returns: JWT token

## Usage

### User Registration
1. Navigate to `http://localhost:5173/register`
2. Fill in all required fields
3. Upload photo and CV
4. Click "Register"
5. Data is saved to MongoDB

### Admin Dashboard
1. Navigate to `http://localhost:5173/admin/login`
2. Enter credentials:
   - Username: `Kuldeep R`
   - Password: `kuldeep@123`
3. Search for users by name or mobile number
4. Click on a user to view full details
5. Download CV using the download button

## File Upload Constraints

- **Photo**: JPG/PNG, max 2MB
- **CV**: PDF/DOC/DOCX, max 10MB
- Files are stored in `backend/uploads/` directory
- Photos are served statically for preview
- CVs are downloaded via protected endpoint

## Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/user-registration
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
ADMIN_USERNAME=Kuldeep R
ADMIN_PASSWORD=kuldeep@123
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
```

## Development Notes

- Frontend uses Vite for fast development and builds
- Backend uses Nodemon for auto-reload during development
- Tailwind CSS for responsive UI design
- Mongoose for MongoDB schema validation
- JWT for admin authentication
- CORS enabled for frontend-backend communication

## Production Deployment

1. Build frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Set environment variables for production
3. Deploy backend to a Node.js hosting service (Heroku, Railway, etc.)
4. Deploy frontend to a static hosting service (Vercel, Netlify, etc.)
5. Update API base URL in frontend for production

## Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running locally or check your Atlas connection string

**CORS Error**
- Verify backend is running on port 5000
- Check CORS configuration in `server.js`

**File Upload Error**
- Ensure `uploads/` directory exists
- Check file size and type constraints
- Verify Multer configuration

**Login Failed**
- Double-check credentials: `Kuldeep R` / `kuldeep@123`
- Ensure JWT_SECRET is set in `.env`

## License

MIT
