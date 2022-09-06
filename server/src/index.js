const express = require('express');
const app = express();
const {PORT, CLIENT_URL} = require('./constants')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
require('dotenv').config()

//import routes
const authRoutes = require('./routes/auth')

require('./middlewares/passport-middleware')
// initialize middleWares
app.use(express.json());
app.use(cookieParser())
app.use(cors())

app.use(passport.initialize());


//initialize routes
app.use('/api', authRoutes)
app.use(express.static(path.resolve(__dirname, "../../build")))


app.use('/dashboard', (req, res) => {
    res.redirect('/dashboard');
})

app.use('/view-bugs', (req, res) => {
    res.redirect('/view-bugs');
})

app.use('/new-project', (req, res) => {
    res.redirect('/new-project');
})

app.use('/new-bug', (req, res) => {
    res.redirect('/new-bug');
})

app.use('/update-user', (req, res) => {
    res.redirect('/update-user');
})


app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`)
})