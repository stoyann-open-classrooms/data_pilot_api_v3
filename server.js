// dependency
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

//import middlewares
const errorHandler = require('./middlewares/error.js')

// load config DB
const connectDB = require('./config/db')

//load environement variables
dotenv.config({ path: './config/config.env' })

//Connect to database
connectDB()

// Route files
const auth = require('./routes/auth')
const users = require('./routes/users')
const customers = require('./routes/customers.js')
const tables = require('./routes/tables.js')
const permissions = require('./routes/permissions.js')
const lines = require('./routes/lines.js')
const rapports = require('./routes/rapports.js')
const permissionRapports = require('./routes/permissionRapports.js')


// initialize express  application
const app = express()
app.set('view engine', 'ejs')
// Body parser
app.use(express.json())

// Dev logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


// ======================= Security ====================
// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 1000,
})
app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(
  cors({
    origin: '*',
  }),
)
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

// =====================================================



//Mount routers
app.use('/data_pilot/api/v3/auth', auth)
app.use('/data_pilot/api/v3/users', users)
app.use('/data_pilot/api/v3/customers', customers)
app.use('/data_pilot/api/v3/rapports', rapports)
app.use('/data_pilot/api/v3/tables', tables)
app.use('/data_pilot/api/v3/authorizations', permissions)
app.use('/data_pilot/api/v3/lines', lines)
app.use('/data_pilot/api/v3/permissions', permissionRapports)



//error handler 
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.render('index'))

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} root URL : http://localhost:${PORT}/data_pilot/api/v3 `
      .white.underline.bold.bgGreen,
  ),
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  // Close server and exit process
  server.close(() => process.exit(1))
})
