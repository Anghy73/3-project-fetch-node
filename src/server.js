const express = require('express');
const morga = require('morgan')
const ejs = require('ejs')
const dotenv = require('dotenv').config()
const path = require('path')

const app = express();

app.set('SERVER', process.env.SERVER || 'Server-Fetch')
app.set('PORT', process.env.PORT || 7000)
app.set('API', process.env.API)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(morga('dev'))

let count = 0

const fetchData = async (req, res, page) => {
  try {
    const response = await fetch(app.get('API'))
    const data = await response.json()
    res.render(page, {
      data,
      count
    })
  } catch (e) {
    console.log(e)
  }
}

app.get('/', (req, res) => {
  fetchData(req, res, 'home')
})

app.get('/blogs', (req, res) => {
  fetchData(req, res, 'blogs')
})

// app.get('/blogs/:id', (req, res) => {
//   fetchData(req, res, 'blogs')
// })


app.use('/static', express.static(path.join(__dirname, '/static')))


app.listen(app.get('PORT'), () => {
  console.log(`${app.get('SERVER')} ready on the port ${app.get('PORT')}`)
})