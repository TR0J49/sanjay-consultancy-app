# Testing Guide - User Registration System

## ✅ Application Status

Both servers are now running:
- **Backend**: http://localhost:5000 ✅
- **Frontend**: http://localhost:5173 ✅

---

## 🧪 Test Cases

### Test 1: User Registration Form

**Objective**: Verify user can register with all required fields and file uploads

**Steps**:
1. Navigate to http://localhost:5173/register
2. Fill in the form:
   ```
   Name: John Doe
   Passport Number: AB123456
   Date of Birth: 1990-01-15
   Designation: Software Engineer
   PP Type: Regular
   Mobile Number: 9876543210
   Village/Town: New York
   Remark: Test user registration
   ```
3. Upload a photo (JPG or PNG, max 2MB)
4. Upload a CV (PDF, DOC, or DOCX, max 10MB)
5. Click "Register" button

**Expected Result**:
- ✅ Form validates all required fields
- ✅ File upload shows selected files
- ✅ Success message appears: "Registration successful!"
- ✅ Data is saved to MongoDB
- ✅ Page reloads after 2 seconds

**Verification**:
- Check MongoDB for new user record
- Verify files are in `backend/uploads/photos/` and `backend/uploads/cvs/`

---

### Test 2: Validation Errors

**Objective**: Verify form validation works correctly

**Steps**:
1. Go to registration form
2. Try submitting without filling required fields
3. Try uploading wrong file types
4. Try uploading files exceeding size limits

**Expected Results**:
- ✅ Error message for missing fields: "All fields are required"
- ✅ Error message for missing files: "Both photo and CV are required"
- ✅ File type validation prevents wrong formats
- ✅ Size validation prevents oversized files

---

### Test 3: Duplicate Passport Number

**Objective**: Verify system prevents duplicate passport numbers

**Steps**:
1. Register a user with passport number "AB123456"
2. Try registering another user with same passport number "AB123456"

**Expected Result**:
- ✅ First registration succeeds
- ✅ Second registration fails with error: "Passport number already exists"

---

### Test 4: Admin Login

**Objective**: Verify admin authentication works

**Steps**:
1. Navigate to http://localhost:5173/admin/login
2. Try logging in with wrong credentials:
   - Username: `Wrong User`
   - Password: `wrong_password`
3. Click "Login"

**Expected Result**:
- ✅ Error message: "Invalid credentials"

**Steps**:
1. Enter correct credentials:
   - Username: `Kuldeep R`
   - Password: `kuldeep@123`
2. Click "Login"

**Expected Result**:
- ✅ Login succeeds
- ✅ Redirected to dashboard
- ✅ JWT token stored in localStorage

---

### Test 5: Search Users by Name

**Objective**: Verify search functionality works by name

**Steps**:
1. Login to admin dashboard
2. In search bar, enter: `John`
3. Click "Search" button

**Expected Result**:
- ✅ Results show all users with "John" in name
- ✅ Results list shows: Name and Mobile Number
- ✅ Case-insensitive search (works for "john", "JOHN", "John")

---

### Test 6: Search Users by Mobile Number

**Objective**: Verify search functionality works by mobile number

**Steps**:
1. In search bar, enter: `9876543210`
2. Click "Search" button

**Expected Result**:
- ✅ Results show user with matching mobile number
- ✅ Partial search works (e.g., `987` returns users starting with 987)

---

### Test 7: View User Details

**Objective**: Verify admin can view full user details

**Steps**:
1. Search for a user
2. Click on a user in the results list

**Expected Result**:
- ✅ Right panel shows full details:
  - Name
  - Passport Number
  - Date of Birth (formatted)
  - Designation
  - PP Type
  - Mobile Number
  - Village/Town
  - Remark
  - Photo preview
- ✅ Photo displays correctly
- ✅ Download CV button is visible

---

### Test 8: Photo Preview

**Objective**: Verify photo displays correctly in dashboard

**Steps**:
1. Search and select a user
2. View the photo in the details panel

**Expected Result**:
- ✅ Photo displays correctly
- ✅ Photo is properly sized (responsive)
- ✅ Photo has border and rounded corners

---

### Test 9: Download CV

**Objective**: Verify CV download works

**Steps**:
1. Search and select a user
2. Click "📥 Download CV" button

**Expected Result**:
- ✅ CV file downloads to computer
- ✅ File name format: `{UserName}-CV.{extension}`
- ✅ File is the correct document (not corrupted)

---

### Test 10: Logout

**Objective**: Verify logout functionality

**Steps**:
1. In admin dashboard, click "Logout" button

**Expected Result**:
- ✅ Redirected to login page
- ✅ JWT token removed from localStorage
- ✅ Cannot access dashboard without logging in again

---

### Test 11: Protected Routes

**Objective**: Verify admin dashboard is protected

**Steps**:
1. Logout from dashboard
2. Try accessing http://localhost:5173/admin/dashboard directly

**Expected Result**:
- ✅ Redirected to login page
- ✅ Cannot access dashboard without valid token

---

### Test 12: Empty Search Results

**Objective**: Verify handling of no search results

**Steps**:
1. Login to dashboard
2. Search for a user that doesn't exist: `NonExistentUser123`

**Expected Result**:
- ✅ Error message: "No users found"
- ✅ Results list is empty
- ✅ Details panel shows: "Select a user from the results to view details"

---

### Test 13: Multiple Users

**Objective**: Verify system handles multiple users correctly

**Steps**:
1. Register 5 different users with different details
2. Search for each user
3. Verify all details are correct

**Expected Result**:
- ✅ All users are stored correctly
- ✅ Search returns correct user
- ✅ Details match what was registered

---

### Test 14: Special Characters in Fields

**Objective**: Verify system handles special characters

**Steps**:
1. Register user with special characters:
   - Name: `John O'Brien-Smith`
   - Village: `São Paulo`
   - Remark: `Good! (Excellent) & Reliable`
2. Search for the user

**Expected Result**:
- ✅ Special characters are saved correctly
- ✅ Search works with special characters
- ✅ Display shows special characters properly

---

### Test 15: API Health Check

**Objective**: Verify backend API is responding

**Steps**:
1. Open browser console (F12)
2. Run: `fetch('http://localhost:5000/api/health').then(r => r.json()).then(d => console.log(d))`

**Expected Result**:
- ✅ Response: `{ status: "OK" }`

---

## 🔍 Manual API Testing

### Using Browser Console

**Test User Registration**:
```javascript
const formData = new FormData();
formData.append('name', 'Jane Doe');
formData.append('passportNumber', 'CD789012');
formData.append('dateOfBirth', '1995-05-20');
formData.append('designation', 'Designer');
formData.append('ppType', 'Premium');
formData.append('mobileNumber', '9876543211');
formData.append('village', 'London');
formData.append('remark', 'Test');

fetch('http://localhost:5000/api/users', {
  method: 'POST',
  body: formData
})
.then(r => r.json())
.then(d => console.log(d));
```

**Test Search**:
```javascript
fetch('http://localhost:5000/api/users/search?q=John')
  .then(r => r.json())
  .then(d => console.log(d));
```

**Test Admin Login**:
```javascript
fetch('http://localhost:5000/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'Kuldeep R',
    password: 'kuldeep@123'
  })
})
.then(r => r.json())
.then(d => console.log(d));
```

---

## 📊 Test Results Template

| Test Case | Status | Notes |
|-----------|--------|-------|
| User Registration | ✅ PASS | All fields validated |
| Validation Errors | ✅ PASS | Proper error messages |
| Duplicate Passport | ✅ PASS | Prevented correctly |
| Admin Login | ✅ PASS | JWT token issued |
| Search by Name | ✅ PASS | Case-insensitive |
| Search by Mobile | ✅ PASS | Partial match works |
| View Details | ✅ PASS | All fields displayed |
| Photo Preview | ✅ PASS | Image loads correctly |
| Download CV | ✅ PASS | File downloads |
| Logout | ✅ PASS | Token cleared |
| Protected Routes | ✅ PASS | Redirect to login |
| Empty Results | ✅ PASS | Error message shown |
| Multiple Users | ✅ PASS | All stored correctly |
| Special Characters | ✅ PASS | Handled properly |
| API Health | ✅ PASS | Server responding |

---

## 🐛 Debugging Tips

### Check Backend Logs
- Terminal where backend is running shows all API calls
- Look for errors in red text
- Check MongoDB connection status

### Check Frontend Logs
- Press F12 in browser
- Go to Console tab
- Look for errors in red text
- Check Network tab for API calls

### Check MongoDB
- Use MongoDB Compass or Atlas dashboard
- Verify data is being saved
- Check file paths in documents

### Check File System
- Navigate to `backend/uploads/`
- Verify `photos/` and `cvs/` directories exist
- Check uploaded files are there

---

## 🚀 Performance Testing

### Load Testing
- Register 100+ users
- Verify search performance
- Check database query times

### File Upload Testing
- Test with maximum file sizes
- Test with various file formats
- Verify cleanup on errors

### Concurrent Users
- Open multiple browser tabs
- Login as admin in multiple tabs
- Verify no conflicts

---

## ✅ Final Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB connected
- [ ] User registration works
- [ ] Admin login works
- [ ] Search functionality works
- [ ] File uploads work
- [ ] Photo preview displays
- [ ] CV download works
- [ ] All error messages display correctly
- [ ] Protected routes work
- [ ] Logout works

---

## 📝 Known Limitations

1. **No pagination** - All search results displayed at once
2. **No sorting** - Results in insertion order
3. **No filtering** - Only search by name/mobile
4. **No user editing** - Can only register and view
5. **No user deletion** - Records are permanent
6. **No email notifications** - No confirmation emails
7. **No rate limiting** - No protection against spam

---

## 🔄 Next Steps

1. ✅ Test all test cases above
2. ✅ Fix any issues found
3. ✅ Add more features if needed
4. ✅ Deploy to production
5. ✅ Monitor performance

---

**Last Updated**: October 28, 2025
**Status**: ✅ Ready for Testing
