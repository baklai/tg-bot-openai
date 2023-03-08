const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

try {
  require('./src/index');
} catch (err) {
  console.error(err);
  process.exit(1100);
}
