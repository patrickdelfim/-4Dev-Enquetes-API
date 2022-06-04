export default {
  mongoUrl: global.__MONGO_URI__ || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'tj670==5H'
}
