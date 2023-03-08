const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

try {
  require('./src/index');
} catch (err) {
  console.error(err);
  process.exit(1100);
}
