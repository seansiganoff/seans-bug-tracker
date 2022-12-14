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

//when the refresh button is hit, the page will show an error. this will refresh the current page.
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })


app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`)
})