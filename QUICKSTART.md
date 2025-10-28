# Quick Start Guide

## Prerequisites
- MongoDB running locally or MongoDB Atlas connection string
- Node.js installed

## Step 1: Configure MongoDB

### Option A: Local MongoDB
Ensure MongoDB is running:
```bash
mongod
```

### Option B: MongoDB Atlas
1. Create a cluster on MongoDB Atlas
2. Get your connection string
3. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user-registration
   ```

## Step 2: Start Backend

```bash
cd backend
npm run dev
```

Expected output:
```
Server running on http://localhost:5000
MongoDB connected
```

## Step 3: Start Frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

Expected output:
```
  VITE v5.0.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

## Step 4: Access the Application

### User Registration
- URL: `http://localhost:5173/register`
- Fill in all fields
- Upload photo (JPG/PNG, max 2MB)
- Upload CV (PDF/DOC/DOCX, max 10MB)
- Click Register

### Admin Dashboard
- URL: `http://localhost:5173/admin/login`
- Username: `Kuldeep R`
- Password: `kuldeep@123`
- Search users by name or mobile number
- View details and download CVs

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill the process if needed
taskkill /PID <PID> /F
```

### MongoDB connection error
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure network access is allowed (for Atlas)

### Frontend won't start
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run dev
```

### File upload fails
- Check `backend/uploads/` directory exists
- Verify file size and type constraints
- Check browser console for errors

## File Structure

```
kuldeep R/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
├── README.md
└── QUICKSTART.md
```

## Next Steps

1. Customize the UI in `frontend/src/pages/`
2. Add more fields to the User model in `backend/models/User.js`
3. Implement additional admin features
4. Deploy to production

## Support

For issues, check:
- Backend logs in terminal
- Browser console (F12)
- MongoDB Atlas dashboard
- File permissions in `uploads/` directory
