const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Load models
const User = require('./models/User')
const Customer = require('./models/Customer')
const Table = require('./models/Table')
const Line = require('./models/Line')
const Rapport = require('./models/Rapport')


// Connect to DB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})

// Read JSON files

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'),
)
const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/customers.json`, 'utf-8'),
)
const tables = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/tables.json`, 'utf-8'),
)

const lines = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/lines.json`, 'utf-8'),
)
const rapports = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/rapports.json`, 'utf-8'),
)





// Import into DB
const importData = async () => {
  try {
    await User.create(users)
    await Customer.create(customers)
    await Table.create(tables)
    await Line.create(lines)
    await Rapport.create(rapports)
    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany()
    await Customer.deleteMany()
    await Table.deleteMany()
    await Line.deleteMany()
    await Rapport.deleteMany()
    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
