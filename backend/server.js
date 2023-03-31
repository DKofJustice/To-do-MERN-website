const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const cors = require('cors')
const tasksRouter = require('./routes/tasksRouter')
require('dotenv').config()

const app = express()

// Connect MongoDB
mongoose.connect(process.env.MONGO_DB_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('DB Connected'))
        .catch(err => console.log(err))
    
// Middleware
app.use(express.json())
app.use(helmet())
app.use(cors())
    
// Routes
app.use('/api/tasks', tasksRouter)
    
    
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})