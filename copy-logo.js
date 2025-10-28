const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'sanjay consult .png');
const destination = path.join(__dirname, 'frontend', 'logo.png');

try {
  fs.copyFileSync(source, destination);
  console.log('✅ Logo copied successfully!');
  console.log(`From: ${source}`);
  console.log(`To: ${destination}`);
} catch (err) {
  console.error('❌ Error copying logo:', err.message);
}
