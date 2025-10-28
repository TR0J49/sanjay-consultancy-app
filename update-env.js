const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

const envContent = `MONGODB_URI=mongodb+srv://shubhamrangdale228_db_user:3J681evoROWeseqk@cluster0.u81vxnz.mongodb.net/user-registration?appName=Cluster0
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
ADMIN_USERNAME=Kuldeep R
ADMIN_PASSWORD=kuldeep@123
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
`;

fs.writeFileSync(envPath, envContent);
console.log('✅ .env file updated with MongoDB credentials!');
console.log('📍 MongoDB URI configured for Atlas');
console.log('🔄 Restart backend server: npm run dev');
