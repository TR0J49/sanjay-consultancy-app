# 🚀 Quick Start Guide - Sanjay Consultancy

## ⚡ Start Both Servers with ONE Command

### **Option 1: Using Batch File (Recommended)** 
```bash
start.bat
```
**OR** just double-click `start.bat` file

---

### **Option 2: Using PowerShell Script**
```powershell
.\start.ps1
```
**OR**
```powershell
powershell -ExecutionPolicy Bypass -File start.ps1
```

---

## 📦 What Gets Started?

✅ **Backend Server** - Opens in new window
- Port: `5000`
- API: `http://localhost:5000/api`
- Auto-reload enabled (nodemon)

✅ **Frontend Server** - Opens in new window  
- Port: `5173` (or next available)
- URL: `http://localhost:5173`
- Hot reload enabled (Vite)

---

## 🛑 Stop All Servers

### **Option 1: Close Windows**
Simply close both terminal windows that opened

### **Option 2: PowerShell Command**
```powershell
Stop-Process -Name node -Force
```

---

## 🔧 Manual Start (If Needed)

### **Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

### **Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🌐 Access Points

After starting:

| Service | URL |
|---------|-----|
| **Home Page** | http://localhost:5173/ |
| **User Registration** | http://localhost:5173/register |
| **Admin Login** | http://localhost:5173/admin/login |
| **Admin Dashboard** | http://localhost:5173/admin/dashboard |
| **API Health** | http://localhost:5000/api/health |
| **API Root** | http://localhost:5000/ |

---

## 🔑 Admin Credentials

```
Username: Kuldeep R
Password: kuldeep@123
```

**Note:** You need to register the admin first (one-time setup)

---

## 📝 First Time Setup

1. **Start servers:**
   ```bash
   start.bat
   ```

2. **Register Admin** (one-time):
   - Open: http://localhost:5173/admin/login
   - Or use API: `POST http://localhost:5000/api/admin/register`
   - Body:
     ```json
     {
       "username": "Kuldeep R",
       "email": "kuldeep@sanjay.com",
       "password": "kuldeep@123"
     }
     ```

3. **Login:**
   - Go to: http://localhost:5173/admin/login
   - Use credentials above

4. **Test Registration:**
   - Go to: http://localhost:5173/register
   - Fill form and submit

---

## 🔍 Troubleshooting

### **Port Already in Use**
```powershell
# Kill all node processes
Stop-Process -Name node -Force

# Then restart
start.bat
```

### **MongoDB Not Connected**
Check `backend/.env` file has correct MongoDB URI:
```
MONGODB_URI=mongodb+srv://shubhamrangdale228_db_user:3J681evoROWeseqk@cluster0.mongodb.net/user-registration?retryWrites=true&w=majority
```

### **Frontend Port Changed**
If port 5173 is busy, Vite will use next available port (5174, 5175, etc.)
Check the terminal output for actual port.

---

## 📊 Server Status Check

```powershell
# Check if backend is running
curl http://localhost:5000/api/health

# Check running node processes
Get-Process -Name node
```

---

## 🎯 Quick Commands Reference

| Command | Description |
|---------|-------------|
| `start.bat` | Start both servers |
| `Stop-Process -Name node -Force` | Stop all servers |
| `cd backend && npm run dev` | Start backend only |
| `cd frontend && npm run dev` | Start frontend only |

---

## ✅ Success Indicators

When servers start successfully, you should see:

**Backend:**
```
✅ MongoDB connected successfully
Server running on http://localhost:5000
```

**Frontend:**
```
VITE v5.4.21  ready in XXX ms
➜  Local:   http://localhost:5173/
```

---

**Happy Coding! 🚀**
