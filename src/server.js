const express = require('express');
const morga = require('morgan')
const ejs = require('ejs')
const path = require('path')

const app = express();

app.use(morga('dev'))

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')


const fetchData = async (req, res) => {
  try {
    const response = await fetch('http://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    res.render('home', {
      data
    })
  } catch (e) {
    console.log(e)
  }
}

app.get('/', (req, res) => {
  fetchData(req, res)
  // res.send('Hola Mundo <3')
})

app.listen(7000, () => {
  console.log('Server ready in the port 7000')
})