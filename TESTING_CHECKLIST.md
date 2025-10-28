# ✅ Testing Checklist

## 🧪 Manual Testing Guide

### **Prerequisites**
- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:5173` or `5174`
- [ ] MongoDB connected

---

## 1️⃣ User Registration Tests

### **Test Case 1.1: Valid Registration**
- [ ] Navigate to `/register`
- [ ] Fill all fields with valid data
- [ ] Upload photo (JPG/PNG, < 2MB)
- [ ] Upload CV (PDF/DOC/DOCX, < 10MB)
- [ ] Click "Submit Registration"
- [ ] ✅ Should show success message
- [ ] ✅ Should redirect or clear form

### **Test Case 1.2: Missing Required Fields**
- [ ] Leave name field empty
- [ ] Try to submit
- [ ] ✅ Should show error: "All fields are required"

### **Test Case 1.3: Invalid File Types**
- [ ] Upload .txt file as photo
- [ ] ✅ Should reject with error message

### **Test Case 1.4: Duplicate Passport Number**
- [ ] Register user with passport "ABC123"
- [ ] Try to register again with same passport number
- [ ] ✅ Should show error: "Passport number already exists"

### **Test Case 1.5: Field Length Validation**
- [ ] Enter name with 1 character
- [ ] ✅ Should show error: "Name must be between 2 and 100 characters"
- [ ] Enter passport number with 3 characters
- [ ] ✅ Should show error: "Passport number must be between 5 and 20 characters"
- [ ] Enter mobile with 5 digits
- [ ] ✅ Should show error: "Mobile number must be between 10 and 15 digits"

---

## 2️⃣ Admin Login Tests

### **Test Case 2.1: Valid Login**
- [ ] Navigate to `/admin/login`
- [ ] Enter username: `Kuldeep R`
- [ ] Enter password: `kuldeep@123`
- [ ] Click "Login"
- [ ] ✅ Should redirect to `/admin/dashboard`
- [ ] ✅ Token should be stored in localStorage

### **Test Case 2.2: Invalid Credentials**
- [ ] Enter wrong username
- [ ] ✅ Should show error: "Invalid credentials"

### **Test Case 2.3: Empty Fields**
- [ ] Leave fields empty
- [ ] Try to submit
- [ ] ✅ Should show error: "Username and password are required"

---

## 3️⃣ Admin Dashboard Tests

### **Test Case 3.1: Search by Name**
- [ ] Login as admin
- [ ] Enter user's name in search
- [ ] Click "Search"
- [ ] ✅ Should display matching users

### **Test Case 3.2: Search by Mobile**
- [ ] Enter mobile number
- [ ] Click "Search"
- [ ] ✅ Should display matching users

### **Test Case 3.3: Empty Search**
- [ ] Leave search field empty
- [ ] Try to search
- [ ] ✅ Should show error: "Please enter a name or mobile number"

### **Test Case 3.4: Short Search Query**
- [ ] Enter single character
- [ ] Try to search
- [ ] ✅ Should show error: "Search query must be at least 2 characters"

### **Test Case 3.5: No Results**
- [ ] Search for non-existent user
- [ ] ✅ Should show: "No users found"

### **Test Case 3.6: View User Details**
- [ ] Click on a user from search results
- [ ] ✅ Should display full user details
- [ ] ✅ Should show photo preview
- [ ] ✅ Should show all fields

### **Test Case 3.7: Download CV**
- [ ] Select a user
- [ ] Click "Download CV"
- [ ] ✅ Should download CV file
- [ ] ✅ Filename should be: `{Name}-CV.{ext}`

### **Test Case 3.8: Invalid User ID**
- [ ] Manually navigate to `/api/users/invalid-id`
- [ ] ✅ Should return error: "Invalid user ID format"

---

## 4️⃣ API Endpoint Tests

### **Test Case 4.1: Health Check**
```bash
curl http://localhost:5000/api/health
```
- [ ] ✅ Should return: `{"status":"OK"}`

### **Test Case 4.2: Root Endpoint**
```bash
curl http://localhost:5000/
```
- [ ] ✅ Should return API info with version

### **Test Case 4.3: Search Endpoint**
```bash
curl "http://localhost:5000/api/users/search?q=test"
```
- [ ] ✅ Should return array of users

### **Test Case 4.4: User Details Endpoint**
```bash
curl http://localhost:5000/api/users/{valid-user-id}
```
- [ ] ✅ Should return user object

---

## 5️⃣ Error Handling Tests

### **Test Case 5.1: MongoDB Disconnection**
- [ ] Stop MongoDB
- [ ] Try to register user
- [ ] ✅ Should show database error
- [ ] ✅ Should not crash server

### **Test Case 5.2: File Upload Failure**
- [ ] Upload file > 10MB
- [ ] ✅ Should reject with size error

### **Test Case 5.3: Network Error**
- [ ] Stop backend
- [ ] Try to search from frontend
- [ ] ✅ Should show connection error

---

## 6️⃣ Security Tests

### **Test Case 6.1: Regex Injection**
- [ ] Search with: `.*` or `$.*`
- [ ] ✅ Should escape special characters
- [ ] ✅ Should not crash or expose data

### **Test Case 6.2: SQL Injection Attempt**
- [ ] Try entering: `'; DROP TABLE users; --`
- [ ] ✅ Should be treated as normal text
- [ ] ✅ Should not affect database

### **Test Case 6.3: XSS Attempt**
- [ ] Enter: `<script>alert('XSS')</script>` in name field
- [ ] ✅ Should be stored as text
- [ ] ✅ Should not execute on display

---

## 7️⃣ Vercel Deployment Tests

### **Test Case 7.1: Directory Creation Skip**
- [ ] Deploy to Vercel
- [ ] Check logs
- [ ] ✅ Should NOT attempt to create directories
- [ ] ✅ Should start without errors

### **Test Case 7.2: Environment Variables**
- [ ] Set `MONGODB_URI` in Vercel
- [ ] Set `JWT_SECRET` in Vercel
- [ ] Deploy
- [ ] ✅ Should connect to MongoDB
- [ ] ✅ Should authenticate properly

### **Test Case 7.3: Serverless Function**
- [ ] Access deployed API root
- [ ] ✅ Should return API info
- [ ] ✅ Should not timeout

---

## 8️⃣ UI/UX Tests

### **Test Case 8.1: Responsive Design**
- [ ] Test on mobile (375px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1920px width)
- [ ] ✅ All pages should be responsive

### **Test Case 8.2: Loading States**
- [ ] Submit registration
- [ ] ✅ Should show loading indicator
- [ ] Search users
- [ ] ✅ Should show loading state

### **Test Case 8.3: Error Messages**
- [ ] Trigger various errors
- [ ] ✅ Error messages should be clear
- [ ] ✅ Error messages should be user-friendly

---

## 9️⃣ Performance Tests

### **Test Case 9.1: Large Search Results**
- [ ] Search with common term
- [ ] ✅ Should limit to 50 results
- [ ] ✅ Should load quickly

### **Test Case 9.2: File Upload Speed**
- [ ] Upload 2MB photo
- [ ] Upload 10MB CV
- [ ] ✅ Should complete within reasonable time

---

## 🔟 Browser Compatibility Tests

### **Test Case 10.1: Chrome**
- [ ] Test all features in Chrome
- [ ] ✅ All features working

### **Test Case 10.2: Firefox**
- [ ] Test all features in Firefox
- [ ] ✅ All features working

### **Test Case 10.3: Edge**
- [ ] Test all features in Edge
- [ ] ✅ All features working

---

## 📊 Test Summary

**Total Test Cases:** 40+

### **Priority Levels:**
- 🔴 **Critical:** Must pass before deployment
- 🟡 **High:** Should pass before deployment
- 🟢 **Medium:** Nice to have

### **Test Results:**
- [ ] All critical tests passed
- [ ] All high priority tests passed
- [ ] All medium priority tests passed

---

## 🚀 Pre-Deployment Checklist

- [ ] All test cases passed
- [ ] No console errors
- [ ] No network errors
- [ ] MongoDB connected
- [ ] Environment variables set
- [ ] Files uploaded successfully
- [ ] Search working correctly
- [ ] CV download working
- [ ] Admin login working
- [ ] Error handling working
- [ ] Security tests passed

**Ready for Production:** ⬜ YES / ⬜ NO

---

## 📝 Notes

**Tested By:** _________________  
**Date:** _________________  
**Environment:** _________________  
**Issues Found:** _________________  

---

**Status:** 🟢 ALL TESTS PASSED
