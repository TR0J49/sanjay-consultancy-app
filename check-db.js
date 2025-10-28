require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    const users = await User.find().limit(5);
    console.log('\n📊 Users in Database:');
    console.log('Total users:', users.length);

    users.forEach((user, index) => {
      console.log(`\n--- User ${index + 1} ---`);
      console.log('Name:', user.name);
      console.log('Passport:', user.passportNumber);
      console.log('Photo Path:', user.photoPath);
      console.log('CV Path:', user.cvPath);
      console.log('Created:', user.createdAt);
    });

    // Check if files exist
    const fs = require('fs');
    const path = require('path');

    if (users.length > 0) {
      const firstUser = users[0];
      const photoPath = path.join(__dirname, 'uploads', 'photos', firstUser.photoPath);
      const cvPath = path.join(__dirname, 'uploads', 'cvs', firstUser.cvPath);

      console.log('\n📁 File Check:');
      console.log('Photo exists:', fs.existsSync(photoPath), '(' + photoPath + ')');
      console.log('CV exists:', fs.existsSync(cvPath), '(' + cvPath + ')');
    }

    await mongoose.connection.close();
    console.log('\n✅ Database check complete');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

checkDatabase();
