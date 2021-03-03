require('dotenv').config();

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || 4000,
  dbFilePath: process.env.DB_FILE_PATH,
};
