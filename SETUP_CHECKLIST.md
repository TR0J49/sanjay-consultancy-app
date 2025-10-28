# Setup Checklist

## ✅ Completed
- [x] Backend scaffolded with Express.js
- [x] Frontend scaffolded with React + Vite + Tailwind CSS
- [x] MongoDB User model created
- [x] Multer file upload configuration
- [x] API endpoints implemented
- [x] Admin authentication with JWT
- [x] React pages and components created
- [x] Dependencies installed (backend & frontend)
- [x] Documentation created (README.md, QUICKSTART.md)

## 📋 Before Running

### 1. MongoDB Setup
Choose one:

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user-registration
   ```

### 2. Environment Variables
Update `backend/.env` if needed:
```env
MONGODB_URI=mongodb://localhost:27017/user-registration
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
ADMIN_USERNAME=Kuldeep R
ADMIN_PASSWORD=kuldeep@123
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
```

## 🚀 Running the Application

### Terminal 1: Start Backend
```bash
cd backend
npm run dev
```

Expected output:
```
Server running on http://localhost:5000
MongoDB connected
```

### Terminal 2: Start Frontend
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.0.0  ready in XXX ms
➜  Local:   http://localhost:5173/
```

## 🧪 Testing

### Test User Registration
1. Open http://localhost:5173/register
2. Fill all fields
3. Upload a photo (JPG/PNG)
4. Upload a CV (PDF/DOC/DOCX)
5. Click Register
6. Check MongoDB for new user record

### Test Admin Dashboard
1. Open http://localhost:5173/admin/login
2. Enter credentials:
   - Username: `Kuldeep R`
   - Password: `kuldeep@123`
3. Search for a user by name or mobile
4. Click on user to view details
5. Download CV file

## 📁 Directory Structure

```
kuldeep R/
├── backend/
│   ├── config/
│   │   └── multer.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── admin.js
│   │   └── users.js
│   ├── uploads/          (created on first upload)
│   │   ├── photos/
│   │   └── cvs/
│   ├── server.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── node_modules/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── node_modules/
│
├── README.md
├── QUICKSTART.md
├── SETUP_CHECKLIST.md
└── .gitignore
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

### MongoDB Connection Failed
- Verify MongoDB is running
- Check connection string in `.env`
- For Atlas: ensure IP is whitelisted

### File Upload Error
- Check `backend/uploads/` directory exists
- Verify file size (Photo: 2MB, CV: 10MB)
- Check file type (Photo: JPG/PNG, CV: PDF/DOC/DOCX)

### CORS Error
- Ensure backend is running on port 5000
- Check frontend proxy in `vite.config.js`

### Dependencies Issue
```bash
# Clear and reinstall
rm -r node_modules package-lock.json
npm install
```

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Register new user |
| GET | `/api/users/search?q=name` | Search users |
| GET | `/api/users/:id` | Get user details |
| GET | `/api/users/:id/cv` | Download CV |
| POST | `/api/admin/login` | Admin login |

## 🎯 Next Steps

1. Test the application end-to-end
2. Customize styling in Tailwind CSS
3. Add more fields if needed
4. Implement additional admin features
5. Deploy to production

## 📞 Support

For issues:
1. Check terminal output for errors
2. Open browser console (F12)
3. Check MongoDB Atlas dashboard
4. Review documentation in README.md
