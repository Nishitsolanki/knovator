  const config = {
    secret: process.env.SECRET || "secrete key",
    mongoURI: process.env.MONGO_URI,
    port: process.env.PORT
  };
  
  module.exports = config;
  