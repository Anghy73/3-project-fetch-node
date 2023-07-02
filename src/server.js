const express = require('express');
const morga = require('morgan')
const ejs = require('ejs')
const router = require('./routes/index.js')
const dotenv = require('dotenv').config()
const path = require('path')

const app = express();

app.set('SERVER', process.env.SERVER || 'Server-Fetch')
app.set('PORT', process.env.PORT || 7000)
app.set('API', process.env.API)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(morga('dev'))

app.use(router)

app.use('/static', express.static(path.join(__dirname, '/static')))

app.use((req, res) => {
  res.render('404')
})

app.listen(app.get('PORT'), () => {
  console.log(`${app.get('SERVER')} ready on the port ${app.get('PORT')}`)
})